const fs = require('fs');



module.exports = (req,res,next)=>{

  const archivos = fs.readdirSync(__dirname + "/../public/files", (err, files) => {
        files.forEach(file => {
        });
      })
      console.log(archivos)
     next()    



     
     
    }
   