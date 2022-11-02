const baseURL = 'http://server-nodejs.cit.byui.edu:3000/'

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ExternalServices {
  constructor(category, id) {
    this.id = id;
    this.category = category;
  }

  async getData() {
    return fetch(baseURL + `products/search/${this.category}`)
      .then(convertToJson).then((data) => data.Result);
  }

  async getProduct() {
    return await fetch(baseURL + `product/${this.id}`)
      .then(convertToJson).then((data) => data.Result);
  }

  async checkout(cartItems){
    console.log(cartItems);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    };
    return await fetch(baseURL + 'checkout/', options).then(convertToJson);
  }
}
