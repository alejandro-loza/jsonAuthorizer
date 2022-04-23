import * as fs from 'fs';
import { Transform } from 'stream';
import JSONStream from 'JSONStream';
import {authorizer} from '../utils/authorizer.js';

export const executor = (filePath) => {
    console.log('Processing '+ filePath);
    const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
    const writeStream = fs.createWriteStream("./files/destino.txt");
    const parser = JSONStream.parse('*');


    const authorizerProccesor = new Transform( {

        writableObjectMode: true,
        transform( data, encoding, callback){
            console.log('ahotizer..'+JSON.stringify(authorizer(data)));
            this.push(JSON.stringify(authorizer(data)) + ','+"\r\n")
            callback();
        },
        final(callback){
            callback();
        }
    
    })

    readStream.pipe(parser).pipe(authorizerProccesor).pipe(writeStream);

};