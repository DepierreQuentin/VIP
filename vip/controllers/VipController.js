

let model = require ("../models/vip.js");
let async = require("async");
// ///////////////////////// R E P E R T O I R E    D E S     S T A R S

module.exports.Repertoire = 	function(request, response){
   response.title = 'Initiales';
   model.Repertoire(function(err, result){  // appel le module test qui exécute la requete SQL
      if (err) {
          console.log(err);
          return;
      }
 
     response.lettre= result; 
     
      response.render('repertoireVips', response);

   } );
}

module.exports.DescPlus = function(request, response){
   let lettre = request.params.lettre;
   response.title = 'Détails';

   async.parallel ([
      function(callback){
         model.Repertoire(function(err, result){callback(null, result)});  // appel le module test qui exécute la requete SQL
         },
         function(callback){
            model.descStar(lettre,function(err, result){ callback(null, result)}); // appel le module test qui exécute la requete SQL
         },                    
                              
      ],
      function (err, result){
      if (err) {
         console.log(err);
         return;
      }
            
     response.lettre= result[0]; 
     response.preview= result[1]; 
     
      response.render('repertoireVips', response);

   } );
}

module.exports.DescLettre = function(request, response){

   let vipnum = request.params.numStar;
   response.title = 'Fiche Star';

   async.parallel ([
      function(callback){
         model.Repertoire(function(err, result){callback(null, result)});  // appel le module test qui exécute la requete SQL
         },
         function(callback){
            model.getVipInfo(vipnum,function(err, result){callback(null, result)});  // appel le module test qui exécute la requete SQL
            },
            function(callback){
               model.getVipPhoto(vipnum, function(errP, resP){callback(null, resP)});
            },
               function(callback){
                  model.getVipMariage(vipnum,function(errM, resM){callback(null, resM)});
               },
                  function(callback){
                     model.getVipLiaison(vipnum,function(errL, resL){callback(null, resL)});
                  },
                     function(callback){
                        model.getFilmByActeurNum(vipnum,function(errF, resF){callback(null, resF)});
                     },
                        function(callback){
                           model.getRealisateurByVipNum(vipnum,function(errR, resR){callback(null, resR)});
                        },
                           function(callback){
                              model.getDefileByMannequinNum(vipnum,function(errD, resD){callback(null, resD)});
                           },
                              function(callback){
                                 model.getCouturierByVipNum(vipnum,function(errC, resC){callback(null, resC)});
                              },
                                 function(callback){
                                    model.getAlbumByChanteurNum(vipnum,function(errA, resA){callback(null, resA)});
                                 },
                                                          
            ],
      function (err, result){
      if (err) {
          console.log(err);
          return;
      }
      response.lettre= result[0]; 
   
      response.vipInfo= result[1]; 

      response.vipPhotos = result[2];
      response.vipPhoto1 = result[2][0];

      response.vipMariage = result[3];
      response.vipMariage1 = result[3][0];

      response.vipLiaison = result[4];
      response.vipLiaison1 = result[4][0];

      response.vipFilms = result[5];
      response.vipFilm1 = result[5][0];

      response.vipRealisateur = result[6][0];

      response.vipDefiles = result[7];
      response.vipDefile1 = result[7][0];

      response.vipCouturier = result[8][0];

      response.vipAlbums = result[9];
      response.vipAlbum1 = result[9][0];
  
     //console.log(result[1]);
     
      response.render('detailsVips', response);

   } );
}



