const { dbUrl, mongoose } = require('../config/dbConfig');
const { motorCycleModel } = require('../models/motorCycleSchema');
mongoose.connect(dbUrl);

const motorCycleList = async (req, res) => {
    try {
        const list = await motorCycleModel.find();
        res.status(200).send({
            message: "Successfull",
            data: list
        })
    } catch (error) {
        console.log(error);
        res.status(500).send('External server error', error);
    }
}

const motorCycleBrandModels = async (req, res) => {
    let brand = req.params.brand;
    try {
        const brandModels = await motorCycleModel.find({ brand });
        res.status(200).send({
            brandModels
        })
    } catch (error) {
        console.log(error);
        res.status(500).send('External server error', error);
    }
}
module.exports = { motorCycleList, motorCycleBrandModels };