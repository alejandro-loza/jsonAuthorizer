import {authorizer} from '../src/services/authorizer';
import {getAccount} from '../src/models/account.js';


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

describe('Should test the transaction hapy path', () =>{
    it('Should create transactions', async ()=>{

        let transaction1 = new Object();
        transaction1['merchant'] = 'Uber Eats';
        transaction1['amount'] = 25;
        transaction1['time'] = "2019-02-13T11:00:00.000Z";

        let row1 = new Object()
        row1.transaction = transaction1;
        const response = await authorizer(row1);
        expect(response.account.activeCard).toBe(true);
        expect(response.account.availableLimit).toBe(975);
        expect(response.violations.length).toBe(0);

        let transaction2 = new Object();
        transaction2['merchant'] = 'Burger King';
        transaction2['amount'] = 25;
        transaction2['time'] = "2019-02-13T11:00:10.000Z";

        let row2 = new Object()
        row2.transaction = transaction2;
        const response2 = await authorizer(row2);
        expect(response2.account.activeCard).toBe(true);
        expect(response2.account.availableLimit).toBe(950);
        expect(response2.violations.length).toBe(0);

        let transaction3 = new Object();
        transaction3['merchant'] = 'Burger King';
        transaction3['amount'] = 25;
        transaction3['time'] = "2019-02-13T11:00:20.000Z";

        let row3 = new Object()
        row3.transaction = transaction3;
        const response3 = await authorizer(row3);
        expect(response3.account.activeCard).toBe(true);
        expect(response3.account.availableLimit).toBe(925);
        expect(response3.violations.length).toBe(0);

        let transaction4 = new Object();
        transaction4['merchant'] = 'Habbid';
        transaction4['amount'] = 25;
        transaction4['time'] = "2019-02-13T11:00:20.000Z";

        let row4 = new Object()
        row4.transaction = transaction4;
        const response4 = await authorizer(row4);
        expect(response4.account.activeCard).toBe(true);
        expect(response4.account.availableLimit).toBe(900);
        expect(response4.violations.length).toBe(0);

        const account = getAccount();
        expect(account.lastTransaction)
          .toEqual({"amount": 25, "available": 900, "merchant": "Habbid", "time": "2019-02-13T11:00:20.000Z"})
        expect(account.firstTransaction)
          .toEqual({"amount": 25, "available": 950, "merchant": "Burger King", "time": "2019-02-13T11:00:10.000Z"})
    });
});