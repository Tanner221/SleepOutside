export default class ProductList{
  constructor(category, elementId, dataSource) {
    this.category = category;
    this.listElement = document.querySelector(elementId);
    this.dataSource = dataSource;
  }

  async init(){
    const productList = await this.dataSource.getData();
    this.renderList(productList)
  }

  renderList(productList){
    const template = document.getElementById('product-card-template');
    productList.forEach(product => {
      const clone = template.content.cloneNode(true);
      //prep template
      this.prepareTemplate(clone, product)
      // insert the actual details of the current product into the template
      this.listElement.appendChild(clone);
    })
  }

  prepareTemplate(clone, product){
    console.log(product)
    console.log(clone)
    const image = clone.querySelector('img');
    image.src = product.Image;
    image.alt += product.NameWithoutBrand;
    clone.querySelector('h3').innerHTML = product.Brand.Name;
    clone.querySelector('h2').innerHTML = product.NameWithoutBrand;
    clone.querySelector('.product-card__price').innerHTML += product.FinalPrice;
    clone.querySelector('.product-card__discount').innerHTML += `${(product.SuggestedRetailPrice - product.FinalPrice).toFixed(2)} OFF`;
    clone.querySelector('a').href += `${product.Id}&category=tents`
  }
}