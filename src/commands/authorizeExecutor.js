import * as fs from 'fs';
import { Transform } from 'stream';
import JSONStream from 'JSONStream';
import {authorizer} from '../services/authorizer.js';

export const executor = (filePath) => {
    console.log('Processing...'+ filePath);
    const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
    const writeStream = fs.createWriteStream("./files/output.txt");
    const parser = JSONStream.parse('*');

    const authorizerProccesor = new Transform( {
        writableObjectMode: true,
        async transform( data, encoding, callback){
            const row = JSON.stringify(await authorizer(data));
            console.log(row);
            this.push(row + ','+"\r\n")
            callback();
        },
        final(callback){
            callback();
        }
    })

    readStream.on('error', (err) => console.log(JSON.stringify(err)));

    writeStream.on('finish', ()=>  console.log('Done!'));

    readStream.pipe(parser).pipe(authorizerProccesor).pipe(writeStream);
};