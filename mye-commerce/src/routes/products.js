const express = require('express');
const router = express.Router();
const productsController = require("../controllers/productsControllers");
const multer = require('multer');
const path = require("path");
const guestRoute = require("../middlewares/guestRoute");
const userRoute = require("../middlewares/userRoute");
const adminRoute = require("../middlewares/adminRoute");
const visitas = require("../middlewares/visitas");
const pagination = require("../middlewares/pagination");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
          cb(null, path.join(__dirname,'../../public/images/'))
    },
    filename: (req, file, cb) => {
          cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 1024 },
    fileFilter(req, file, next) {

      const isPhoto = file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' ? "" : file;

      console.log(file, "----------->",isPhoto)

      if (isPhoto) {
        next(null, true);
      } else {
          file.error = {
                error: "El formato de archivo debe ser de tipo PNG, JPG o JPEG"
              };
          req.file = file;
        next(null, false);
      }
    }
  });

// /*** CREATE ONE PRODUCT ***/
router.get('/create/',userRoute, adminRoute, productsController.create);
router.post('/create/',userRoute, adminRoute, upload.single("image"),productsController.store);

// /*** EDIT ONE PRODUCT ***/
router.get('/edit/:id',userRoute, adminRoute,productsController.edit);
router.put('/edit/:id',userRoute, adminRoute, upload.single("image"),productsController.update);

// /*** DELETE ONE PRODUCT***/
router.delete('/delete/:id',userRoute, adminRoute, productsController.destroy);



/* Cart. */
router.post("/cart", userRoute, productsController.cart);

/* GET product page. */
router.get('/:category/:id', visitas, productsController.detail);
router.get('/:category', pagination, productsController.category);

/* Messages */
router.post("/messages",userRoute, productsController.messages);

/* Offers */
router.post("/offers",upload.single("image"), productsController.offers);

module.exports = router;
