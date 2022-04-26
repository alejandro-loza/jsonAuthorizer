import { executor } from '../src/commands/authorizeExecutor.js';
import fs from 'fs';

jest.mock('fs');


describe('Should test the executor', ()=>{
   it('Executor read, process and writes', async ()=> {

      const readStream = {
        pipe: jest.fn().mockReturnThis(),
        on: jest.fn().mockImplementation(function (event, handler) {
          handler();
          return this;
        }),
      };

      const writeStream = {
        pipe: jest.fn().mockReturnThis(),
        on: jest.fn().mockImplementation(function( event, handler) {
          if (event === 'finish') {
            handler();
          }
          return this;
        }),
      };

      fs.createReadStream.mockReturnValueOnce(readStream);
      fs.createWriteStream.mockReturnValueOnce(writeStream);

      await executor('./files/input.json');
      expect(fs.createReadStream).toBeCalledTimes(1);
      expect(readStream.pipe).toBeCalledTimes(3);
      expect(fs.createWriteStream).toBeCalledTimes(1);

   });
});