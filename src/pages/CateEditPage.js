import CategoryAPI from '../api/categoryAPI';
import { parseRequestUrl,$ } from '../utils';
const CateEditPage = {
    async render(){
        const { id } = parseRequestUrl();
        const { data:cate } = await CategoryAPI.get(id);
        console.log(cate);
        return /*html*/`
            <form id="form-update-cate" method="post" enctype="multipart/form-data">
        <div class="row">
            <div class="col">
                <input type="text" class="form-control" name="name" id="name" value="${cate.name}" placeholder="Tên sản phẩm" aria-label="First name">
            </div>
        </div>
        <br>
        <div>
        <button type="submit" class="btn btn-primary">Update</button>
        </div>
    
        </div>
    </form>
        `
    },
    async afterRender(){
        const { id } = parseRequestUrl();
        const { data:cate } = await CategoryAPI.get(id);

        $('#form-update-cate').addEventListener('submit', e => {
            e.preventDefault();
            console.log('old',cate);
            const newCate = {
                ...cate,
                name: $("#name").value,
                total: $("#total").value,
            };
            CategoryAPI.update(id,newCate);
            window.location.hash = '/listcate';
        })
    }
};
export default CateEditPage;