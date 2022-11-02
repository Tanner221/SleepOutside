const baseURL = 'http://server-nodejs.cit.byui.edu:3000/'

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw {name: 'servicesError', message: data};
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
