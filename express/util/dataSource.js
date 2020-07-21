const Sequelize = require('sequelize');
const sequelize = new Sequelize('commerce','silver_commerce','silver_commerce',{
    dialect:'mysql',
    host :'localhost'
});

//console.log('sequelize....' , sequelize);
module.exports = sequelize;