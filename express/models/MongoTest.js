const Product = require('./productSchema');
const mongoose = require("../dao/dataSource");
 
const SaveData = ()=>{

    const product =  new Product({
         title : 'The complete reference Java',
         price : 56,
         description : 'Customers will not get dissappointed',
         imgUrl: 'https://m.media-amazon.com/images/I/51QkOLwKuZL._SL350_.jpg'
     });

     console.log('in save data') ;
     //product.markModified('Product');
     product.save().then(created =>{
         
            console.log('producted created through mongoose...',created);
        
     }).catch(err =>{
             
                console.error('error while cretating product...',err);
            
     });

};

mongoose.dataSource().then(result=>{
    console.log('connected mangao...cd ');
    
    SaveData();

});
