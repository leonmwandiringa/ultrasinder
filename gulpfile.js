/**
 * @author Leon Mwandiringa
 * @uses compile and watch typescript files
 */

const gulp = require("gulp");
const typescript = require("gulp-typescript");
const JSON_FILES = ["tsconfig.json", "package.json"];
const ASSET_ASSIST = ["src/**.json", "src/**/**.json"];
const fs = require('fs');
const StarterFolders = [
    {
        name: "dist",
        children: []
    },
    {
        name: "Logs",
        children: ['Logs.log']
    },
    {
        name: "Tests",
        children: []
    }
];
//define instructions
const tsProject = typescript.createProject(JSON_FILES[0]);

/**
 * @uses creating starter folders and files
 * @return void exec
 * @params Starterolders array(object)
 */
(()=>{
    StarterFolders.forEach((folder)=>{
        if(!fs.existsSync(`./${folder.name}`)){
            //make dir
            fs.mkdirSync(folder.name);
            //if there are files
            if(folder.children.length > 0){
                folder.children.forEach((file)=>{
                    if(!fs.existsSync(`./${folder}/${file}`)){
                        fs.writeFileSync(`./${folder.name}/${file}`, "");
                    }
                });
            }
        }
    });
})();

/**
 * @uses single compiling task
 * @return piping to dist folder
 */
gulp.task("compile", ()=>{
    const tsResult = tsProject.src().pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('dist'));
});

/**
 * @uses continous compiling task
 * @return piping to dist folder
 */
gulp.task("watch", ["compile"], ()=>{
    gulp.watch("src/**/**.ts", ["compile"]);
});

/**
 * @uses compiling task assets
 * @return piping to dist folder
 */
gulp.task("assets", ()=>{
    return gulp.src(ASSET_ASSIST).pipe(gulp.dest("dist"));
});

//merge commands
gulp.task("default", ["watch", "assets"]);