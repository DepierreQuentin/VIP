let HomeController = require('./../controllers/HomeController');
let VipController = require('./../controllers/VipController');
let ConnexionController = require('./../controllers/ConnexionController');
let PhotoController = require('./../controllers/PhotoController');


// Routes
module.exports = function(app){
  
// Main Routes
    app.get('/', ConnexionController.Connexion);
    app.get('/accueil', ConnexionController.Connexion);

//Connexion

    app.post('/Connexion', ConnexionController.Connexion);
    app.get('/Connexion', ConnexionController.testConnexion);
    app.get('/Deconnexion', ConnexionController.Deconnexion);

// VIPS
    app.get('/Vips', ConnexionController.testConnexion, VipController.Vip);

    app.get('/Vips/AjouterVipAccueil', ConnexionController.testConnexion, VipController.AjouterVipAccueil);
    app.post('/Vips/AjouterVip', ConnexionController.testConnexion, VipController.AjouterVip);

    app.get('/Vips/ModifierVipAccueil', ConnexionController.testConnexion, VipController.ModifierVipAccueil);
    app.post('/Vips/ModifierVip', ConnexionController.testConnexion, VipController.ModifierVip);

    app.get('/Vips/SupprimerVipAccueil', ConnexionController.testConnexion, VipController.SupprimerVipAccueil);
    app.post('/Vips/SupprimerVip',  ConnexionController.testConnexion, VipController.SupprimerVip);

// PHOTOS
    app.get('/Photos', ConnexionController.testConnexion, PhotoController.photos);

    //Ajouter
    app.get('/Photos/AjouterPhotoAccueil', ConnexionController.testConnexion, PhotoController.AjouterPhotoAccueil);
    app.post('/Photos/AjouterPhoto', ConnexionController.testConnexion, PhotoController.AjouterPhoto);

    //Supprimer
    app.get('/Photos/SupprimerPhotoAccueil', ConnexionController.testConnexion, PhotoController.SupprimerPhotoAccueil);
    app.post('/Photos/SupprimerPhoto', ConnexionController.testConnexion, PhotoController.SupprimerPhoto);
    app.post('/Photos/SupprimerPhoto/:vipNum', ConnexionController.testConnexion, PhotoController.SupprimerPhotoChoix);



// tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
