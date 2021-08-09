export const parseRequestUrl = () => {
    const url = window.location.hash.toLowerCase(); // /#/products/1
    const request = url.split('/'); // tách url lấy được thành các phần tử ["#" , "products" , "1"]
    return {
        resource: request[1],
        id: request[2]
    }
}
export const $ = selector => {
    let elements = document.querySelectorAll(selector);
    return elements.length == 1 ? elements[0] : [...elements];
}
export const reRender = async (component,position = "") =>{
    if(position){
        $(position).innerHTML = await component.render();
    }else{
        $("#main-content").innerHTML = await component.render();
    }
    await component.afterRender();
}
