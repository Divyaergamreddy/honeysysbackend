const productModel = require("../../model/product_module/product_info");
const fs = require("fs");
const { maxImageSizes } = require("../../restrictions_img/imagerestrictions");
const errormessages = require("../../config/errormessages");
const statusmessages = require("../../config/statusmessages");
// const filename= require("../../")



// Create API
exports.createProduct = async (req, res) => {
  try {
    const { productname, productid, productdescription, productprice } =
      req.body;

    let imageUrl = ""; // Variable to store the image URL
    if (req.file && req.file.filename) {
      const { filename: photoFileName } = req.file;

      const fileSizeInBytes = req.file.size;
      if (fileSizeInBytes > 70 * 1024) {
        return res.status(400).json({
          status: "failed",
          message: "Please upload a file below 50 KB only",
        });
      }
      // Assuming the images are served from "/product_img" route
      imageUrl = `${req.protocol}://192.168.68.184:7171/product_img/${photoFileName}`;
    }

    // imageUrl = `${req.protocol}://${req.get(
    // "host"
    //   )}/product_img/${photoFileName}`;
    // }

    const productDataCreation = {
      productname,
      productid,
      productdescription,
      productprice,
      image: imageUrl, // Set the image URL here
    };

    const savedProduct = await productModel.create(productDataCreation);

    return res.status(201).json({
      status: statusmessages.SUCCESS,
      message: errormessages.PRODUCT_CREATED,
      data: savedProduct, // Return the saved product data object
    });
    // });
  } catch (error) {
    return res.status(401).json({
      status: statusmessages.FAILED,
      message: error.message,
    });
  }
};



// get API
exports.getProduct = async (req, res) => {
  try {
    const productData = await productModel.find({ del_flag: 0 });
    return res.status(200).json({
      status: statusmessages.SUCCESS,
      message: errormessages.GET_PRODUCT_DATA,
      productData,
    });
  } catch (error) {
    return res.status(500).json({
      status: statusmessages.FAILED,
      message: error.message,
    });
  }
};

// getById API
exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const productById = await productModel.findOne({ _id: id, del_flag: 0 });
    if (!productById) {
      return res.status(404).json({
        status: statusmessages.FAILED,
        message: errormessages.PRODUCT_ALREADY_DELETED,
      });
    }

    return res.status(200).json({
      status: statusmessages.SUCCESS,
      message: errormessages.GETBYID_PRODUCT_DATA,
      productById,
    });
  } catch (error) {
    return res.status(500).json({
      status: statusmessages.FAILED,
      message: error.message,
    });
  }
};

// update API
// exports.updateProduct = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const findProductInfo = await productModel.findById(id);
//     if (findProductInfo) {
//       const updateProductInfo = await productModel.findByIdAndUpdate(
//         { _id: id },
//         { $set: req.body },
//         { new: true }
//       );
//       return res.status(200).json({
//         status: statusmessages.SUCCESS,
//         message:errormessages.PRODUCT_UPDATED,
//         updateProductInfo,
//       });
//     }
//   } catch (error) {
//     return res.status(401).json({
//       status: statusmessages.FAILED,
//       message: error.message,
//     });
//   }
// };

// exports.updateProduct = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const findProductInfo = await productModel.findById(id);
//     if (!findProductInfo) {
//       return res.status(404).json({
//         status: statusmessages.FAILED,
//         message: errormessages.PRODUCT_NOT_FOUND,
//       });
//     }

//     // Prepare update object
//     const updateData = {};
//     if (req.body.productname) updateData.productname = req.body.productname;
//     if (req.body.productid) updateData.productid = req.body.productid;
//     if (req.body.productdescription) updateData.productdescription = req.body.productdescription;
//     if (req.body.productprice) updateData.productprice = req.body.productprice;

//     // Update image if provided
//     if (req.file && req.file.filename) {
//       const { filename: photoFileName } = req.file;
//       const imageUrl = `${req.protocol}://${req.get("host")}/product_img/${photoFileName}`;
//       updateData.image = imageUrl;

//       // Delete old image file if it exists
//       if (findProductInfo.image) {
//         const oldImagePath = findProductInfo.image.replace(`${req.protocol}://${req.get("host")}`, ".");
//         fs.unlinkSync(oldImagePath);
//       }
//     }

//     // Update the product
//     const updatedProduct = await productModel.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true }
//     );

//     return res.status(200).json({
//       status: statusmessages.SUCCESS,
//       message: errormessages.PRODUCT_UPDATED,
//       updatedProduct,
//     });
//   } catch (error) {
//     return res.status(401).json({
//       status: statusmessages.FAILED,
//       message: error.message,
//     });
//   }
// };

// Update API
exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const findProductInfo = await productModel.findById(id);

    if (!findProductInfo) {
      return res.status(404).json({
        status: statusmessages.FAILED,
        message: errormessages.PRODUCT_NOT_FOUND,
      });
    }

    const updateData = { ...req.body };

    // Update image if provided
    if (req.file && req.file.filename) {
      const { filename: photoFileName } = req.file;
      // Restricted Image size limit
      const maxSizeBytes = maxImageSizes * 1024;
      if (maxImageSizes > maxSizeBytes) {
        return res.status(400).json({
          status: statusmessages.FAILED,
          message: errormessages.IMAGE_SIZE_EXCEEDS_LIMIT,
        });
      }

      const imageUrl = `${req.protocol}://${req.get(
        "host"
      )}/product_img/${photoFileName}`;
      updateData.image = imageUrl;

      // Delete old image file if it exists
      if (findProductInfo.image) {
        const oldImagePath = findProductInfo.image.replace(
          `${req.protocol}://${req.get("host")}`,
          "."
        );
        fs.unlinkSync(oldImagePath);
      }
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return res.status(200).json({
      status: statusmessages.SUCCESS,
      message: errormessages.PRODUCT_UPDATED,
      updatedProduct,
    });
  } catch (error) {
    return res.status(401).json({
      status: statusmessages.FAILED,
      message: error.message,
    });
  }
};

// Delete API(Hard Delete)
// exports.deleteProduct=async(req,res)=>{
//     try {
//         const id=req.params.id 
//         const deleteProduct=await productModel.findByIdAndDelete(id)
//         return res.status(200).json({
//             status:statusmessages.SUCCESS,
//             message:"Product Information is deleted succesfully",
//             deleteProduct
//         })
//     } catch (error) {
//         return res.status(500).json({
//             status:statusmessages.FAILED,
//             message:error.message
//         })

//     }

// }


// Delete API(Soft Delete)
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    // Check if the user is already marked as deleted
    const productToDelete = await productModel.findById(id);
    if (!productToDelete) {
      return res.status(404).json({
        status: statusmessages.FAILED,
        message: errormessages.PRODUCT_NOT_FOUND,
      });
    }
    
    // Check if the product is already marked as deleted
    if (productToDelete.del_flag === 1) {
      return res.status(400).json({
        status: statusmessages.FAILED,
        message: errormessages.PRODUCT_ALREADY_DELETED,
      });
    }
    // Delete  the associated image file
    if(productToDelete.image){
      const imageName = productToDelete.image.split("/").pop(); // Extract image file name

    // Deleting the connected image file
    const imagePath = `http://192.168.68.184:7171/product_img/${imageName}`;
    if(fs.existsSync(imagePath)){
      // Delete the image file if exists
    fs.unlinkSync(imagePath);
    }
    }

  
    // Delete & Update the product to mark it as deleted
    const deleteProductDataById = await productModel.findByIdAndUpdate(
       id,
      { del_flag: 1 },
      { new: true }
    );
    if (!deleteProductDataById) {
        return res.status(404).json({
            status: statusmessages.FAILED,
            message: errormessages.PRODUCT_NOT_FOUND
        });
    }
    return res.status(200).json({
      status: statusmessages.SUCCESS,
      message: errormessages.PRODUCT_DELETED,
      deleteProductDataById,
    });
  } catch (error) {
    return res.status(500).json({
      status: statusmessages.FAILED,
      message: error.message,
    });
  }
};





// exports.deleteProduct = async (req, res) => {
//   try {
//     const id = req.params.id;
//     // Check if the product exists
//     const productToDelete = await productModel.findById(id);
//     if (!productToDelete) {
//       return res.status(404).json({
//         status: statusmessages.FAILED,
//          message: errormessages.PRODUCT_NOT_FOUND,
//       });
//     }
//     // Check if the product is already marked as deleted
//     if (productToDelete.del_flag === 1) {
//       return res.status(400).json({
//         status: statusmessages.FAILED,
//        message: errormessages.PRODUCT_ALREADY_DELETED
//       });
//     }
//     // Deleting the connected image file if it exists
//     if (productToDelete.image) {
//       // Extracting the file path from the URL
//       const imagePath = productToDelete.image.replace(`${req.protocol}://${req.get("host")}`, "."); 
//       try {
//         // Check if the file exists before attempting to delete it
      
//         fs.unlink(imagePath)
//       } catch (error) {
//         return res.status(500).json({
//           status: statusmessages.SUCCESS,
//           message: error.message,
//         });
//       }
//     }
//     // Update the product to mark it as deleted
//     const deleteProductDataById = await productModel.findByIdAndUpdate(
//       id,
//       { del_flag: 1 },
//       { new: true }
//     );
//     return res.status(200).json({
//       status: statusmessages.SUCCESS,
//       message: "Product deleted successfully",
//       deleteProductDataById
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: statusmessages.FAILED,
//       message: error.message,
//     });
//   }
// };