
import { FarmingDataModel, FarmingUserModel } from "../../schemas/Userchema/index.js";

export const uploadfarmdata = async (req, res) => {
    const { id } = req.user;
    try {

        const { farm, farmName, farmSize, farmLocation, seedToSow, seedVariety } = req.body;
        if (!farmName || !farmSize || !farmLocation || !seedToSow || !seedVariety) {
            return res.status(400).json({ message: 'Please provide all the required fields.' });
        }
        const farmImage = req.file ? req.file.path.replace(/\\+/g, '/') : null;

        const newFarmData = new FarmingDataModel({
            farm,
            farmName,
            farmSize,
            farmLocation,
            seedToSow,
            seedVariety,
            farmImage,
            userId: id
        });
        const savedFarmData = await newFarmData.save();

        res.status(200).json({
            message: 'Farm data uploaded successfully!',
            farmData: savedFarmData,
        });
    } catch (error) {
        console.error('Error saving farm data:', error);
        res.status(500).json({
            message: 'An error occurred while uploading the farm data.',
        });
    }
};

export const getfarmdata = async (req, res) => {
    const { id } = req.user;
    try {


        const user = await FarmingDataModel.find({ userId: id })
        if (user.length === 0) {
            res.status(404).json({
                messege: "No farm data found for this user."
            })
        }

        res.status(200).json({
            messege: "farm data retrive succesfully",
            farmdata: user
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'An error occurred while fetching the farm data.',
        })
    }

}

export const getAllFarmers = async (re, res) => {

    try {
        const farmers = await FarmingUserModel.find();
        if (!farmers) {
            res.status(400).json({ messege: "farmers not found" })
        }
        res.status(200).json({
            farmers: farmers,

        })
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}