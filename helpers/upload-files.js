import path from "path";
import { fileURLToPath, URL } from 'url';

import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const uploadFile = (files, validExt = ['png', 'jpg', 'gif', 'jpeg'], folder = '') => {

    return new Promise((resolve, reject) => {
        const {archivo} = files;

        const nombre = archivo.name.split('.');
        const extension = nombre[nombre.length - 1];
    
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extensiÃ³n ${extension} no es permitida`);
        }
    
        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads', carpeta, nombreTemp);
      
        archivo.mv(uploadPath, (err) => {
            if (err)
                reject(err);
        
            resolve(nombreTemp);
        });
    });
}

export default uploadFile;