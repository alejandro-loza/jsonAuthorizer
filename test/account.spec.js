import {getAccount, isAccountInstanced} from '../src/models/account';

test('Should ask for instance', () => {
 
  expect(isAccountInstanced()).toBe(false);

}); 

test('Should create a singleton Account', () => {
  let account = getAccount(true, 666);
  expect(account.activeCard).toBe(true);
  expect(account.availableLimit).toBe(666);

  let account2 = getAccount(false, 123);
  expect(account2.activeCard).toBe(true);
  expect(account2.availableLimit).toBe(666);
  expect(isAccountInstanced()).toBe(true);
});

test('Should test empty transaction queue', () => {
  expect(isAccountInstanced()).toBe(true);
  const account = getAccount();
  expect(account.transactionQueue.length).toEqual(0);
});

test('Should add transaction to queue and be inmutable', () => {
  expect(isAccountInstanced()).toBe(true);
  const account = getAccount();
  account.enqueueTransaction('test');
  expect(account.transactionQueue.length).toEqual(1);
  expect(account.transactionQueue[0]).toEqual('test');

  account.transactionQueue[0]== 'hacker troll';
  account.transactionQueue == [];
  expect(account.transactionQueue[0]).toEqual('test');

});

test('Should only add 3 transactions on the queue', () => {
  expect(isAccountInstanced()).toBe(true);
  const account = getAccount();
  account.enqueueTransaction('test2');
  account.enqueueTransaction('test3');
  account.enqueueTransaction('test4');

  expect(account.transactionQueue.length).toEqual(3);
  expect(account.transactionQueue).toEqual(["test", "test2", "test3"]);
  expect(account.lastTransaction).toEqual("test3")
  expect(account.firstTransaction).toEqual("test")

});

test('Should dequeue first', () => {
  expect(isAccountInstanced()).toBe(true);
  const account = getAccount();
  expect(account.transactionQueue.length).toEqual(3);
  expect(account.transactionQueue).toEqual(["test", "test2", "test3"]);

  account.dequeueTransaction();
  expect(account.transactionQueue.length).toEqual(2);
  expect(account.lastTransaction).toEqual("test3")
  expect(account.firstTransaction).toEqual("test2")

});