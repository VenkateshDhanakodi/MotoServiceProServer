const { dbUrl, mongoose } = require('../config/dbConfig');
const { userModel } = require('../models/userSchema');
mongoose.set('strictQuery', false)
mongoose.connect(dbUrl);

const getUsers = async (req, res) => {
    try {
        const data = await userModel.find();
        res.status(200).send({
            message: "Entered Users via mongoose",
            data: data
        })
    } catch (error) {
        console.log(error);
        res.status(500).send('External server error', error);
    }
}
module.exports = { getUsers };