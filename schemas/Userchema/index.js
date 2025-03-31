import mongoose from "mongoose";


const Schema = mongoose.Schema;

const farmingUserSchema = new Schema({
  name: { 
    type: String, 
    required: [true, 'First name is required'], 
    trim: true 
  },
 
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    trim: true 
  },
  mobileNumber: { 
    type: String, 
    required: [true, 'Mobile number is required'], 
   
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'], 
  },
  country: { type: String, trim: true },
  state: { type: String, trim: true },
  city: { type: String, trim: true },
  farmName: { 
    type: String, 
    trim: true 
  },
 
  role: { 
    type: String, 
    enum: ["Farmer", "Buyer", "Admin"], 
    default: "Farmer" 
  },
  profileImage: { type: String }, 
  status: { 
    type: String, 
    enum: ["Active", "Inactive"], 
    default: "Inactive" 
  },
  permissions: { 
    type: String, 
    enum: ["Granted", "NotGranted"], 
    default: "NotGranted" 
  }
}, { timestamps: true }); 
export const FarmingUserModel = mongoose.model("FarmingUser", farmingUserSchema, "FarmingUser");

const farmingdataSchema= new Schema({
  farm:{
    type:String,
    trim:true,
    required: true
  },
  farmName:{
    type:String,
    trim:true,
    required: true
  },
  farmSize:{
    type:String,
    required: true
  },
  farmLocation:{
    type:String,
    required: true
  },
  seedToSow:{
    type:String,
    required: true
  },
  seedVariety:{
    type:String,
    required: true
  },
  farmImage:{
    type:String,
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FarmingUser',
    required: true, 
  },

},{ timestamps: true });
export const FarmingDataModel=mongoose.model("FarmingData",farmingdataSchema,"FarmingData");