import AccountDto from '../models/accountDto.js';
import ResposeDto from '../models/responseDto.js';
import {getAccount, isAccountInstanced} from '../models/account.js';
import {violations} from '../utils/violationsEnum.js';
import AccountTransaction from '../models/accountTransaction.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(utc);

const acctions = {
    account: (args) =>{
        return !isAccountInstanced()? createAccount(args): alreadyInitializedRespose(getAccount());
    },
    transaction: async (args) =>{

        const response = await Promise.all([
            rules.accountNotInitialized(),
            rules.cardNotActive(),
            rules.highFrequencySmallInterval(args),
            rules.doubledTransaction(args),
            rules.insufficientLimit(args)
        ]
        ).then(values => {
            const account = getAccount();
            const resolved = values.filter(e => e === 0 || e);
            if(resolved.length === 0){
                const transaction = enqueueNewTransaction(args, account);
                return new ResposeDto(
                    new AccountDto(account.activeCard, transaction.available));
            }
            return new ResposeDto(new AccountDto(account.activeCard, getAvailable(account)),resolved);
        }, reason => {
            return new ResposeDto({}, [reason]);
        });

        return response; 
    }
};

const createAccount = (args) => {
    console.log('Creating account... ' + JSON.stringify(args));
    const account = getAccount(args['active-card'], args['available-limit']);
    console.log('Created account... ' + JSON.stringify(account));
    return new ResposeDto(new AccountDto(account.activeCard, account.availableLimit));
};

const alreadyInitializedRespose = (account)=> {
    return new ResposeDto(
        new AccountDto(account.activeCard, account.availableLimit), [violations.INITIALIZED]
    );
};

const enqueueNewTransaction = (args, account) => {

    if (account.isTransactionFull) {
        account.dequeueTransaction();
    }

    const transaction = new AccountTransaction(
        args.amount, args.time, getAvailable(account) - args.amount, args.merchant);
    account.enqueueTransaction(transaction);
    return transaction;
}

const getAvailable = (account) =>{
    return (account.lastTransaction ?
        account.lastTransaction.available : account.availableLimit);
}

const rules = {
    cardNotActive: () =>{
        return new Promise((resolve, reject) => {
            if(isAccountInstanced() && !getAccount().activeCard){
                reject(violations.CARD_NOT_ACTIVE);
            }
            resolve('');
        });
    },
    accountNotInitialized: () =>{
        return new Promise((resolve, reject) => {
            if(!isAccountInstanced()){
                reject(violations.NOT_INITIALIZED);
            }
            resolve('');
        });
    },
    insufficientLimit: (args) =>{
        return new Promise((resolve) => {
            (isAccountInstanced() &&  args.amount >= getAvailable(getAccount()))? 
                resolve(violations.INSUFFICIENT_LIMIT): resolve('');
        });
    },
    highFrequencySmallInterval: (args)=>{
        return new Promise((resolve) => {
            if(isAccountInstanced() &&  args.time){
                const account = getAccount();
                const transactionDate = dayjs(args.time);
                const future = dayjs(account.firstTransaction?.time).add(2, 'minutes');
                (account.isTransactionFull && transactionDate.isBefore(future))? 
                  resolve(violations.HIGH_FREQUENCY): resolve('');
            }
        });
    },
    doubledTransaction: (args)=>{
        return new Promise((resolve) => {
            const foundTransactions = getAccount()?.transactionQueue.filter((t) => {
               return t.merchant == args.merchant && t.amount == args.amount;
            });
            foundTransactions?.length !== 0? resolve(violations.DOUBLED): resolve('');
        }); 
    }
    
};

export const authorizer = (row) => {
    return acctions[Object.keys(row)[0]](Object.values(row)[0]);
}
