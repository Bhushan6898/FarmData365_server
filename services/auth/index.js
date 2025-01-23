

import dotenv from 'dotenv';
import { FarmingUserModel } from '../../schemas/Userchema/index.js';
import { createToken } from '../../middleware/jwt/index.js';
dotenv.config();


export const server = (req, res) => {

  res.status(200).send('Server is alive and working!');
console.log("connect");

};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await FarmingUserModel.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Compare plain-text passwords
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid  password" });
    }

    const accessToken = createToken(user);
   
    const cookieOptions = {
      maxAge: 24 * 60 * 60 * 1000,  
      httpOnly: true,  
      sameSite: 'None', 
      secure: process.env.NODE_ENV === 'production', 
    };
    res.cookie('token', accessToken, cookieOptions);
    res.cookie('role', user.role, cookieOptions);
    return res.status(200).json({
      message: "Login successful",
      user: user
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const register = async (req, res) => {

  const {name,email,password, mobileNumber,country,state,city,farmName}=req.body;
try{
  const existfarmer= await FarmingUserModel.findOne({
    $or: [{ email: email }, { mobileNumber: mobileNumber }]
  })
  if (existfarmer) {
    if (existfarmer.email === email) {
      return res.status(401).json({ message: "Email already exists" });
    } else if (existfarmer.mobileNumber === mobileNumber) {
      return res.status(401).json({ message: "Mobile number already exists" });
    }
  }
  const farmer= await new FarmingUserModel({
    name,
    email,
    password,
     mobileNumber,
     country,
     state,
     city,
     farmName
  })
await farmer.save();

return res.status(200).json({ message: "farmer registered successfully" });
} catch (error) {
  console.error(error);
  return res.status(500).json({ message: "Internal server error" });
}
  
  };

  export const getuserdata = async (req, res) => {
    try {
      const { id} = req.user; 
     
  
     
      const user = await FarmingUserModel.findOne({ _id: id });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      
      res.status(200).json({
        message: "User data retrieved successfully",
         user,
      });
    } catch (error) {
      console.error("Error retrieving user data:", error); // Log the error
      res.status(500).json({ message: "Server error, please try again later" });
    }
  };
  