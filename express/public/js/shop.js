const addItem = (productId) => {
  var messageid = "#" + productId;
  console.log(productId);
  console.log(messageid);
  fetch("/shop/addToCart", {
    method: "POST",
    body: JSON.stringify({
      productId: productId,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (response.status === 200) {
        response
          .json()
          .then((res) => {
            $(".header__cart li a .shopping-bag").text(res.qty);
            console.log(res.total);
            $(".header__cart__price span").text(`$${res.total}.00`);
          })
          .catch((exp) => {
            console.error("exception...", exp);
          });
        //$
      } else {
        console.log("response.", response.json());
      }
    })
    .catch((exception) => {
      console.error("exception in addToCart", exception);
    });
};

const deleteItem = (itemId) => {
  console.log(itemId);
  let fetchUrl = "/shop/delete/" + itemId;
  console.log(fetchUrl);
  fetch(fetchUrl)
    .then((response) => {
      console.log(fetchUrl);
    })
    .catch((exception) => {
      console.log("exception occurred ");
    });
};

const calculateShipping = (shippingMethod) => {
  var method = $("input[name='method']:checked").val();

  let fetchUrl = `/shop/calculateShipping/${method}`;

  console.log(fetchUrl);
  fetch(fetchUrl)
    .then((response) => {
      response.json().then(order =>{

        var text = `Subtotal ${order.itemTotal}.00Shipping ${order.shipping}.00tax ${order.tax}.00Total ${order.total}.00`;

        $($('.shoping__checkout li span')[0]).text(`${order.itemTotal}.00`);
        $($('.shoping__checkout li span')[1]).text(`${order.shipping}.00`);
        $($('.shoping__checkout li span')[2]).text(`${order.tax}.00`);
        $($('.shoping__checkout li span')[3]).text(`${order.total}.00`);
        

      }).catch(err=>{
        console.error('calcualte error in shipping =>',err);
      })
      console.log(fetchUrl);
    })
    .catch((exception) => {
      console.log("exception occurred ");
    });
};





$(document).ready(function () {
  let fetchUrl = "/onPageLoad";
  fetch(fetchUrl).then((response) => {
    if (response.status === 200) {
      response
        .json()
        .then((res) => {
          $(".header__cart li a .shopping-bag").text(res.qty);
          console.log(res.total);
          $(".header__cart__price span").text(`$${res.total}.00`);
        })
        .catch((exp) => {
          console.error("exception...", exp);
        });
      //$
    } else {
      console.log("response.", response.json());
    }
  });
});
