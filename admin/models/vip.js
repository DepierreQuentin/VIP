let db = require('../configDb');

/****************CONNEXION*************/

module.exports.getAccountParameter = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT * FROM PARAMETRES;";
              // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

/**************************************VIP******************************/

/****************Ajouter vip **********/

module.exports.nationalites = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT * FROM NATIONALITE";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
  }
  
  module.exports.vips = function(callback) {
    db.getConnection(function(err, connexion) {
      if (!err) {
        let sql = "SELECT * FROM VIP ORDER BY VIP_NOM";
        // console.log(sql);
        connexion.query(sql, callback);
        connexion.release();
      }
    });
  }
  
  module.exports.InsererVip = function(vip, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "INSERT INTO VIP SET NATIONALITE_NUMERO = " + vip.NATIONALITE_NUMERO + ""; 
            sql = sql + ", VIP_NOM = \"" + vip.VIP_NOM + "\", VIP_PRENOM = \"" +  vip.VIP_PRENOM;
            sql = sql + "\", VIP_SEXE = \"" + vip.VIP_SEXE + "\", VIP_NAISSANCE = \"" + vip.VIP_NAISSANCE + "";
            sql = sql +"\", VIP_TEXTE = \"" + vip.VIP_TEXTE + "\", VIP_DATE_INSERTION = NOW()";
             //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
  }


  module.exports.InsererPhotoVip = function(photoVip, vipNum, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "INSERT INTO PHOTO SET PHOTO_NUMERO = '1', VIP_NUMERO = " + vipNum + ", PHOTO_SUJET = \""+ photoVip.PHOTO_SUJET;
            sql = sql + "\", PHOTO_COMMENTAIRE = \"" + photoVip.PHOTO_COMMENTAIRE + "\", PHOTO_ADRESSE = \"" + photoVip.PHOTO_ADRESSE + "\"";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
  }

  /************* Modif VIP***************/

  
module.exports.UpdateVip = function(vip, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "UPDATE VIP SET NATIONALITE_NUMERO = " + vip.NATIONALITE_NUMERO + "";
            sql = sql + ", VIP_NOM = \"" + vip.VIP_NOM + "\", VIP_PRENOM = \"" +  vip.VIP_PRENOM;
            sql = sql + "\", VIP_SEXE = \"" + vip.VIP_SEXE + "\", VIP_NAISSANCE = \"" + vip.VIP_NAISSANCE + "";
            sql = sql + "\", VIP_TEXTE = \"" + vip.VIP_TEXTE + "\" WHERE VIP_NUMERO = " + vip.VIP_NUMERO;
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
  }
  
  module.exports.UpdatePhotoVip = function(photoVip, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "UPDATE PHOTO SET PHOTO_NUMERO = 1, VIP_NUMERO = " + photoVip.VIP_NUMERO + ", PHOTO_SUJET = \""+ photoVip.PHOTO_SUJET;
            sql = sql + "\", PHOTO_COMMENTAIRE = \"" + photoVip.PHOTO_COMMENTAIRE + "\", PHOTO_ADRESSE = \"" + photoVip.PHOTO_ADRESSE;
            sql = sql + "\" WHERE VIP_NUMERO = " + photoVip.VIP_NUMERO;
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
  }
  
  /***********Suppr VIP******* */

  
module.exports.DeleteVip = function(vipNum, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "DELETE FROM COMPORTE WHERE VIP_NUMERO = " + vipNum + ";";
            sql = sql + "DELETE FROM PHOTO WHERE VIP_NUMERO = " + vipNum + ";";
            sql = sql + "DELETE FROM DEFILEDANS WHERE VIP_NUMERO = " + vipNum + ";";
            sql = sql + "DELETE FROM APOURAGENCE WHERE VIP_NUMERO = " + vipNum + ";";
            sql = sql + "DELETE FROM MANNEQUIN WHERE VIP_NUMERO = " + vipNum + ";";
            sql = sql + "DELETE FROM DEFILE WHERE VIP_NUMERO = " + vipNum + ";";
            sql = sql + "DELETE FROM COUTURIER WHERE VIP_NUMERO = " + vipNum + ";";
            sql = sql + "DELETE FROM COMPOSER WHERE VIP_NUMERO = " + vipNum + ";";
            sql = sql + "DELETE FROM CHANTEUR WHERE VIP_NUMERO = " + vipNum + ";";
            sql = sql + "DELETE FROM JOUE WHERE VIP_NUMERO = " + vipNum + ";";
            sql = sql + "DELETE FROM FILM WHERE VIP_NUMERO = " + vipNum + ";";
            sql = sql + "DELETE FROM ACTEUR WHERE VIP_NUMERO = " + vipNum + ";";
            sql = sql + "DELETE FROM REALISATEUR WHERE VIP_NUMERO = " + vipNum + ";";
            sql = sql + "DELETE FROM MARIAGE WHERE VIP_NUMERO = " + vipNum + " OR VIP_VIP_NUMERO = " + vipNum + ";";
            sql = sql + "DELETE FROM LIAISON WHERE VIP_NUMERO = " + vipNum + " OR VIP_VIP_NUMERO = " + vipNum + ";";
            sql = sql + "DELETE FROM APOURSUJET WHERE VIP_NUMERO = " + vipNum + ";";
            sql = sql + "DELETE FROM VIP WHERE VIP_NUMERO = " + vipNum + ";";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
  }

/**************************************Photo******************************/


  module.exports.photoNumero = function(vipNum, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT MAX(PHOTO_NUMERO) AS photoNum FROM PHOTO WHERE VIP_NUMERO = " + vipNum;
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
  }
  
  module.exports.photosVip = function(vipNum, callback) {
    db.getConnection(function(err, connexion) {
      if (!err) {
        let sql = "SELECT * FROM PHOTO WHERE VIP_NUMERO = " + vipNum + " AND PHOTO_NUMERO != 1";
        // console.log(sql);
        connexion.query(sql, callback);
        connexion.release();
      }
    });
  }
  
  module.exports.InsererPhoto = function(photoNum, photoVip, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "INSERT INTO PHOTO SET PHOTO_NUMERO = " + photoNum + ", VIP_NUMERO = " + photoVip.VIP_NUMERO + ""; 
            sql = sql + ", PHOTO_SUJET = \""+ photoVip.PHOTO_SUJET;
            sql = sql + "\", PHOTO_COMMENTAIRE = \"" + photoVip.PHOTO_COMMENTAIRE + "\", PHOTO_ADRESSE = \"" + photoVip.PHOTO_ADRESSE + "\"";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
  }
  
  module.exports.DeletePhoto = function(vipNum, photoNum, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "DELETE FROM PHOTO WHERE VIP_NUMERO = " + vipNum + " AND PHOTO_NUMERO = " + photoNum;
            /*console.log(sql);*/
            connexion.query(sql, callback);
            connexion.release();
        }
    });
  }
  
  

