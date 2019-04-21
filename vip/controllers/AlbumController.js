let model = require ("../models/vip.js");
let async = require("async");
// ////////////////////// L I S T E R     A L B U M S

module.exports.Album = 	function(request, response){
   let vipnum = request.params.numStar;
   response.title = 'Album des stars';

   model.getAllFirstPhotos(function(err, result){  // appel le module test qui exécute la requete SQL
      if (err) {
          console.log(err);
          return;
      }
 
     response.AllPhotos= result;


   response.render('accueilAlbum', response);
  });
}


module.exports.ListerAlbum = 	function(request, response){
  let vipnum = request.params.numStar;
  response.title = 'Album des stars';
 
  async.parallel ([
    function(callback){
       model.getAllFirstPhotos(function(err, result){callback(null, result)});  // appel le module test qui exécute la requete SQL
       },
       function(callback){
          model.getComsByVipNum(vipnum,function(err, result){callback(null, result)});  // appel le module test qui exécute la requete SQL
          },
    ],
    function (err, result){
    if (err) {
       console.log(err);
       return;
    }
    
    response.AllPhotos= result[0];
    response.vipPhoto= result[1]; 
    
     response.render('listerAlbum', response);

  } );
}
