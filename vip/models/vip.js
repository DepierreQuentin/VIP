let db = require('../configDb');


module.exports.test = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT COUNT(*) AS NB FROM vip ;";
              // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.Repertoire = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT LEFT(vip_nom, 1) as LETTRE FROM VIP ORDER BY 1 ;";
              // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.descStar = function(lettre, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT VIP_NOM as vip_nom, VIP_PRENOM as vip_prenom, PHOTO_ADRESSE as photo_adress,";
            sql = sql+"v.vip_numero as vipnum, \'"+[lettre]+"\' AS LETTRE FROM vip v, photo p";
            sql = sql+" WHERE v.VIP_NUMERO = p.VIP_NUMERO AND substring(VIP_NOM,1,1)=\'"+ [lettre]+ "\'";
            sql = sql+ " AND p.PHOTO_NUMERO = 1";
            sql = sql+ " ORDER BY 1 ;";

            
    
              // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getVipInfo = function(vipnum, callback){
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT VIP_NOM, VIP_PRENOM, VIP_SEXE, VIP_NAISSANCE, VIP_TEXTE, NATIONALITE_NOM";
            sql = sql+" FROM vip v, nationalite n";
            sql = sql+" WHERE v.nationalite_numero = n.nationalite_numero";
            sql = sql+" AND v.VIP_NUMERO="+[vipnum];
            
    
              // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getVipPhoto = function(vipnum, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT PHOTO_ADRESSE as photo_adress,";
            sql = sql+" v.vip_numero as vipnum, p.photo_numero FROM vip v, photo p";
            sql = sql+" WHERE v.VIP_NUMERO = p.VIP_NUMERO AND p.VIP_NUMERO="+[vipnum];
            sql = sql+" ORDER BY 1 ";
    
              console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getVipMariage = function(vipnum, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT v2.VIP_PRENOM as prenomVip2, v2.VIP_NOM as nomVip2, v2.VIP_NUMERO as vip2Num, LEFT(v2.VIP_NOM,1) as LETTRE, PHOTO_ADRESSE, v2.VIP_TEXTE,";
            sql = sql+" DATE_EVENEMENT, MARIAGE_FIN, MARIAGE_LIEU";
            sql = sql+" FROM MARIAGE m, VIP v1, VIP v2, photo p";
            sql = sql+" WHERE v1.VIP_NUMERO = m.VIP_NUMERO";
            sql = sql+" AND v2.VIP_NUMERO = m.VIP_VIP_NUMERO";
            sql = sql+" AND v2.VIP_NUMERO = p.VIP_NUMERO";
            sql = sql+" AND p.PHOTO_NUMERO = 1";
            sql = sql+" AND v1.VIP_NUMERO ="+[vipnum];
            sql = sql+" ORDER BY DATE_EVENEMENT";

              console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getVipLiaison = function(vipnum, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT v2.VIP_PRENOM as prenomVip2, v2.VIP_NOM as nomVip2, v2.VIP_NUMERO as vip2Num, LEFT(v2.VIP_NOM,1) as LETTRE, PHOTO_ADRESSE, v2.VIP_TEXTE,";
            sql = sql+" DATE_EVENEMENT, LIAISON_MOTIFFIN";
            sql = sql+" FROM LIAISON l, VIP v1, VIP v2, photo p";
            sql = sql+" WHERE v1.VIP_NUMERO = l.VIP_NUMERO";
            sql = sql+" AND v2.VIP_NUMERO = l.VIP_VIP_NUMERO";
            sql = sql+" AND v2.VIP_NUMERO = p.VIP_NUMERO";
            sql = sql+" AND p.PHOTO_NUMERO = 1";
            sql = sql+" AND v1.VIP_NUMERO ="+[vipnum];
            sql = sql+" ORDER BY DATE_EVENEMENT";

              console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getFilmByActeurNum = function(vipnum, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT FILM_TITRE, PHOTO_ADRESSE, PHOTO_NUMERO, vActeur.VIP_SEXE as vipSexe, vReal.VIP_TEXTE, a.VIP_NUMERO AS vipNum,  FILM_DATEREALISATION, vReal.VIP_NUMERO as realNum,";
            sql = sql+" vReal.VIP_PRENOM as realPre, vReal.VIP_NOM as realNom, LEFT(vReal.VIP_NOM,1) as LETTRE";
            sql = sql+" FROM VIP vActeur, VIP vReal, ACTEUR a, FILM f, JOUE j, REALISATEUR r, photo p";
            sql = sql+" WHERE vActeur.VIP_NUMERO=a.VIP_NUMERO";
            sql = sql+" AND vActeur.VIP_NUMERO=j.VIP_NUMERO";
            sql = sql+" AND j.FILM_NUMERO = f.FILM_NUMERO";
            sql = sql+" AND r.VIP_NUMERO = f.VIP_NUMERO";
            sql = sql+" AND vReal.VIP_NUMERO = r.VIP_NUMERO";
            sql = sql+" AND vReal.VIP_NUMERO = p.VIP_NUMERO";
            sql = sql+" AND p.PHOTO_NUMERO = 1";
            sql = sql+" AND vActeur.VIP_NUMERO ="+[vipnum];
            sql = sql+" ORDER BY FILM_DATEREALISATION";

              console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getRealisateurByVipNum = function(vipnum, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT r.VIP_NUMERO as vipnum";
            sql = sql+" FROM VIP v, REALISATEUR r";
            sql = sql+" WHERE v.VIP_NUMERO = r.VIP_NUMERO";
            sql = sql+" AND v.VIP_NUMERO ="+[vipnum];

              console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getDefileByMannequinNum = function(vipnum, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT m.VIP_NUMERO as vipnum, PHOTO_ADRESSE, vipCout.VIP_TEXTE, DEFILE_LIEU, DEFILE_DATE, vipCout.VIP_PRENOM as coutPre, vipCout.VIP_NOM as coutNom,";
            sql = sql+" vipCout.VIP_NUMERO as coutNum, LEFT(vipCout.VIP_NOM,1) as LETTRE",
            sql = sql+" FROM VIP man, VIP vipCout, MANNEQUIN m, DEFILEDANS dd, DEFILE d, COUTURIER c, photo p";
            sql = sql+" WHERE man.VIP_NUMERO = m.VIP_NUMERO";
            sql = sql+" AND m.VIP_NUMERO = dd.VIP_NUMERO";
            sql = sql+" AND dd.DEFILE_NUMERO = d.DEFILE_NUMERO";
            sql = sql+" AND d.VIP_NUMERO = c.VIP_NUMERO";
            sql = sql+" AND vipCout.VIP_NUMERO = c.VIP_NUMERO";
            sql = sql+" AND vipCout.VIP_NUMERO = p.VIP_NUMERO";
            sql = sql+" AND p.PHOTO_NUMERO = 1";
            sql = sql+" AND man.VIP_NUMERO ="+[vipnum];
            sql = sql+" ORDER BY DEFILE_DATE";

              console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getCouturierByVipNum = function(vipnum, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT c.VIP_NUMERO as vipnum";
            sql = sql+" FROM VIP v, COUTURIER c";
            sql = sql+" WHERE v.VIP_NUMERO = c.VIP_NUMERO";
            sql = sql+" AND v.VIP_NUMERO ="+[vipnum];

              console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getAlbumByChanteurNum = function(vipnum, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT VIP_SEXE, ch.VIP_NUMERO as vipnum, CHANTEUR_SPECIALITE, ALBUM_TITRE, ALBUM_DATE, MAISONDISQUE_NOM";
            sql = sql+" FROM VIP v, CHANTEUR ch, COMPOSER co, ALBUM a, MAISONDISQUE m";
            sql = sql+" WHERE v.VIP_NUMERO = ch.VIP_NUMERO";
            sql = sql+" AND ch.VIP_NUMERO = co.VIP_NUMERO";
            sql = sql+" AND co.ALBUM_NUMERO = a.ALBUM_NUMERO";
            sql = sql+" AND a.MAISONDISQUE_NUMERO = m.MAISONDISQUE_NUMERO";
            sql = sql+" AND v.VIP_NUMERO ="+[vipnum];
            sql = sql+" ORDER BY ALBUM_DATE";

              console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};


///////////////////////////ARTICLES VIP///////////////////////////

module.exports.VipNomPrenom = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT VIP_NOM, VIP_PRENOM, VIP_NUMERO FROM VIP ORDER BY VIP_NOM;";
              // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getArticleByVipNum = function(vipnum, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT ARTICLE_RESUME, ARTICLE_TITRE, ARTICLE_DATE_INSERT, VIP_PRENOM, VIP_NOM, v.VIP_NUMERO";
            sql = sql+" FROM VIP v LEFT JOIN APOURSUJET ap ON ap.VIP_NUMERO = v.VIP_NUMERO";
            sql = sql+" LEFT JOIN article a ON ap.ARTICLE_NUMERO = a.ARTICLE_NUMERO";
            sql = sql+" WHERE v.VIP_NUMERO ="+[vipnum];
              // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

///////////////////ALBUM VIP////////////////

module.exports.getAllFirstPhotos = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT PHOTO_ADRESSE, VIP_PRENOM, VIP_NOM, v.VIP_NUMERO FROM VIP v, PHOTO p"; 
            sql = sql+" WHERE v.VIP_NUMERO = p.VIP_NUMERO AND PHOTO_NUMERO = 1 ORDER BY VIP_NOM";
              // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getComsByVipNum= function(vipnum, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT PHOTO_ADRESSE, PHOTO_COMMENTAIRE, VIP_PRENOM, VIP_NOM, v.VIP_NUMERO FROM VIP v, PHOTO p"; 
            sql = sql+" WHERE v.VIP_NUMERO = p.VIP_NUMERO AND v.VIP_NUMERO ="+[vipnum]; 
              console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
