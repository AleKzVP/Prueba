// http://localhost:3000/controller/products
const urlDefault = "assets/images/products/giove-perfume3.jpg";
export default function product({
    ID = "null",
    image = "/assets/images/products/giove-perfume3.jpg",
    nombre = "nothing",
    precio = "0.000",
    cantidad = "0",
    categoria = "nothing",
    genero = "nothing",
    tamaño = "nothing",
},index){
    image = image.replaceAll(" ", "")==""?urlDefault:image;
    return `
        <div class="col-lg-3 col-md-6 col-12">
            <div class="single-product">
                <div class="product-image">
                    <img src="/${image}" alt="#">
                    <div class="button">
                        <a index='${JSON.stringify({index,ID,nombre,precio,cantidad,image})}' class="btn btnBuy"><i class="lni lni-cart"></i> Add to Cart </a>
                    </div>
                </div>
                <div class="product-info">
                    <span class="category">${genero}</span>
                    <h4 class="title">
                        <a href="product-grids.html">${nombre}</a>
                    </h4>
                    <ul class="review">
                        <li><i class="lni lni-star-filled"></i></li>
                        <li><i class="lni lni-star-filled"></i></li>
                        <li><i class="lni lni-star-filled"></i></li>
                        <li><i class="lni lni-star-filled"></i></li>
                        <li><i class="lni lni-star"></i></li>
                        <li><span>4.0 Review(s)</span></li>
                    </ul>
                    <div class="price">
                        <span>${precio}</span>
                    </div>
                </div>
            </div>
        </div>
    `
}