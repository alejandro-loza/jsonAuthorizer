import AccountDto from '../models/accountDto.js';
import ResposeDto from '../models/responseDto.js';
import {getAccount} from '../models/account.js';
import {violations} from '../utils/violationsEnum.js';

let account = null;

const acctions = {
    account: (args) =>{
       if(!account){
           return createAccount(args);
       }
       return new ResposeDto(
           new AccountDto(account.activeCard, account.availableLimit), [violations.INITIALIZED]
       );
    },
    transaction: () =>{
        if(!account){
            return new ResposeDto({}, [violations.INITIALIZED]);
        }
    }
};

const createAccount = (args) => {
    console.log('Creating account... ' + JSON.stringify(args));
    account = getAccount(args['active-card'], args['available-limit']);
    console.log('Created account... ' + JSON.stringify(account));
    return new ResposeDto(new AccountDto(account.activeCard, account.availableLimit));
}

export const authorizer = (row) => {
    return acctions[Object.keys(row)[0]](Object.values(row)[0]);
}