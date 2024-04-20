const maxImageSizes = {
    'image/jpeg': 1, 
    'image/png': 2,  
    'image/gif': 200,  
    'image/tiff': 400,
    'image/vnd.adobe.photoshop': 600, 
    'application/pdf': 800, 
    'application/postscript': 700, 
    'application/illustrator': 900, 
  };
  
  const checkImageType = (fileType, fileSize) => {
    if (!(fileType in maxImageSizes)) {
      throw new Error("Unsupported image type");
    }
  
    const maxSizeBytes = maxImageSizes[fileType] * 1024;
    if (fileSize > maxSizeBytes) {
      throw new Error(`Image size for ${fileType} exceeds limit`);
    }
  };
  
  module.exports = { checkImageType };






// const maxImageSize = {
//     'image/jpeg': 5*1024, 
//     'image/png': 5*1024,  
//     'image/gif': 200*1024,  
//     'image/tiff': 400*1024,
//     'image/vnd.adobe.photoshop': 600*1024, 
//     'application/pdf': 800*1024, 
//     'application/postscript': 700*1024, 
//     'application/illustrator': 900*1024, 
//   };
  
//   const checkImageType = (fileType, fileSize) => {
//     if (!(fileType in maxImageSize)) {
//       throw new Error("Unsupported image type");
//     }
//     const maxSizeBytes = maxImageSize[fileType];
//     if(fileSize>maxImageSize){
// //     if (fileType === 'image/png' && fileSize > maxSizeBytes) {
// //       throw new Error("PNG image size exceeds limit");
//     // } else if (fileSize > maxSizeBytes) {
//       throw new Error(`Image size for ${fileType} exceeds limit`);
//     }
//   };
  
//   module.exports = { checkImageType }