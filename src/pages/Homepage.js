import ProductAPI from "../api/productAPI";
const Homepage = {
  async render() {
    try {
      const { data: products } = await ProductAPI.getAll();
      // const response = await axios('https://5e79b4b817314d00161333da.mockapi.io/products');
      // const products = await response.data;
      const result = products
        .map((product) => {
          return `
          <!-- Product Grid -->
          <div style="margin-top:20px; margin-left:0px ;" class="col-3">
            <div class="card" style="width: 18rem; ">
                <a  href="/#/products/${product.id}" style="text-decoration: none; color:black;" >
                  <img src="${product.image}" class="card-img-top" alt="${product.name}">
                </a>
                <div class="card-body">
                  <a  href="/#/products/${product.id}" style="text-decoration: none; color:black;" >
                    <h5 class="card-title">${product.name}</h5>
                  </a>
                  <p class="card-text" style="color:red;">$${product.price}</p>
                  <a  href="/#/products/${product.id}" class="btn btn-primary">xem thêm</a>
                </div>
            </div>
          </div>
                   
                   `;
        })
        .join("");
      return `
               <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img src="../images/banner/banner1.jpg" class="d-block w-100" height="508px" alt="...">
                </div>
                <div class="carousel-item">
                <img src="../images/banner/banner2.jpg" class="d-block w-100 " height="508px" alt="...">
                </div>
                <div class="carousel-item">
                <img src="../images/banner/banner3.jpg" class="d-block w-100" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"  data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"  data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
            </div>
             </div> <div class="container" >
                   <div class="row" style="padding:0px">
                       ${result}
                   </div></div>
               `;
    } catch (error) {
      console.log(error);
    }
  },
};
export default Homepage;
