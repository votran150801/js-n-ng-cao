import ProductAPI from '../api/productAPI';
import { parseRequestUrl,$ } from '../utils';
import firebase from '../firebase';
import CategoryAPI from '../api/CategoryAPI.js';
const ProductEditPage = {
       async render() {
        const {data: cate } = await CategoryAPI.getAll();
        const { id } = parseRequestUrl();
        const { data:product } = await ProductAPI.get(id);
        console.log(product);
        return /*html*/ `
        <form id="form-update-product" method="post" enctype="multipart/form-data">
        <div class="mb-3">
            <input type="text" class="form-control" id="product-name" value="${product.name}" placeholder="Tên sản phẩm">
            
        </div>
        <div class="mb-3">
            <input type="text" class="form-control" id="price" value="${product.price}" placeholder="Gía">
            
        </div>
        <div class="mb-3">
        <label for="price" class="form-label" >Ảnh</label>
        <input type="file" class="form-control" id="product-image"  placeholder="Ảnh sản phẩm">
        <input type="hidden" name="" id="uppdate-hidden-url"  value="${product.image}">
        <img src="${product.image} "height="100px" alt="" >
      
    </div>
        <div class="mb-3">
        <input type="text" class="form-control" id="detail" value="${product.detail}" placeholder="Chi tiết sản phẩm">
        
            </div>
            <div class="mb-3">
            <input type="text" class="form-control" id="noidung" value="${product.noidung}" placeholder="nội dung sản phẩm">
            
                </div>

            <div class="mb-3">
            <select name="cars"  id="categoryId">
                   ${cate.map(cate => {
                       return `
                         <option value="${cate.id}">${cate.name}</option>
                       `
                   }).join("")}
       
       
       </select>
               
                   </div>
     
        <input type="submit" class="btn btn-primary" Value="Thêm">
        </form>
        `
    },
    async afterRender() {
        const { id } = parseRequestUrl();
        const { data: product } = await ProductAPI.get(id);

        $('#form-update-product').addEventListener('submit', (e) => {

            e.preventDefault();
            if ($("#product-image").value == "") {

                const newProduct = {
                    ...product,
                    name: $('#product-name').value,
                    price: $('#price').value,
                    detail: $("#detail").value,
                    noidung: $("#noidung").value,
                    categoryId: $("#categoryId").value,
                    image: $("#uppdate-hidden-url").value,
                }
                ProductAPI.update(id, newProduct);
                window.location.hash = '/listproduct'

            }
            else {
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
}
export default ProductEditPage;