import ProductAPI from "../api/productAPI";
import { parseRequestUrl } from "../utils";

const CategoryPage = {
  async render() {
    const { id } = parseRequestUrl();
    console.log(id);
    const { data: products } = await ProductAPI.getAll();
    const result = products
      .filter((product) => product.categoryId == id)
      .map((product) => {
        return `
          <!-- Product Grid -->
          <div style="margin-top:20px; margin-left:0px ;" class="col-3">
            <div class="card" style="width: 18rem; ">
                <a  href="/#/products/${product.id}" style="text-decoration: none; color:black;" >
                  <img src="${product.image}" class="card-img-top" alt="${product.name}">
                </a>
                <div class="card-body">
                  <a  href="/#/products/${product.id}" style="text-decoration: none; color:black;" >
                    <h5 class="card-title">${product.name}</h5>
                  </a>
                  <p class="card-text" style="color:red;">$${product.price}</p>
                  <a  href="/#/products/${product.id}" class="btn btn-primary">xem thêm</a>
                </div>
            </div>
          </div>
                                    `;
      })
      .join("");
    return `
                    
                    <div class="container">
                    <div class="row">
                        ${result}
                    </div> </div>
                `;
  },
};
export default CategoryPage;
