const mongoose = require("mongoose");
let mongoServiceUrl =
  

exports.dataSource = ()=>{

  return mongoose.connect(mongoServiceUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

}
 
