class AccountRegistry {

  constructor(active, availableLimit) {
     this.activeCard = active
     this.availableLimit = availableLimit
  }

  static getInstance(active, availableLimit) {
    if (!AccountRegistry.instance) {
        AccountRegistry.instance = new AccountRegistry(active, availableLimit);
    }
    return AccountRegistry.instance;
  }
  
}

export const getAccount = (active, availableLimit) => AccountRegistry.getInstance(active, availableLimit);