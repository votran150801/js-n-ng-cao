import ProductAPI from '../api/productAPI';
import { parseRequestUrl,$ } from '../utils';
import firebase from '../firebase';
import CategoryAPI from '../api/CategoryAPI.js';
const ProductEditPage = {
    async render(){
        const {data: cate } = await CategoryAPI.getAll();
        const { id } = parseRequestUrl();
        const { data:product } = await ProductAPI.get(id);
        console.log(product);
        return /*html*/`
            <form id="form-update-product" method="post" enctype="multipart/form-data">
        <div class="row">
            <div class="col">
                <input type="text" class="form-control" name="name" id="product-name" value="${product.name}" placeholder="Tên sản phẩm" aria-label="First name">
            </div>
            <div class="col">
                <input type="number" class="form-control" name="price" id="price" value="${product.price}" placeholder="Giá" aria-label="First name">
            </div>
        </div>
        <br>
        <select name="cars"  id="categoryId">
        ${cate.map(cate => {
            return `
              <option value="${cate.id}">${cate.name}</option>
            `
        }).join("")}


</select>
        <div class="form-floating">
            <textarea class="form-control" name="description" id="description" placeholder="Description" id="floatingTextarea2" style="height: 100px"> ${product.description}</textarea>
        </div>
        <div class="mb-3">
            <label for="price" class="form-label" >Ảnh</label>
            <input type="file" class="form-control" id="product-image"  placeholder="Ảnh sản phẩm">
            <input type="hidden" name="" id="uppdate-hidden-url"  value="${product.image}">
            <img src="${product.image} "height="100px" alt="" >
      
        </div>
        <div>
        <button type="submit" class="btn btn-primary">Update</button>
        </div>
    
        </div>
    </form>
        `
    },
    async afterRender(){
        const { id } = parseRequestUrl();
        const { data:product } = await ProductAPI.get(id);

        $('#form-update-product').addEventListener('submit', e => {
            e.preventDefault();
            // console.log('old',product);
            if ($("#product-image").value == "") {
                const newProduct = {
                    ...product,
                    name: $("#product-name").value,
                    price: $("#price").value,
                    description: $("#description").value,
                    image: $("#product-image").value,
                    categoryId: $("#categoryId").value,
                };
                ProductAPI.update(id,newProduct);
                window.location.hash = '/listproduct';

            }else{
                const productImage = $("#product-image").files[0];
                let storageRef = firebase.storage().ref(`images / ${productImage.name}`);
                storageRef.put(productImage).then(function () {
                    storageRef.getDownloadURL().then((url) => {
                        const newProduct = {
                            ...product,
                            name: $('#product-name').value,
                            price: $('#price').value,
                            detail: $("#detail").value,
                            noidung: $("#noidung").value,
                            categoryId: $("#categoryId").value,
                            image: url,
                        }
                        ProductAPI.update(id, newProduct);
                        window.location.hash = '/listproduct'
                    });
                });
            } 
        })
    }
};
export default ProductEditPage;