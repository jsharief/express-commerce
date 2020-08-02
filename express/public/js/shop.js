const addItem = (productId) => {
   var messageid = '#'+productId;
  console.log(productId);
  console.log(messageid);
  fetch("/shop/addToCart", {
    method: "POST",
    body: JSON.stringify({
      productId: productId,
    }),
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
     if(response.status === 200) {
       
        $(messageid).text('Item Added successufully ..');
        console.log('Hello,,,,,,,');
     
     }else {
        $(messageid).text(' Problem adding item ..');
        
     }
  }).catch(exception =>{
      console.error('exception in addToCart',exception);
  })
};

const deleteItem = (itemId) => {
   console.log(itemId);
   let fetchUrl = '/shop/delete/'+itemId;
   console.log(fetchUrl);
   fetch(fetchUrl).then(response =>{
     console.log(fetchUrl);
   }).catch(exception =>{
     console.log('exception occurred ');
   })
}

const calculateShipping = (shippingMethod) => {
 
  var method = $("input[name='method']:checked").val();

  
  let fetchUrl = `/shop/calculateShipping/${method}`;

  console.log(fetchUrl);
  fetch(fetchUrl).then(response =>{
    console.log(fetchUrl);
  }).catch(exception =>{
    console.log('exception occurred ');
  })

};