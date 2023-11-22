const {dbUrl, mongoose} = require('../config/dbConfig');
const {serviceRequestModel} = require('../models/serviceRequestSchema');
mongoose.connect(dbUrl);

const createService = async(req, res)=>{
    
}

const updateService = async(req, res)=>{

}

module.exports = {createService, updateService};
