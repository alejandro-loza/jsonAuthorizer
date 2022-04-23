export default class AccountTransaction {

  constructor(amount, time, available, merchant) {
     this.merchant = merchant;
     this.amount = amount;
     this.time = time;
     this.available = available;
  }

};
