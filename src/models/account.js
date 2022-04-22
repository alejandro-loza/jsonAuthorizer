class Account {

  constructor(active, availableLimit) {
     this.activeCard = active
     this.availableLimit = availableLimit
  }

  static getInstance(active, availableLimit) {
    if (!Account.instance) {
        Account.instance = new Account(active, availableLimit);
    }
    return Account.instance;
  }
}

export const getAccount = (active, availableLimit) => Account.getInstance(active, availableLimit);