import ProductAPI from "../api/productAPI";
import { reRender , $} from '../utils.js';
const ListProduct = {
    async render(){
        const { data:product } = await ProductAPI.getAll();
        return /*html*/`
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>image</th>
                        <th>description</th>
                        <th width="200">action</th>
                        <th>
                            <a href="/#/addproduct" class="btn btn-primary">Thêm</a>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    ${product.map( (product,index) =>{
                        return `
                            <tr>
                                <td>${index}</td>
                                <td>${product.name}</td>
                                <td>${product.price}</td>
                                <td> <img width="100" src="${product.image}"/></td>
                                <td>${product.description}</td>
                                <td>
                                    <a href="/#/editproduct/${product.id}" class="btn btn-primary">Update</a>
                                    <button id="xoa" class="btn btn-danger btn-remove" data-id="${product.id}">Remove</button>
                                </td>           
                            </tr>
                        `
                        }).join("")}
                
                </tbody>
            </table>  
        `
    },
    async afterRender(){
        const btns = $('#list-products #xoa');
        console.log(btns);
        btns.forEach( btn => {
            const id = btn.dataset.id;
            btn.addEventListener('click', function(){
                const question = confirm('ban co chac chan muon xoa khong? ');
                if(question){
                    ProductAPI.remove(id);
                    reRender(ListProduct, '#list-products');
                }  
            })
        })
    }
}
export default ListProduct