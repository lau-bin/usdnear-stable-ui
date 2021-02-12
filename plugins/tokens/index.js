const config = require('./tokens.config');
const fs = require('fs');
const path = require('path');

const Errors = {
    typeError: "Error parsing file, file contains malformed tokens",
    notFoundError: "Token not found"
}

module.exports =
class Tokens{

    constructor(globalData){
        this.tokens = new Map(Object.entries(JSON.parse(
            fs.readFileSync(path.join(globalData.APP_ROOT, config.tokenFile), 'utf8'))));
    }

    processFile(data){
        const last = data.length - 2;
        var parsedFile = "";
        var i = 0;
        var hasTokens = false;
        for (; i < last; i++){
            if (data[i] === '$' && data[i+1] === '{' && i+2 < data.length){
                let b = i+2;
                let token = "";
                while (data[b] !== '}') {
                    token += data[b];
                    b++;
                    if (b == data.length){
                        throw Errors.typeError;
                    }
                }
                token = token.trim();
                if (token = this.tokens.get(token)){
                    parsedFile += token;
                    i = b; //after last }
                    hasTokens = true;
                    continue;
                }
                else{
                    throw Errors.notFoundError;
                }
            }
            parsedFile += data[i];
        }
    
        if (hasTokens){
    
            for (; i < data.length; i++){
                parsedFile += data[i];
            }
            return parsedFile;
        }
        else{
            return data;
        }
    }
    
    start(source){
        try{ 
            
            return this.processFile(source);
        }catch (e){
            console.log(e);
            process.exit(1);
        }
    }

    validate(fileName){
        const extension = path.extname(fileName);
        if(config.allowedExtensions.find(value =>{
            if (extension === value){
                return true;
            }
        })){
            return true;
        }
    }
}



