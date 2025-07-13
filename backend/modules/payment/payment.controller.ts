
import Iyzipay from "iyzipay";
import userModel from "../user/user.model";
import { sendWebhook } from "../../utils/functions";
import productModel from "../product/product.model";
import paymentModel from "./payment.model";
import process from "process";
import "dotenv/config"
import { pipeline } from 'stream';
import axios from "axios";
import {Types,ObjectId} from "mongoose";
var iyzipay = new Iyzipay({
    apiKey: process.env.IyzipayApiKey,
    secretKey: process.env.IyzipaySecretKey,
    uri: process.env.IyzipayURI
});

class PaymentController {
    async startPayment(req, res){


        let {userID, basketId, basketItems} = req.body;
        const conversationId = 'ibo-' + Math.floor((Math.random() * 1000) * Date.now()).toString()
        const user = await userModel.findOne({
            id: userID
        });

        if(!user) return res.status(403).json({
            error:'Giriş yapmadan kullanamazsın.'
        });

        if(!user.gsmNumber) return res.status(403).json({
            error:'Telefon Numaranızı Doğrulamadan Sipariş Veremezsiniz.'
        });
        let items:any = [];
        let price = 0;
        await Promise.all(
        basketItems.map(async (item) => {
            const I = await productModel.findOne({ id: item.basketItemId });
            if (!I) return;
            items.push({
                    id: I.id,
                    name: I.title,
                    category1: "genel",
                    itemType: "VIRTUAL",
                    price: I.price
            })
            price += I.price;
        })
        );



        iyzipay.checkoutFormInitialize.create({
            locale: Iyzipay.LOCALE.TR,
            callbackUrl:process.env.frontendURL + '/payment/callback',
            conversationId: conversationId,
            price: price.toFixed(2).toString(),
            paidPrice: (price + 0.2).toFixed(2).toString(),
            currency: Iyzipay.CURRENCY.TRY,
            installment: '1',
            basketId,
            paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
            paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
            buyer: {
                id:user.id,
                name:user.firstName,
                surname: user.lastName,
                gsmNumber: user.gsmNumber,
                email: user.email,
                identityNumber: user.idenityNumber,
                registrationAddress: user.registrationAddress,
                ip: user.IPAddress || '192.168.1.100',
                city: user.city,
                country: user.country || "Turkey",
                zipCode: user.zipCode
            },
            billingAddress: {
                contactName: `${user.firstName} ${user.lastName}`,
                city: user.city,
                country: user.country || "Turkey",
                address: user.registrationAddress,
                zipCode: user.zipCode
            },
            basketItems:items,
    }, function(err, result, done) {
            if(err) return console.log(err);
            if(result) {
                console.log(result)
                let items:any = [];
                let totalPrice = 0;
                for(const [key, value] of Object.entries(basketItems)){
                        items.push(value?.name + ' ' + value.price + '₺')
                        totalPrice += value.price
                    } 
                sendWebhook('Satın Alım Başlangıcı', `Kullanıcı : ${user.firstName} ${user.lastName}\nAlınan Ürünler:\n${items.map(x => x + '\n')}\nToplam Ücret: ${totalPrice}₺`)
                return res.status(200).json({
                    redirectURL:  result.paymentPageUrl
                });
            } else {
                return res.status(500).json({
                    error:'Bir HATA oluştu site yöneticisine ulaşın.'
                })
            }
        })



    };


    async savePurchase(req, res) {
        const usr = req.user;
        const { token } = req.body;

        if (!token) {
            return res.status(403).json({ error: 'Token Girilmeli.' });
        }

        const user = await userModel.findOne({ id: usr.id });

        if (!user) {
            return res.status(403).json({ error: 'Kullanıcı Giriş Yapmış Olmalı.' });
        }

        const result = await new Promise((resolve, reject) => {
            iyzipay.checkoutForm.retrieve({ token }, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (result.status !== 'success') {
            return res.status(400).json({ error: 'Ödeme başarısız.' });
        }

        const itemIds = result.itemTransactions.map(item => item.itemId);

        // Product'ları çek
        const products = await productModel.find({ id: { $in: itemIds } });

        // Kolay eşleştirmek için map'e dönüştür
        const productMap = {};
        products.forEach(p => {
            productMap[p.id] = p;
        });

        // Her itemTransaction'u ürün bilgileriyle zenginleştir
        const enrichedItems = result.itemTransactions.map(item => {
            const prod = productMap[item.itemId] || {};
            return {
                itemId: item.itemId,
                paidPrice: item.paidPrice,
                price: item.price,
                productTitle: prod.title || 'Bilinmeyen Ürün',
                productDetails: prod.details || '',
                productTags: prod.tags || [],
                productImage: prod.image || ''
            };
        });

        // Tutarı hesapla
        let price = 0;
        enrichedItems.forEach(item => {
            price += item.price;
        });

        // Kullanıcıya kaydet
        const updatedUser = await userModel.findOneAndUpdate(
            { id: usr.id },
            {
                $push: {
                    purchases: {
                        basketId: result.basketId,
                        cardAssociation: result.cardAssociation,
                        binNumber: result.binNumber,
                        lastFourDigits: result.lastFourDigits,
                        items: enrichedItems
                    }
                }
            },
            { new: true }
        );
        await paymentModel.create({
            userId: user._id,
            basketId: result.basketId,
            cardAssociation: result.cardAssociation,
            binNumber: result.binNumber,
            lastFourDigits: result.lastFourDigits,
            items: enrichedItems,
            totalPrice: price
        });
        // Webhook
        const itemTitles = enrichedItems.map(i => i.productTitle).join(', ');
        sendWebhook('Satın Alım Tamamlandı', `
    Ad Soyad: ${user.firstName} ${user.lastName}
    Tc Kimlik Numarası: ${user.idenityNumber}
    E-Mail: ${user.email}
    Telefon Numarası: ${user.gsmNumber}
    IP Adresi: ${user.IPAddress}
    Şehir: ${user.city}
    Ülke: ${user.country}
    Posta Kodu: ${user.zipCode}

    Ürünler: ${itemTitles}
    Tutar: ${price}
        `);

        return res.json(updatedUser);
    }

    
}

export default new PaymentController()