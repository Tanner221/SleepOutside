function compareName(order) {
  if (order === 'Asc') {
    return (a,b) => (a.Brand.Name > b.Brand.Name) ? 1 : ((b.Brand.Name > a.Brand.Name) ? -1 : 0);
  } else {
    return (a,b) => (a.Brand.Name < b.Brand.Name) ? 1 : ((b.Brand.Name < a.Brand.Name) ? -1 : 0)
  } 
}

function comparePrice(order) {
  if (order === 'Asc') {
    return (a,b) => (a.FinalPrice > b.FinalPrice) ? 1 : ((b.FinalPrice > a.FinalPrice) ? -1 : 0);
  } else {
    return (a,b) => (a.FinalPrice < b.FinalPrice) ? 1 : ((b.FinalPrice < a.FinalPrice) ? -1 : 0)
  } 
}

export default class ProductList {
  constructor(category, elementId, dataSource) {
    this.category = category;
    this.listElement = document.querySelector(elementId);
    this.dataSource = dataSource;
    this.products = [];
    this.order = 'Asc';
  }

  async init() {
    const productList = await this.dataSource.getData(this.category);
    this.products = productList;
    document.getElementById('page-title').innerHTML = `Top Products: ${this.category.charAt(0).toUpperCase() + this.category.slice(1)}`;
    this.renderList(productList);
  }

  filterByName() {
    const newProductList = [...this.products];
    newProductList.sort(compareName(this.order));
    this.flipOrder();
    this.renderList(newProductList);
  }

  filterByPrice() {
    const newProductList = [...this.products];
    newProductList.sort(comparePrice(this.order));
    this.flipOrder();
    this.renderList(newProductList);
  }

  flipOrder() {
    if (this.order === 'Asc') {
      this.order = 'Desc'
    } else {
      this.order = 'Asc'
    }
  }

  renderList(productList) {
    const template = document.getElementById('product-card-template');
    this.listElement.innerHTML = '';
    productList.forEach((product) => {
      const clone = template.content.cloneNode(true);
      //prep template
      this.prepareTemplate(clone, product);
      // insert the actual details of the current product into the template
      this.listElement.appendChild(clone);
    });
  }

  prepareTemplate(clone, product) {
    const image = clone.querySelector('img');
    image.src = product.Images.PrimaryMedium;
    image.alt += product.NameWithoutBrand;
    clone.querySelector('h3').innerHTML = product.Brand.Name;
    clone.querySelector('h2').innerHTML = product.NameWithoutBrand;
    clone.querySelector('.product-card__price').innerHTML += product.FinalPrice;
    clone.querySelector('.product-card__discount').innerHTML += `${(
      product.SuggestedRetailPrice - product.FinalPrice
    ).toFixed(2)} OFF`;
    clone.querySelector('a').href += `${product.Id}&category=tents`;
  }
}
