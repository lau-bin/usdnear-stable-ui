const fs = require('fs');
const CopyPlugin = require('./plugins/copy-files/index');
const Tokens = require('./plugins/tokens/index');


class PluginController {

    constructor(){
        this.globalData = {
            APP_ROOT: __dirname,
            moduleOrder: ["copy-files", "tokens"],
            globalModule:{}
        }
        this.tokens = new Tokens(this.globalData);
    }

    start(){
        this.globalData.globalModule.copyFiles = this.copyFiles.bind(this);
        new CopyPlugin(this.globalData).start();
    }
    
    
    copyFiles(source, dest, err, callback){
        if (this.tokens.validate(source)){
            var text = this.tokens.start(fs.readFileSync(source, 'utf8'));
            fs.writeFile(dest, text, (error)=>{
                if (error){
                    err(error);
                }else{
                    callback(source);
                }
            });
        }
        else{
            fs.copyFile(source, dest, (error)=>{
                if (error){

                    err(error);
                }else{

                    callback(source);
                }
            });
    
        }
    }
}

const pluginController = new PluginController();
pluginController.start();
