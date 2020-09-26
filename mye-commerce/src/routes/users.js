const express = require('express');
const router = express.Router();
const usersController = require("../controllers/usersControllers");
const guestRoute = require("../middlewares/guestRoute");
const userRoute = require("../middlewares/userRoute");
const multer = require('multer');
const path = require('path');
const validator = require("../validators/userValidator");


var storage = multer.diskStorage({
    destination: path.resolve(__dirname,'../../public/images/avatars'),
    filename: (req, file, cb) => {
          cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
const upload = multer({ 
    storage,
    limits: { fileSize: 1024 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
            file.error = "type";
            req.file = file;
            return cb(null, false, new Error('Está mal el mimeType'));
        }
        if(file.mimetype === "undefined"){
          return cb(null, true);
        }
        console.log(file)
        return cb(null, true);
    }
});


router.get('/register', guestRoute, usersController.register);
router.post('/register', upload.single("avatar"), validator.register , usersController.store);

router.get('/login', usersController.login);
router.post('/login', validator.login , usersController.processLogin);
router.put("/update", upload.single("avatar"), validator.register, usersController.update);
router.get('/logout', usersController.logout);

router.get('/profile/:id', userRoute, usersController.profile);

router.get('/admin/:id', userRoute, usersController.admin);

router.post("/messages", usersController.messages);

module.exports = router;
