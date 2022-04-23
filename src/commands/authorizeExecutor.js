import * as fs from 'fs';
import { Transform } from 'stream';
import JSONStream from 'JSONStream';
import {authorizer} from '../services/authorizer.js';

export const executor = (filePath) => {
    console.log('Processing '+ filePath);
    const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
    const writeStream = fs.createWriteStream("./files/destino.txt");
    const parser = JSONStream.parse('*');


    const authorizerProccesor = new Transform( {

        writableObjectMode: true,
        async transform( data, encoding, callback){
            const authorizerResponse = await authorizer(data);
            console.log('ahotizer..'+JSON.stringify(authorizerResponse));
            this.push(JSON.stringify(authorizer(data)) + ','+"\r\n")
            callback();
        },
        final(callback){
            callback();
        }
    
    })

    readStream.pipe(parser).pipe(authorizerProccesor).pipe(writeStream);

};