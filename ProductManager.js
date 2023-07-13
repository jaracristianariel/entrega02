class Product {
    static id = 0
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }    
}
class ProductManager{
    #products;
    #productDirPath;
    #productFilePath;
    #fileSystem;
    constructor() {
        this.#products = new Array();
        this.#productDirPath = "./files";
        this.#productFilePath = this.#productDirPath + "/products.json"
        this.#fileSystem = require("fs");
    }
    //metodos
    //crear prductos
    addProdutc = async(title, description, price, thumbnail, code, stock) => {
        let nuevoProducto = new Product(title, description, price, thumbnail, code, stock)
        console.log("creando producto: producto a registrar");
        console.log(nuevoProducto);
        try{
            await this.#fileSystem.promises.mkdir(this.#productDirPath, {recursive: true});//creamos directorio
            if (!this.#fileSystem.existsSync(this.#productFilePath)){//si no existe el archivo
                await this.#fileSystem.promises.writeFile(this.#productFilePath, "[]");//crearlo
            }
            let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, "utf-8");//leemos el archivo = []
            console.log("archivo json obtenido desde archivo: ");
            console.log(productsFile);
            this.#products = JSON.parse(productsFile);//transforamos a objetos
            console.log("productos encontrados: ");
            console.log(this.#products);
            this.#products.push(nuevoProducto);
            console.log("lista actualizada de productos");
            console.log(this.#products);
            await this.#fileSystem.promises.writeFile(this.#productFilePath, JSON.stringify(this.#products, null, 2, '\t'));//se sobre escribe el archivo
        }catch(error){
            console.error(`error creando producto nuevo: ${JSON.stringify(nuevoProducto)}, detalle del error: ${error}`);
            throw Error(`Error creando producto nuevo: ${JSON.stringify(nuevoProducto)}, detalle del error: ${error}`);
        }
        
    }
    //leer productos
    getProducts = async() => {
        try {
            await this.#fileSystem.promises.mkdir(this.#productDirPath, {recursive: true});//creamos directorio
            if (!this.#fileSystem.existsSync(this.#productFilePath)){//si no existe el archivo
            await this.#fileSystem.promises.writeFile(this.#productFilePath, "[]");
            }
            let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, "utf-8");
            console.log("archivo json obtenido desde archivo: ");
            console.log(productsFile);
            this.#products = JSON.parse(productsFile);
            console.log("productos encontrados: ");
            console.log(this.#products);
            return this.#products;
        } catch (error) {
            console.error(`error consultando los productos: ${this.#productDirPath}, detalle del error: ${error}`);
            throw Error(`error consultando los productos: ${this.#productDirPath}, detalle del error: ${error}`);
        }
    }
    getProductById = async(id) =>{
        try {
            await this.#fileSystem.promises.mkdir(this.#productDirPath, {recursive: true});//creamos directorio
            if (!this.#fileSystem.existsSync(this.#productFilePath)){//si no existe el archivo
            await this.#fileSystem.promises.writeFile(this.#productFilePath, "[]");
            }
            let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, "utf-8");
            console.log("archivo json obtenido desde archivo: ");
            console.log(productsFile);
            this.#products = JSON.parse(productsFile);
            console.log("productos encontrados: ");
            console.log(this.#products);
            let product = this.#products.find((producto) => producto.id === id);
            return product;

        } catch (error) {
            console.error(`error consultando id: ${id}, detalle del error: ${error}`);
            throw Error(`error consultando id: ${id}, detalle del error: ${error}`);
        }

    }
    updateProduct = async (id, updatedFields) => {
        try {
            await this.#fileSystem.promises.mkdir(this.#productDirPath, { recursive: true });
            if (!this.#fileSystem.existsSync(this.#productFilePath)){
                await this.#fileSystem.promises.writeFile(this.#productFilePath, "[]");
            }
            let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, "utf-8");
            console.info("Archivo JSON obtenido desde archivo:");
            console.log(productsFile);
            this.#products = JSON.parse(productsFile);
            console.log("Productos encontrados:");
            console.log(this.#products);
            let productId = this.#products.findIndex((p) => p.code === id);
            if (productId !== -1) {
                this.#products[productId] = { ...this.#products[productId], ...updatedFields };
                await this.#fileSystem.promises.writeFile(
                    this.#productFilePath,
                    JSON.stringify(this.#products, null, 2, '\t')
                );
                console.log("Producto actualizado:");
                console.log(this.#products[productId]);
            } else {
                console.log(`No se encontro el ID: ${id}`);
            }
        } catch (error) {
            console.error(`Error actualizando el producto: ${id}, detalle del error: ${error}`);
            throw Error(`Error actualizando el producto: ${id}, detalle del error: ${error}`);
        }
    }
    deleteProduct = async() =>{
        try {
            await this.#fileSystem.promises.mkdir(this.#productDirPath, { recursive: true });
            if (!this.#fileSystem.existsSync(this.#productFilePath)){
                await this.#fileSystem.promises.writeFile(this.#productFilePath, "[]");
            }
            let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, "utf-8");
            console.info("Archivo JSON obtenido desde archivo:");
            console.log(productsFile);
            this.#products = JSON.parse(productsFile);
            console.log("Productos encontrados:");
            console.log(this.#products);
            let productId = this.#products.findIndex((p) => p.code === id);
            if (productId !== -1) {
                let deletedProduct = this.#products.splice(productId, 1)[0];
                await this.#fileSystem.promises.writeFile(
                    this.#productFilePath,
                    JSON.stringify(this.#products, null, 2, '\t')
                );
                console.log("Producto eliminado:");
                console.log(deletedProduct);
            } else {
                console.log(`No se encontró ningún producto con el ID: ${id}`);
            }
        } catch (error) {
            console.error(`Error eliminando el producto por ID: ${id}, detalle del error: ${error}`);
            throw Error(`Error eliminando el producto por ID: ${id}, detalle del error: ${error}`);
        }
    }

}
    
module.exports = ProductManager;