const config = require('./copy-files.config');
const path = require('path');
const fs=require('fs');

module.exports = 
class CopyPlugin {

    constructor(globalData){
        this.destDir = path.join(globalData.APP_ROOT, config.destDir);
        this.sourceDir = path.join(globalData.APP_ROOT, config.sourceDir);
        this.filesToMove = JSON.parse(fs.readFileSync(
            path.join(globalData.APP_ROOT, config.filesToMove), 'utf8'));
        this.copyFiles = globalData.globalModule.copyFiles;
    }

    move(startPath){

        // let files = fs.readdirSync(startPath);
    
        // for (let i = 0; i < files.length; i++){
        //     const fileName = path.join(startPath, files[i]);
    
        //     if (fs.lstatSync(fileName).isDirectory()){
        //         this.move(fileName);
        //     }
        //     else if (this.filesToMove.files.find(file => file === files[i])){
        //         this.processFile(startPath, fileName, files[i], false)
        //     }
        // }

        this.filesToMove.files.forEach((file)=>{
            const fileName = path.join(startPath, file);
            if (fs.existsSync(fileName)){
                this.processFile(fileName, false)

            }
        });
        
    }

    processFile(srcPath, isFromWatcher){
        const destDirFullPath = this.exchangePaths(srcPath);
        this.createDirsofPath(path.dirname(destDirFullPath));
        if (isFromWatcher){
            isFromWatcher.close();
        }
        this.copyFiles(srcPath, destDirFullPath,
        
        (err) => {
            if (err){
                throw err += "\nError moving " + srcPath;
            }
        },
        (file) =>{
            this.watch(file);
        });
    }
    
    exchangePaths(startPath){
        const dir = startPath.replace(this.sourceDir, "");
        return path.join(this.destDir, dir);
    }
    createDirsofPath(path){
    
        if (!fs.existsSync(path)){
            fs.mkdirSync(path, {recursive:true}, err => {
                throw err += "\nError moving " + path;
            });
        }
    }
    
    start(){
        console.log('Moving files...');

        try{
            this.move(this.sourceDir);
        }catch (e){
            console.log(e);
            process.exit(1);
        }
    }
    watch(file){
        var watcher = fs.watch(file, null, (event, fileName) =>{
            const savedName = file;
            this.processFile(savedName, watcher);
        });
    }
}

