import CategoryAPI from "../api/categoryAPI";
import { reRender , $} from '../utils.js';
const ListProduct = {
    async render(){
        const { data:cate } = await CategoryAPI.getAll();
        return /*html*/`
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th width="200">action</th>
                        <th>
                            <a href="/#/addcate" class="btn btn-primary">Thêm</a>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    ${cate.map( (cate,index) =>{
                        return `
                            <tr>
                                <td>${index}</td>
                                <td>${cate.name}</td>
                                <td>
                                    <a href="/#/editcate/${cate.id}" class="btn btn-primary">Update</a>
                                    <button id="xoa" class="btn btn-danger btn-remove" data-id="${cate.id}">Remove</button>
                                </td>           
                            </tr>
                        `
                        }).join("")}
                
                </tbody>
            </table>  
        `
    },
    async afterRender(){
        const btns = $('#list-cate #xoa');
        console.log(btns);
        btns.forEach( btn => {
            const id = btn.dataset.id;
            btn.addEventListener('click', function(){
                const question = confirm('ban co chac chan muon xoa khong? ');
                if(question){
                    CategoryAPI.remove(id);
                    reRender(ListCate, '#list-cate');
                }  
            })
        })
    }
}
export default ListProduct