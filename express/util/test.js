const fu = require('./fileUtil');

fu.findProductById(685960512,(prod)=>{
    console.log(prod);
});


item = [{
    id : 11123,
    item : 'abc',
    price : 1
},{
    id : 11124,
    item : 'abc',
    price : 2
},
{
    id : 11125,
    item : 'abc',
    price : 3
}]

//item.splice(1,1);

//console.log(item);

item.find((itm,i)=>{
    if(itm.id === 11125) {
       
        delete item[i];
    }
});

console.log(item.indexOf(11125));


 