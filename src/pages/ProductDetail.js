// import axios from 'axios';
// import data from '../data.js';
import ProductAPI from '../api/productAPI';
import { parseRequestUrl } from '../utils.js';

const ProductDetail = {
    async render (){
            const { id } = parseRequestUrl();
            const{ data:product } = await ProductAPI.get(id);
            return `
                <div class="row">
                    <div class="col-6">
                        <img src="${product.image}" />
                    </div>
                    <div class="col-6">
                        <h1>${product.name}</h1>
                        <span style=" font-size:36px; color:#34b79d;">$${product.price}</span>
                        <p>
                           ${product.description}
                        </p>
                        <div>
                            <button type="submit" class="btn btn-primary">Mua ngay</button>
                        </div>
                    </div>
                </div>
                
            `
    }
}
export default ProductDetail;