const SidebarMenu = {
    render(){
        return `
            <div class="position-sticky pt-3">
                <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/#/listcate">
                    <span data-feather="home"></span>
                    Cate
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/#/listproduct">
                    <span data-feather="file"></span>
                    Products
                    </a>
                </li>
                </ul>
            </div>
        `
    }
}
export default SidebarMenu;