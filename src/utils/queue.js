export default class Queue {
  
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