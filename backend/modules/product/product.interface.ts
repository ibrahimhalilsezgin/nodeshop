interface Product {
    id: string
    title: string
    details: string
    stock: number
    tags:[string]
    price:number
    image: string
    cargoType:string
    status: boolean
    file:File
};

export default Product;