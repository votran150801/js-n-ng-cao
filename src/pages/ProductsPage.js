import data from '../data.js';
import ProductAPI from '../api/productAPI';
//import axios from 'axios';

const ProductsPage = {
     async render(){
         try{
             const { data : products } = await ProductAPI.getAll();
            // const response = await axios('https://5e79b4b817314d00161333da.mockapi.io/products');
            // const products = await response.data;
            const result = products.map(product => {
                return `
                    <div class="col-4">
                        <div class="card" style="width: 18rem;">
                            <img src="${product.image}" class="card-img-top" alt="${product.name}">
                            <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.price}</p>
                            <a href="/#/products/${product.id}" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                    `
                }).join("")
                return `
                    <h1>Products Page</h1>
                    <div class="row">
                        ${result}
                    </div>
                `
         } catch(error){
             console.log(error);
         }
    }
}
export default ProductsPage