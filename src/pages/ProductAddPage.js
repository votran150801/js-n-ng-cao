import ProductAPI from "../api/productAPI.js";
import { $ } from "../utils.js";
import firebase from '../firebase'
import CategoryAPI from '../api/CategoryAPI.js';

const ProductAddPage = {
  async  render() {
    const {data: cate } = await CategoryAPI.getAll();
    return /*html*/ `
    <form id="form-add" method="post" enctype="multipart/form-data">
    <div class="row">
        <div class="col">
            <input type="text" class="form-control" name="name" id="product-name" placeholder="Tên sản phẩm" aria-label="First name">
        </div>
        <div class="col">
            <input type="number" class="form-control" name="price" id="price" placeholder="Giá" aria-label="First name">
        </div>
    </div>
    <br>

    <div class="form-floating">
        <textarea class="form-control" name="description" id="description" placeholder="Description" id="floatingTextarea2" style="height: 100px"></textarea>
    </div>
    <select name="cars"  id="categoryId">
    ${cate.map(cate => {
        return `
          <option value="${cate.id}">${cate.name}</option>
        `
    }).join("")}


</select>
    <div>
        <label for="">ảnh</label>
        <input type="file" id="image" name="image">
    </div>
    <div>
    <input type="submit" class="btn btn-primary"  value="Add Product" />
    </div>

    </div>
</form>
        `;
  },
  afterRender() {
    $("#form-add").addEventListener("submit", (e) => {
      e.preventDefault();
      if($("#product_name").value == ""){
        $("#product_name").innerText = "(Vui long nhap ten)";
        $("#product_name").focus();
        $("#product_name").style.borderColor = "red";
        $("#product_name").style.boxShadow = "none";
      }
      const productImage = $('#image').files[0];
      let storageRef = firebase.storage().ref(`images/${productImage.name}`);
      storageRef.put(productImage).then(function () {
        console.log('upload thanh cong')
        storageRef.getDownloadURL().then((url) => {
            const product = {
                  id: Math.random().toString(36).substr(2, 9),
                  name: $("#product-name").value,
                  price: $("#price").value,
                  description: $("#description").value,
                  categoryId: $("#categoryId").value,
                  image: url,
            }
              ProductAPI.add(product)
              window.location.hash = '/listproduct'
        })

      })     
    })
  }
}
export default ProductAddPage;
