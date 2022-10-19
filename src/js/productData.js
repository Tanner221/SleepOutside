function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category, id) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
    this.id = id;
  }

  async getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }

  async getProduct() {
    const result = await this.getData();
    return result.find((item) => item.Id === this.id);
  }
}
