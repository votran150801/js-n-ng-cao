import CategoryAPI from "../api/CategoryAPI.js";
import { $ } from "../utils.js";

const CateAddPage = {
  render() {
    return /*html*/ `
    <form id="form-add" method="post" enctype="multipart/form-data">
    <div class="row">
        <div class="col">
            <input type="text" class="form-control" name="name" id="name" placeholder="Tên sản phẩm" aria-label="First name">
        </div>
        <div class="col">
        <input type="number" class="form-control" name="total" id="total" placeholder="Tên sản phẩm" aria-label="First name">
    </div>
    </div>
    <br>

    <br>
    <div>
    <input type="submit" class="btn btn-primary"  value="Add Cate" />
    </div>

    </div>
</form>
        `;
  },
  afterRender() {
    $("#form-add").addEventListener("submit", (e) => {
      e.preventDefault();
      const cate = {
        id: Math.random().toString(36).substr(2, 9),
        name: $("#name").value,
        total: $("#total").value,
      };
      //console.log(cate);
      CategoryAPI.add(cate);
      window.location.hash = '/listcate'
    });
  },
  
};
export default CateAddPage;
