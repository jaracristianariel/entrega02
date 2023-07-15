class ProductManager{
    static id = 0;
    constructor(){
        this.products = [];
        this.path = "./productos.json";
        this.fs = require("fs");
    }
    addProduct = async (title, description, price, thumbnail, code, stock) => {
        ProductManager.id++
        let nuevoProducto = {title, description, price, thumbnail, code, stock, id: ProductManager.id}
        this.products.push(nuevoProducto)
        await this.fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2, "\t"));
    }
    getProducts = async () => {
        let inventario = await this.fs.promises.readFile(this.path, "utf-8", null, 2, "\t");        
        return JSON.parse(inventario);
    }
    getProductById = async (id) => {
        let findId = await this.getProducts();
        if(!findId.find(products => products.id === id)){
            console.log("producto no encontrado");
        }else{
            console.log(findId.find(products => products.id === id));
        }
        
    }
    deleteProduct = async (id) => {
    let findId = await this.getProducts();
    let filterDelet = findId.filter(products => products.id != id)
    await this.fs.promises.writeFile(this.path, JSON.stringify(filterDelet));
    console.log("producto eliminado");
    }
    updateProduct = async ({id, ...prod}) => {
        await this.deleteProduct(id);
        let pOld = await this.getProducts();
        console.log(pOld);
        let pMod = [
            {id, ...prod},
            ...pOld
        ];
        await this.fs.promises.writeFile(this.path, JSON.stringify(pMod));
    }
}
const productos = new ProductManager
productos.addProduct("Anillo", "Oro", 15000, "imagen", "a002", 6);
productos.addProduct("Pulsera", "Plata", 3600, "imagen", "b003", 9);
productos.addProduct("collar", "Oro", 23600, "imagen", "a005", 9);

//productos.getProducts();
//productos.getProductById(3);
//productos.deleteProduct(2);
productos.updateProduct({
    title: 'collar',
    description: 'Oro',
    price: 35000,
    thumbnail: 'imagen',
    code: 'a009',
    stock: 15,
    id: 1
})
