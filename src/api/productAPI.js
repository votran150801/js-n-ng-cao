//import axios from 'axios';
import { axiosClient } from './axiosClient';

const ProductAPI = {
    getAll(){
        const url = `/products`;
        return axiosClient.get(url);
    },
    get(id){
        const url = `/products/${id}`;
        return axiosClient.get(url);
    },
    add(products){
        const url = `/products`;
        return axiosClient.post(url , products);
    },
    remove(id){
        const url = `/products/${id}`;
        return axiosClient.delete(url);
    },
    update(id,data){
        const url = `/products/${id}`;
        return axiosClient.put(url,data);
    }
}
export default ProductAPI;