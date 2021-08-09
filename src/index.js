import Homepage from './pages/Homepage.js';
import ProductsPage from './pages/ProductsPage.js';
import ProductDetail from './pages/ProductDetail.js';
import { parseRequestUrl , $ } from './utils.js';
import Error404Page from './pages/Error404Page.js';
import Header from './components/Header.js';
import CategoryPage from './pages/CategoryPage.js';
import ProductAddPage from './pages/ProductAddPage.js';
import AdminProductPage from './pages/AdminProductPage';
import ProductEditPage from './pages/ProductEditPage.js';
import CateAddPage from './pages/CateAddPage.js';
import AdminCatePage from './pages/AdminCatePage';
import CateEditPage from './pages/CateEditPage';
const routes = {
    '/': Homepage,
    '/products': ProductsPage,
    '/products/:id' : ProductDetail,
    '/category/:id' : CategoryPage,
    '/addproduct' : ProductAddPage,
    '/listproduct' : AdminProductPage,
    '/editproduct/:id': ProductEditPage,
    '/listcate' : AdminCatePage,
    '/addcate': CateAddPage,
    '/editcate/:id': CateEditPage,
}

const router = async () => {
    const {resource , id } = parseRequestUrl();
    const parseUrl = (resource ? `/${resource}` : '/') +
                     (id ? `/:id` : '')
    const page = routes[parseUrl] ? routes[parseUrl] : Error404Page;
    $('#header').innerHTML = await Header.render();
    $('#main-content').innerHTML = await page.render();
    await page.afterRender();
}
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);