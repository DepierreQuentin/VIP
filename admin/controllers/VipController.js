
let model = require ("../models/vip.js");
let async = require("async");


module.exports.Vip = function(request, response){
   response.title = "Vips";
   response.render('vips', response);
};


/*********************Ajout******************/


module.exports.AjouterVipAccueil = function(request, response){
   response.title = "Vips";
   model.nationalites(function(err, result){
       if (err) {
           console.log(err);
           return;
       }

      response.nationalites = result;

      response.render('ajouterVip', response);
    } );
};

module.exports.AjouterVip = function(request, response){
   response.title = "Vips";

   let nom = request.body.nom;
   let prenom = request.body.prenom;
   let sexe = request.body.sexe;
   let dateNaissance = request.body.dateNaissance;
   let nationalite = request.body.nationalite;
   let commentaire = request.body.commentaire;
   let photoAdresse = request.body.photo;
   let photoSujet = request.body.photoSujet;
   let photoCommentaire = request.body.photoCommentaire;

   let vip = {'NATIONALITE_NUMERO': nationalite,'VIP_NOM': nom, 'VIP_PRENOM': prenom,'VIP_SEXE': sexe, 'VIP_NAISSANCE': dateNaissance, 'VIP_TEXTE': commentaire};
   let photoVip = {'PHOTO_SUJET': photoSujet, 'PHOTO_COMMENTAIRE': photoCommentaire, 'PHOTO_ADRESSE': photoAdresse};

    async.series([
        function(callback){
          model.nationalites(function(err, result) {callback(null, result)});
          },
          function(callback){
            model.InsererVip(vip, function(err2, result2) {callback(null, result2);});
            }
    ],
    function(err, result){
         if (err){
              console.log(err);
              return;
         }
         else {
           console.log("Ajout réussi !");
         }

         response.nationalites = result[0];

         model.InsererPhotoVip(photoVip, result[1].insertId);

         response.render('ajouterVip', response);
    });
};

/*********************Modification******************/

module.exports.ModifierVipAccueil = function(request, response){
   response.title = "Vips";
   async.series([
       function(callback){
         model.nationalites(function(err, result) {callback(null, result)});
         },
         function(callback){
            model.vips(function(err2, result2) {callback(null, result2);});
            }
   ],

   function(err, result){
        if (err){
             console.log(err);
             return;
        }

        response.nationalites = result[0];
        response.vips = result[1];

        response.render('modifierVip', response);
   });
};

module.exports.ModifierVip = function(request, response){
   response.title = "Vips";

   let vipNum = request.body.vip;
   let nom = request.body.nom;
   let prenom = request.body.prenom;
   let sexe = request.body.sexe;
   let dateNaissance = request.body.dateNaissance;
   let nationalite = request.body.nationalite;
   let commentaire = request.body.commentaire;
   let photoAdresse = request.body.photo;
   let photoSujet = request.body.photoSujet;
   let photoCommentaire = request.body.photoCommentaire;

   let vip = {'VIP_NUMERO': vipNum, 'NATIONALITE_NUMERO': nationalite,'VIP_NOM': nom, 'VIP_PRENOM': prenom,'VIP_SEXE': sexe, 'VIP_NAISSANCE': dateNaissance, 'VIP_TEXTE': commentaire};
   let photoVip = {'VIP_NUMERO': vipNum, 'PHOTO_SUJET': photoSujet, 'PHOTO_COMMENTAIRE': photoCommentaire, 'PHOTO_ADRESSE': photoAdresse};

    async.series([
        function(callback){
          model.nationalites(function(err, result) {callback(null, result)});
          },
          function(callback){
            model.vips(function(err2, result2) {callback(null, result2)});
            },
            function(callback){
              model.UpdateVip(vip, function(err3, result3) {callback(null, result3);});
              },
              function(callback){
                model.UpdatePhotoVip(photoVip, function(err4, result4) {callback(null, result4)});
              }
    ],
    function(err, result){
         if (err){
              console.log(err);
              return;
         }
         else {
           console.log("Modification réussi !");
         }

         response.nationalites = result[0];
         response.vips = result[1];

         response.render('modifierVip', response);
    });
};


/*********************Supression******************/

module.exports.SupprimerVipAccueil = function(request, response){
   response.title = "Vips";
   model.vips(function(err, result){
       if (err) {
           console.log(err);
           return;
       }

      response.vips = result;

      response.render('supprimerVip', response);
    } );
};

module.exports.SupprimerVip = function(request, response){
   response.title = "Vips";

   let vipNum = request.body.vip;

    async.series([
        function(callback){
          model.vips(function(err, result) {callback(null, result)});
          },
        function(callback){
           model.DeleteVip(vipNum, function(err3, result3) {callback(null, result3);});
           }
    ],
    function(err, result){
         if (err){
              console.log(err);
              return;
         }
         else {
           console.log("Suppression réussi !");
         }

         response.vips = result[0];

         response.render('supprimerVip', response);
    });
};

