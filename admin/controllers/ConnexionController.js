let model = require("../models/vip.js");
let Cryptr = require("cryptr");
let cryptr = new Cryptr('MaSuperCléDeChiffrementDeouF');



module.exports.testConnexion = function(request, response, next){
    response.title = "Connexion";

    if (request.session.login == null) {
      response.render('seConnecter', response);
    } else {
      return next();
    }
};


module.exports.Connexion = function(request, response){
    response.title = "Connexion";
    let id = request.body.login;
    let pwd = request.body.pwd
    
    model.getAccountParameter(function(err, result){  // appel le module test qui exécute la requete SQL
        if (err) {
            console.log(err);
            return;
        }
        let login = result[0]['LOGIN'];
        let passwd = result[0]['PASSWD'];
        let decryptedPwd = cryptr.decrypt(passwd);
    
        if(id===login && pwd===decryptedPwd){
            request.session.login = login;
            response.render('vips', response);
        }else{
            response.render('seConnecter', response);
        }


    });
};

module.exports.Deconnexion = function(request, response){
    response.title = "Connexion";
    request.session.login = null;
    response.render('seConnecter', response);
};
