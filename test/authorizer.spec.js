import {authorizer} from '../src/services/authorizer';

describe('Should test the transaction without account',  () =>{
    it('Should response account not initialized', async ()=>{
        const expected = ['account-not-initialized'];

        let myObj = new Object();
        myObj['merchant'] = 'Uber Eats';
        myObj['amount'] = 25;
        myObj['time'] = "2019-02-13T11:00:00.000Z";

        let row = new Object()
        row.transaction = myObj;
        const response = await authorizer(row);
        expect(response.account).toEqual({});
        expect(response.violations.length).toBe(1);
        expect(response.violations).toEqual(expect.arrayContaining(expected))
    });
});

describe('Should test the account creation cases', () => {
    it('Should create a first time Account', () => {
        let myObj = new Object();
        myObj['active-card'] = true;
        myObj['available-limit'] = 1000;

        let account = new Object()
        account.account = myObj;

        const response = authorizer(account);
        expect(response.account).not.toBeUndefined();
        expect(response.account.activeCard).toBe(true);
        expect(response.account.availableLimit).toBe(1000);
        expect(response.violations.length).toBe(0);
    });

    it('Should not create an Account on already created one', () => {
        const expected = ['account-already-initialized'];
        let myObj = new Object();
        myObj['active-card'] = true;
        myObj['available-limit'] = 750;

        let account = new Object()
        account.account = myObj;

        const response = authorizer(account);
        expect(response).not.toBeUndefined();
        expect(response.account.activeCard).toBe(true);
        expect(response.account.availableLimit).toBe(1000);
        expect(response.violations.length).toBe(1);
        expect(response.violations).toEqual(expect.arrayContaining(expected))
    });

});

describe('Should test the transaction', () =>{
    it('Should create a transaction', async ()=>{

        let myObj = new Object();
        myObj['merchant'] = 'Uber Eats';
        myObj['amount'] = 25;
        myObj['time'] = "2019-02-13T11:00:00.000Z";

        let row = new Object()
        row.transaction = myObj;
        const response = await authorizer(row);
        expect(response.account.activeCard).toBe(true);
        expect(response.account.availableLimit).toBe(975);
        expect(response.violations.length).toBe(0);
    });
});