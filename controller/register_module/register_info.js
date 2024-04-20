const userRegisterModel = require("../../model/register_module/register_info");
const bcrypt = require("bcrypt");
const saltRound = 10;
const jwt = require("jsonwebtoken");
const secretKey = "qwerty";
const otpGenerator = require("otp-generator");
const errormessages = require("../../config/errormessages");
const statusmessages = require("../../config/statusmessages");

// Register API
exports.registerUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    // Generating OTP
    const otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: true,
      upperCase: false,
      specialChars: false,
    });

    // Validate request body

    if (!username || !email) {
      return res.status(400).json({
        status: statusmessages.FAILED,
        message: errormessages.REGISTER_REQUIRED_FIELDS,
      });
    }

    // Validate email format
    const emailRegExp = /.+\@+..+\.+..+/;
    if (!emailRegExp.test(email)) {
      return res.status(400).json({
        status: statusmessages.FAILED,
        message: errormessages.INVALID_EMAIL_FORMAT,
      });
    }

    // // Validate password format or any other validation
    // // For simplicity, let's assume password should be at least 5 characters long
    // if (password.length !== 5) {
    //   return res.status(400).json({
    //     status: statusmessages.FAILED,
    //     message: errormessages.PASSWORD_LENGTH,
    //   });
    // }

    // // Check if passwords match
    // if (password !== confirmpassword) {
    //   return res.status(400).json({
    //     status: statusmessages.FAILED,
    //     message: errormessages.PASSWORD_MISMATCH,
    //   });
    // } else if (password.toLowerCase() == "password") {
    //   return res.status(409).json({
    //     status: statusmessages.FAILED,
    //     message: errormessages.PASSWORD_NOT_ALLOWED,
    //   });
    // }

    // Check if user already exists
    const isUser = await userRegisterModel.findOne({ email });
    if (isUser) {
      return res.status(409).json({
        status: statusmessages.FAILED,
        message: errormessages.USER_EXISTS,
      });
    }

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, saltRound);

    // Create user
    const newUser = await userRegisterModel.create({
      username,
      email,
      // password: hashedPassword,
      otp: otp,
    });

    // Return success response
    return res.status(201).json({
      status: statusmessages.SUCCESS,
      message: errormessages.REGISTER_SUCCESS,
      user: newUser,
      otp: otp,
    });
  } catch (error) {
    // Handle errors
    return res.status(500).json({
      status: statusmessages.FAILED,
      message: error.message,
    });
  }
};

// Login API
exports.loginUser = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate request body
    if (!email || !otp) {
      return res.status(400).json({
        status: statusmessages.FAILED,
        message: errormessages.LOGIN_REQUIRED_FIELDS,
      });
    }

    // Find user by email
    const user = await userRegisterModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: statusmessages.FAILED,
        message: errormessages.UNREGISTERED_EMAIL,
      });
    }
    // OTP Validation
    if (user.otp !== otp) {
      return res.status(401).json({
        status: statusmessages.FAILED,
        MESSAGE: errormessages.INVALID_OTP,
      });
    }
    // // Compare passwords
    // const passwordMatch = await bcrypt.compare(password, user.password);
    // if (!passwordMatch) {
    //   // Increment login attempts
    //   await userRegisterModel.findByIdAndUpdate(user._id, {
    //     $inc: { loginAttempts: 1 },
    //   });

    //   // Check if login attempts exceed limit
    //   if (user.loginAttempts >= 5) {
    //     return res.status(401).json({
    //       status: statusmessages.FAILED,
    //       message: errormessages.MAX_LOGIN_ATTEMPTS_EXCEEDED,
    //     });
    //   }

    //   return res.status(401).json({
    //     status: statusmessages.FAILED,
    //     message: errormessages.INCORRECT_PASSWORD,
    //   });
    // }

    // Reset login attempts for successful login
    // await userRegisterModel.findByIdAndUpdate(user._id, { loginAttempts: 0 });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, secretKey);

    // Return success response
    return res.status(200).json({
      status: statusmessages.SUCCESS,
      message: errormessages.LOGIN_SUCCESS,
      user,
      token,
    });
  } catch (error) {
    // Handle errors
    return res.status(500).json({
      status: statusmessages.FAILED,
      message: error.message,
    });
  }
};

// Logout API
exports.logoutUser=async(req,res)=>{
  try {
    return res.status(200).json({
      status:statusmessages.SUCCESS,
      message:errormessages.LOGOUT_SUCCESS,
    })
  } catch (error) {
    return res.status(500).json({
      status:statusmessages.FAILED,
      message:error.message,
    })
  }
}