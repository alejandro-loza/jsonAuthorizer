const QUEUE_LIMIT = 3;
class AccountRegistry {
  _transactionQueue = new Queue(QUEUE_LIMIT);

  constructor(active, availableLimit) {
     this.activeCard = active;
     this.availableLimit = availableLimit;
  }

  static getInstance(active, availableLimit) {
    if (!AccountRegistry.instance && active != null && availableLimit > 0) {
        AccountRegistry.instance = new AccountRegistry(active, availableLimit);
    }
    return AccountRegistry.instance;
  }

  get transactionQueue() {
    return this._transactionQueue.getElements();
  }

  get lastTransaction() {
    return this._transactionQueue.last();
  }

  get firstTransaction() {
    return this._transactionQueue.first();
  }

  get isTransactionFull() {
    return this._transactionQueue.isFull();
  }

  get isTransactionEmpty() {
    return this._transactionQueue.isEmpty();
  }

  enqueueTransaction(transaction) {
    return this._transactionQueue.enqueue(transaction);
  }

  dequeueTransaction() {
    return this._transactionQueue.dequeue();
  }
  
}

class Queue {
  _elements = [];
  
  constructor(maxSize) {
    this.maxSize = maxSize;
  }

  enqueue = (el) => {
      if(this.maxSize && this.length < this.maxSize ){
          this._elements.push(el);
      }
      else if(!this.maxSize ){
          this._elements.push(el);
      }
  }

  dequeue = () => {
      if(!this.isEmpty()) this._elements.shift();
  }

  first = () => {
    return this._elements.slice(0)[0];
  }

  last = () =>{
    return this._elements.slice(-1)[0];
  }
  
  getElements() {
    return this._elements;
  }
  
  get length() {
    return this._elements.length;
  }
  isEmpty() {
    return  this._elements.length === 0;
  }
  isFull() {
    return this._elements.length >= this.maxSize ;
  }
};

export const getAccount = (active, availableLimit) => AccountRegistry.getInstance(active, availableLimit);
export const isAccountInstanced = () => Boolean(AccountRegistry.instance);