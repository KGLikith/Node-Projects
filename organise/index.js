import fs from "fs/promises";
import fsn from "fs";
import path from "path";
import {dirname} from "path";
import { fileURLToPath } from "url";
const basepath =dirname(fileURLToPath(import.meta.url));
console.log(basepath);

// let basepath="c:/Users/Likith K G/Documents/webdev/projects/node/organise";
let files=await fs.readdir(basepath);
console.log(files);

for (const item of files) {
    let ext=item.split(".")[item.split(".").length-1];
    if(ext == "js" || ext =="json" || item.split(".").length<=1){
        continue;
    }
    if(fsn.existsSync(path.join(basepath,ext))){
        console.log(path.join(basepath,ext));
        // moving the file to the directories...
        fs.rename(path.join(basepath,item),path.join(basepath,ext,item));
    }else{
        await fs.mkdir(path.join(basepath,ext))
        fs.rename(path.join(basepath,item),path.join(basepath,ext,item));
    }
}