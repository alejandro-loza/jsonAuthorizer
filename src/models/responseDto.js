export default class ResponseDto {

  constructor(accountDto, violations) {
     this.account = accountDto
     this.violations = violations ? violations : [] 
  }

};
