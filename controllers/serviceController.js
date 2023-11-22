const { dbUrl, mongoose } = require('../config/dbConfig');
const { serviceModel } = require('../models/serviceSchema');
mongoose.connect(dbUrl);

const getService = async (req, res) => {
  try {
    const data = await serviceModel.find();
    const standardizedData = data.map((item) => {
      return {
        _id: item._id,
        name: item.name,
        description: item.description,
        price: item.price,
        serviceItems: Array.isArray(item.serviceItems) ? item.serviceItems.map((serviceItem) =>
          typeof serviceItem === 'object' ? serviceItem.name : serviceItem
        ) : [],
      };
    });
    res.status(200).send({
      message: "Here's the available service list",
      data: standardizedData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('External server error', error);
  }
}

const coveredServices = async (req, res) => {
    const name = req.params.name;
    try {
      const data = await serviceModel.findOne({ name });
      console.log(data);
      const standardizedData = {
        _id: data._id,
        name: data.name,
        description: data.description,
        price: data.price,
        serviceItems: Array.isArray(data.serviceItems)
        ? data.serviceItems.map((serviceItem) => {
            if (typeof serviceItem === 'object' && serviceItem.name) {
              return { name: serviceItem.name, price: serviceItem.price };
            } else if (typeof serviceItem === 'string') {
              return { name: serviceItem, price: '' };
            }
            // Handle other cases if necessary
            return null;
          })
        : [],      
      };
      res.status(200).send({
        data: standardizedData,
      });
      console.log(standardizedData);

    } catch (error) {
      console.log(error);
      res.status(500).send('External server error', error);
    }
  }
  
  

module.exports = { getService, coveredServices };
