import Queue from '../utils/queue.js';

class AccountRegistry {

  constructor(active, availableLimit) {
     this.activeCard = active;
     this.availableLimit = availableLimit;
     this.transactionQueue = new Queue(3);
  }

  static getInstance(active, availableLimit) {
    if (!AccountRegistry.instance && active != null && availableLimit > 0) {
        AccountRegistry.instance = new AccountRegistry(active, availableLimit);
    }
    return AccountRegistry.instance;
  }
  
}

export const getAccount = (active, availableLimit) => AccountRegistry.getInstance(active, availableLimit);
export const isAccountInstanced = () => Boolean(AccountRegistry.instance);