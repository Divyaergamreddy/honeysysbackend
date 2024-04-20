const express = require("express");
const cors = require("cors");
const path = require("path");
require("./connection/database");
const app = express();
app.use(express.json());
app.use(cors());

// user crud apis
const userRouter = require("./router/user_module/user_info");
app.use("/user", userRouter);
app.use("/product_img", express.static(path.join(__dirname, "product_img"))); // showing the directory name
// Register API
const registerRouter = require("./router/register_module/register_info");
app.use("/user", registerRouter);

// Products APIs
const productRouter = require("./router/product_module/product_info");
app.use("/product", productRouter);

// stores APIs
const storeRouter = require("./router/store_module/store_info");
app.use("/store", storeRouter);

const port = 7171;
app.listen(port, () => {
  console.log(`Server is being running http://localhost:${port}`);
});
