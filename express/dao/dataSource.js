const mongoose = require("mongoose");
let mongoServiceUrl =
  "mongodb+srv://sharief:Login123$@cluster0.mzumy.mongodb.net/Test?retryWrites=true&w=majority&useUnifiedTopology=true";

exports.dataSource = ()=>{

  return mongoose.connect(mongoServiceUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

}
 
