const axios = require("axios");
require('dotenv').config()
function getIndianPriceData(cripto, rates){
     const usdPrice = parseFloat(cripto.priceUsd);
     const inrPrice = usdPrice * rates.INR;
     const  criptoObject = {
     CriptoName : cripto.name,
     Symbol : cripto.symbol,
     VolumeUsd24Hr : cripto.volumeUsd24Hr,
     IndianPrice : inrPrice.toFixed(2) + " ₹"
  }
  return criptoObject
}
 
exports.getCriptoData = async (req, res) => {
  try {
    let option = await axios.get(process.env.CriptoURL, {
      params: {
        limit: 20,
      },
    });

    let result = option.data.data;
    return res
      .status(200)
      .send({ status: true, message: "success", data: result });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};


exports.getCriptoDataWithIndianPrice = async (req,res)=>{

    try{
        let option = await axios.get(process.env.CriptoURL, {
       params: {
        limit: 20,
       },
      });

      let criptoData = option.data.data
  
      const response = await axios.get(process.env.PriceURL, {
        params: {
          app_id: process.env.APPKEY,
          base: 'USD',
          symbols: 'INR'
        }
      });
      const { rates } = response.data;
     
    const finalOutput = await Promise.all(
        criptoData.map(async (cripto) => {
          const indianPriceData = await getIndianPriceData(cripto, rates);
          return indianPriceData ? indianPriceData : null;
        })
      );
     
      return res.status(200).send({status: true, message : "success", data : finalOutput})
    }catch(err){
        return res.status(500).send({status : false, message : err.message})
    }
}
