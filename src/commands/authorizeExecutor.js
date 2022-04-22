import * as fs from 'fs';
import { Transform } from 'stream';
import JSONStream from 'JSONStream'; 

export const executor = (filePath) => {
    console.log('Processing '+ filePath);
    const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
    const streamEscritura = fs.createWriteStream("./files/destino.txt");
    const parser = JSONStream.parse('*');


    const authorizerProccesor = new Transform( {

        writableObjectMode: true,
        transform( data, encoding, callback){
            console.log(data);
       //     this.push(data.toString().toUpperCase())
            callback();
        },
        final(callback){
            callback();
        }
    
    })

    readStream.pipe(parser).pipe(authorizerProccesor);

};