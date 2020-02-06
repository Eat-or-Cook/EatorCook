const bcrypt = require('bcrypt')
const saltRounds = 10

function hash(password) {
    return new Promise ((res, rej)=>{
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                 if(err){
                     rej(err)
                 }else{
                     res(hash)
                 }
            })
        })
    }
    )
}

function compare(password, hash){
    return new Promise((resolve, rej)=>{
        bcrypt.compare(password, hash, function(err, res) {
            if(err){
                rej(err)
            }else{
                resolve(res)
            }
        });
    })
}


module.exports = {
    hash, compare
}