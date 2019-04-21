let HomeController = require('./../controllers/HomeController');
let VipController = require('./../controllers/VipController');
let ArticleController = require('./../controllers/ArticleController');
let AlbumController = require('./../controllers/AlbumController');




// Routes
module.exports = function(app){
  
// Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

// VIP
    app.get('/repertoire', VipController.Repertoire);
    app.get('/repertoire/:lettre', VipController.DescPlus);
    app.get('/repertoire/vip/:numStar', VipController.DescLettre);

// articles 
    app.get('/articles', ArticleController.articles);
    app.get('/articles/:numStar', ArticleController.ArticleVip);

 // albums
   app.get('/album', AlbumController.Album);
   app.get('/album/:numStar', AlbumController.ListerAlbum)

// tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
