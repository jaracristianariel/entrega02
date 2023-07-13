const ProductManager = require("./ProductManager.js");
let productManager = new ProductManager();
console.log(productManager);

let persistirProduct = async () => {
    let product = await productManager.addProdutc("Pulsera", "Oro", 15000, "sinImagen", "a099", 5);
    
    let products = await productManager.getProducts();
    console.log(`productos encontrados: ${products.length}`); 
    console.log(products)
}
persistirProduct(); 