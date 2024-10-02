const denunciaController = require('../controllers/denunciaController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports = (app) => {
    const basePath = '/denuncia';

    app.route(basePath)
        .post(upload.single('image'), denunciaController.postDenuncia) 
        .get(denunciaController.getDenuncia);

    app.route(`${basePath}/:id`)
        .delete(denunciaController.deleteDenuncia)
        .put(denunciaController.putDenuncia)
        .patch(denunciaController.patchDenuncia);
};
