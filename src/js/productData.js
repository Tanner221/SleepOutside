const baseURL = 'http://server-nodejs.cit.byui.edu:3000/'

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category, id) {
    this.id = id;
    this.category = category;
  }

  async getData(category) {
    return fetch(baseURL + `products/search/${category}`)
      .then(convertToJson).then((data) => data.Result);
  }

  async getProduct() {
    const result = await this.getData(this.category);
    return result.find((item) => item.Id === this.id);
  }
}
