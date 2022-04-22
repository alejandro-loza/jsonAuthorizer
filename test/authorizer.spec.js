import {authorizer} from '../src/utils/authorizer';
import {violations} from '../src/utils/violationsEnum.js';

test('Should create a first time Account', () => {
    let myObj = new Object();
    myObj['active-card'] = false;
    myObj['available-limit'] = 750;

    let account = new Object()
    account.account = myObj;

    const response = authorizer(account);
    expect(response.account).not.toBeUndefined();
    expect(response.account.activeCard).toBe(false);
    expect(response.account.availableLimit).toBe(750);
    expect(response.violations.length).toBe(0);
});

test('Should not create an Account on already created one', () => {
    const expected = ['account-already-initialized'];
    let myObj = new Object();
    myObj['active-card'] = true;
    myObj['available-limit'] = 1000;

    let account = new Object()
    account.account = myObj;

    const response = authorizer(account);
    expect(response).not.toBeUndefined();
    expect(response.account.activeCard).toBe(false);
    expect(response.account.availableLimit).toBe(750);
    expect(response.violations.length).toBe(1);
    expect(response.violations).toEqual(expect.arrayContaining(expected))
});