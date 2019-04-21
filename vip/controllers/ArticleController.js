let model = require ("../models/vip.js");
let async = require("async");

module.exports.articles = 	function(request, response){

    response.title = 'Articles des stars';

    model.VipNomPrenom(function(err, result){  // appel le module test qui exécute la requete SQL
       if (err) {
           console.log(err);
           return;
       }
  
      response.VipNomPrenom= result; 
      
       response.render('accueilArticle', response);
 
    } );
 }

 module.exports.ArticleVip = 	function(request, response){
    let vipnum = request.params.numStar;
    response.title = 'Articles des stars';
   
    async.parallel ([
      function(callback){
         model.VipNomPrenom(function(err, result){callback(null, result)});  // appel le module test qui exécute la requete SQL
         },
         function(callback){
            model.getArticleByVipNum(vipnum,function(err, result){callback(null, result)});  // appel le module test qui exécute la requete SQL
            },
      ],
      function (err, result){
      if (err) {
         console.log(err);
         return;
      }
      
      response.VipNomPrenom= result[0];
      response.vipArticle= result[1]; 
      
       response.render('articles', response);
 
    } );
 }