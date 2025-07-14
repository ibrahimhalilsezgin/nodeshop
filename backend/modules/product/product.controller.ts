import productModel from "./product.model";
import Product from "./product.interface";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";


class ProductController {
    async getAllProducts(req, res){

        const products = await productModel.find({  }).select('id title details tags stock price image');
        return res.status(200).json({
            products: products
        });

    };
    async getProduct(req, res) {
        const product = await productModel.findOne({ id: req.params.id });

        if(!product) return res.status(404).json({
            error: 'Ürün Bulunamadı'
        });

        return res.status(200).json({
            product
        })
    };

    async createProduct(req, res) {
        let {
            title,
            details,
            stock,
            tags,
            price,
            image,
            file
        }:Product = req.body;        

        let id = uuidv4()


        if(!title || !details || stock <= 0 || !image) return res.status(500).json({
            error: 'Geçerli bilgiler girilmedi'
        });

        const response = await axios.post(process.env.CDNLINK +'/upload', {
        id: id,
        image: image // base64 string
        }, {
        headers: {
            Authorization: "Server PAPYABVPsUZMnAXSxUwVcbjZyTynKEZeMKwGGPACqbxpFnCHkxSzKhArNWzAQuUm"
        }
        });
        await new productModel({
            id,
            title,
            details,
            stock,
            tags,
            price,
            image: response.data.url,
            file
        }).save().then((x) => {
        
            return res.status(200).json({
                message:'Ürün başarıyla oluşturuldu',
                id: x.id
            });
        
        }).catch((err) => {
            
            console.log(err);
            
            return res.status(500).json({
                message:'Ürün oluşturulurken bir hata oluştu. Lütfen site yöneticisine ulaşın.'
            });
        
        });
    };
    async updateProduct(req, res) {
        let { id } = req.params;

        let {
            title,
            details,
            stock,
            tags,
            price,
        }:Product = req.body;        

        if(!title || !details || stock <= 0 || !price || price <= 0) return res.status(500).json({
            error: 'Geçerli bilgiler girilmedi'
        });

        let product = await productModel.findOne({ id });

        if(!product) return res.status(404).json({
            error: 'Ürün Bulunamadı'
        });

        productModel.findOneAndUpdate({ id }, {
            title,
            details,
            stock,
            tags,
            price
        }).then(() => {
        
            return res.status(200).json({
                message:'Ürün başarıyla güncellendi.'
            });
        
        }).catch((err) => {
            
            console.log(err);
            
            return res.status(500).json({
                message:'Ürün güncellenirken bir hata oluştu. Lütfen site yöneticisine ulaşın.'
            });
        
        });


    };
    async deleteProduct(req, res) {
        let { id } = req.params;      
        let product = await productModel.findOne({ id });

        if(!product) return res.status(404).json({
            error: 'Ürün Bulunamadı'
        });

        productModel.findOneAndDelete({ id }).then(() => {
        
            return res.status(200).json({
                message:'Ürün başarıyla Silindi.'
            });
        
        }).catch((err) => {
            console.log(err);
            return res.status(500).json({
                message:'Ürün silinirken bir hata oluştu. Lütfen site yöneticisine ulaşın.'
            });
        
        });


    };

    async addComment(req, res) {
        let { id } = req.params;
        let {username, content, rating} = req.body;


        if(!username || !content || !rating || rating <= 0  || rating > 5) return res.status(500).json({
            error:'Yorum Boş Bırakılamaz'
        });

        const comment = await productModel.findOneAndUpdate({ id: id }, {
            $push:{
                comments:{
                    id: (await productModel.findOne({id:id}))?.comments.length + 1,
                    username: username,
                    avatar: `https://ui-avatars.com/api/?name=${username}&background=6366f1&color=fff`,
                    content: content,
                    rating: rating
                }
            }
        })

        return res.status(200).json({
            message:'Yorum Eklendi.'
        })
    }
};


export default new ProductController();