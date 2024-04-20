// To target errorMessages in controller
module.exports = {
    // Register error messages
    REGISTER_REQUIRED_FIELDS: "Please fill in all the fields to register",
    INVALID_EMAIL_FORMAT: "Invalid email format",
    PASSWORD_LENGTH: "Password must be at least 5 characters long",
    PASSWORD_MISMATCH: "Both passwords should match",
    PASSWORD_NOT_ALLOWED: "Password can't be 'password'",
    USER_EXISTS: "Email already exists,Please try with another email",
    REGISTER_SUCCESS: "User registered successfully",
 
    //    Login error messages
    LOGIN_REQUIRED_FIELDS: "Please fill in all the fields for login",
    UNREGISTERED_EMAIL: "Can't log in without registration",
    MAX_LOGIN_ATTEMPTS_EXCEEDED:
      "Maximum login attempts exceeded, please try again later",
    INCORRECT_PASSWORD: "Incorrect password",
    INVALID_OTP:"Please enter correct OTP",
    LOGIN_SUCCESS: "User logged in successfully",
    LOGOUT_SUCCESS: "User logged out successfully",
  
  // User_info error messages
  USER_REQUIRED_FIELDS:"Please provide all the feilds",
  INVALID_EMAIL_FORMAT:"*Invalid email Id*",
  INVALID_MOBILE_FORMAT:"*Invalid Mobile*",
  INVALID_PASSWORD_FORMAT:"*Invalid password*",
  USER_CREATED:"User Information created successfully",
  USER_UPDATED:"User Information updated successfully",
  USER_INVALID:"User not found",
  USER_ALREADY_DELETED:"User data has already been deleted.",
  USER_DELETED:"User Data deleted successfully",
  
  // Store_info error messages
  STORE_REQUIRED_FIELDS:"Please provide all the required fields",
  STORE_CREATED:"Store information created succesfully",
  INVALID_CONTACT_FORMAT:"Invalid contact",
  GET_STORE_DATA:"Get API created succesfully",
  GETBYID_STORE_DATA:"This is store Data",
  STORE_UPDATED:"Store information updated succesfully",
  STORE_ALREADY_DELETED:"Store information has already been deleted.",
  STORE_NOT_FOUND:"Store not found.",
  DELETE_STORE:"Store Data deleted successfully",
  
  
  // product_info error messages
  PRODUCT_CREATED:"Product Information created successfully",
  IMAGE_SIZE_EXCEEDS_LIMIT:"Image size exceeds the maximum limit",
  GET_PRODUCT_DATA:"Get API created Successfully",
  GETBYID_PRODUCT_DATA:"This is product Data",
  PRODUCT_UPDATED:"Product information updated succesfully",
  PRODUCT_ALREADY_DELETED:"Product information has already been deleted.",
  PRODUCT_NOT_FOUND:"Product not found.",
  PRODUCT_DELETED:"Product Data$associated image is deleted successfully",
  };