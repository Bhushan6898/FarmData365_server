
import { FarmingDataModel } from "../../schemas/Userchema/index.js";

export const uploadfarmdata = async (req, res) => {
    const { id } = req.user;
    try {

        const { farm, farmName, farmSize, farmLocation, seedToSow, seedVariety } = req.body;
        if (!farmName || !farmSize || !farmLocation || !seedToSow || !seedVariety) {
            return res.status(400).json({ message: 'Please provide all the required fields.' });
        }
        const farmImage = req.file ? req.file.path.replace(/\\+/g, '/') : null;
        console.log('====================================');
        console.log(farmImage);
        console.log('====================================');
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