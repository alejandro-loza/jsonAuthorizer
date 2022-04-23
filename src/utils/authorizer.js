import AccountDto from '../models/accountDto.js';
import ResposeDto from '../models/responseDto.js';
import {getAccount, isAccountInstanced} from '../models/account.js';
import {violations} from '../utils/violationsEnum.js';

const acctions = {
    account: (args) =>{
       return !isAccountInstanced()? createAccount(args): alreadyInitializedRespose(getAccount());
    },
    transaction: (args) =>{
        if(!isAccountInstanced()){
            return new ResposeDto({}, [violations.NOT_INITIALIZED]);
        }
        const account = getAccount();
        return new ResposeDto(new AccountDto(account.activeCard, account.availableLimit - args.amount));
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

export const authorizer = (row) => {
    return acctions[Object.keys(row)[0]](Object.values(row)[0]);
}