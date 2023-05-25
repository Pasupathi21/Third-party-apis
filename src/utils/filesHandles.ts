import * as fs from 'fs'

interface IReadeWriteFile {
    readPath: string;
    writePath: string;
    writeData: Record<string, any> | Record<string, any>[] | string | unknown 

}
export function removeFileWithPath(path: string){
    new Promise((resolve, reject) => {
        fs.unlink(path, (err) => {
            if(err) reject(err)
            resolve(true) 
        })
    })
}

export function readStream(path: any) {
    return fs.createReadStream(path)
}

export function readFile(path: string){
    return fs.readFile(path, (err, data) => {
        if(err) console.log('error')
    })
}

export function readtAndWrite({ writeData, writePath, readPath} : IReadeWriteFile) {
    return new Promise((resolve, reject) => {
        fs.readFile(readPath, 'utf-8', (e, rData) => {
            if(e) reject(e)
            let jsonData = JSON.parse(rData)
            if(Array.isArray(writeData)){
                jsonData.data = [ ...jsonData.data, ...writeData] 
            }else{
                jsonData.data.push(writeData)
            }
            
            jsonData = JSON.stringify(jsonData)
            writePath = writePath ? writePath : readPath
            fs.writeFile(writePath, jsonData, (er) => {
                if(er) reject(er)
                resolve(true)
            })
        })
    })
}