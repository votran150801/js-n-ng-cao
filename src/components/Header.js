import CategoryAPI from "../api/categoryAPI"

const Header = {
     async render(){
        const { data:categories } = await CategoryAPI.getAll();
        // console.log(data);
        return /*html*/`
        <p class="h5 my-0 me-md-auto fw-normal">Company name</p>
        <nav class="my-2 my-md-0 me-md-3">
        <a style="text-decoration: none; "  class="p-2 text-dark" href="/">Homepages</a>
        ${
            categories.map(category =>{
                return `<a style="text-decoration: none;" class="p-2 text-dark" href="/#/category/${category.id}">${category.name}</a>
                `
            }).join("")
        }
        <a style="text-decoration: none;" class="p-2 text-dark" href="#">Support</a>
        <a style="text-decoration: none;" class="p-2 text-dark" href="#">Pricing</a>
        </nav>
        <a class="btn btn-outline-primary" href="/#/listproduct">admin</a>
        
        `
    }
}
export default Header;