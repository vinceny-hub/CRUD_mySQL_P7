
const multer = require('multer');                                       // Importation du package multer

const storage = multer.diskStorage({                                    // Destination du fichier sur le disque
  destination: (req, file, callback) => {
  callback(null, 'images');
  },

  filename: (req, file, callback) => {                                  // Configuration du nom du fichier (nom + extension + date)
    const fileName = file.originalname.split('.')[0]
    const extension = file.originalname.split('.')[1]
    const name = fileName.split(' ').join('_');
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('file');












// const multer = require('multer')
// //type d'images
// const MIME_TYPES = {
//     'image/jpg': 'jpg',
//     'image/jpeg': 'jpg',
//     'image/png': 'png'
// }
// //destination de l'import des images
// const storage = multer.diskStorage({
//     destination: (req, file, callback) => { 
//     callback(null, 'images')
// },
// //nom du fichier image, nouveau nom crée en fonction de la date de création
// filename: (req, file, callback) => {
//     const name = file.originalname.split(' ').join('_')
//     const extension = MIME_TYPES[file.mimetype]
//     callback(null, name + Date.now() +'.'+ extension)
//     console.log(name)
// }
// })

// module.exports = multer({ storage }).single('image')