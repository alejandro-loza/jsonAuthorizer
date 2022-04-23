const QUEUE_LIMIT = 3;
class AccountRegistry {

  constructor(active, availableLimit) {
     this.activeCard = active;
     this.availableLimit = availableLimit;
     this.transactionQueue = new Queue(QUEUE_LIMIT);
  }

  static getInstance(active, availableLimit) {
    if (!AccountRegistry.instance && active != null && availableLimit > 0) {
        AccountRegistry.instance = new AccountRegistry(active, availableLimit);
    }
    return AccountRegistry.instance;
  }
  
}

class Queue {
  
  constructor(maxSize) {
    this.elements = [];
    this.maxSize = maxSize;
  }
  enqueue = (el) => {
      if(this.maxSize && length() <= this.maxSize ){
          this.elements.push(el);
      }
      else if(!this.maxSize ){
          this.elements.push(el);
      }
  }
  dequeue = () => {
      this.elements.length !== 0 ? this.list.shift() : 'No executable element';
  }

  first = () => {
    this.elements.length[0];
  }

  last = () =>{
    this.elements.slice(-1);
  }
  
  get length() {
    return this.elements.length;
  }
  get isEmpty() {
    return this.length === 0;
  }
};

export const getAccount = (active, availableLimit) => AccountRegistry.getInstance(active, availableLimit);
export const isAccountInstanced = () => Boolean(AccountRegistry.instance);