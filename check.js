const request = require('request');
const fs = require('fs');


var env = 'production';
var logFile = env+'.log';








(async () => {


    //let s = fs.readFileSync(__dirname+'/data/src/original.csv', 'utf-8');
    //let arr = ConvertToTable(s);


    for(let i = 0; i < 4124; i ++){


        let dir = __dirname+'/data/res/ggzy/'+i;
        if(!fs.existsSync(dir)) console.log(dir)


    }
})();









function downImg(item, path = '', dir) {console.log(dir)
    return new Promise((resolve, reject) => {
        /*if(!fs.existsSync(dir))*/fs.mkdir(dir, 0777, ()=>{}) 
        request.get(item[3], function(err, res, body) {
            if(err){
                logger(item[0], 'error');
                fs.appendFile(__dirname+'/data/src/err.json', JSON.stringify(item), err=>{});
                resolve('');
            }


        } )
        .pipe(fs.createWriteStream(path))
        .on("finish", () => { 
            logger(item[0], 'success');
            resolve("ok");
        })
    })
}





var logger = (s, type)=>{
    let box = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + ' :: [' + type + '] :: '+s;
    console.log(box);
    let dat = fs.readFileSync(__dirname+'/log/'+logFile, 'utf-8');
    fs.writeFileSync(__dirname+'/log/'+logFile, dat + '\n' + box);
}



function ConvertToTable(data) {
    data = data.toString();
    var table = new Array();
    var rows = new Array();
    rows = data.split("\r\n");
    for (var i = 0; i < rows.length; i++) {
        table.push(rows[i].split(","));
    }
    return table;
}




