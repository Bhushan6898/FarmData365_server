import express from "express";
import { uploadfarmdata ,getfarmdata, getAllFarmers} from "../../services/user/index.js";
import { uploadfarmimage } from "../../middleware/multer/index.js"; 
import { cheack } from "../../middleware/jwt/index.js";


const userroutes = express.Router();



userroutes.post("/uploadfarmdata",cheack,uploadfarmimage.single('farm_image'),uploadfarmdata)
userroutes.get("/getfarmdata",cheack,getfarmdata)

userroutes.get("/farmers",getAllFarmers)
export default userroutes;
