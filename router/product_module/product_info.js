const express = require("express");
const router = express.Router();
const multer = require("multer");
const productController = require("../../controller/product_module/product_info");
// const { maxImageSizes } = require("../../restrictions_img/imagerestrictions");

const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, "product_img/");
  },
  filename: function (req, file, cd) {
    cd(null, Date.now() + file.originalname);
  },
});
const uploads = multer({
  storage: storage,
  limits: {
    fileSize: 70 * 1024, // 50 KB
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

router.post(
  "/createproduct",
  uploads.single("photo"),
  productController.createProduct
);
router.get("/getProduct", productController.getProduct);
router.get("/getProductby/:id", productController.getProductById);
router.patch(
  "/updateproductby/:id",
  uploads.single("photo"),
  productController.updateProduct
);
// router.patch("/update/:id",productController.updateProduct)
router.delete("/deleteProductby/:id", productController.deleteProduct);
module.exports = router;
