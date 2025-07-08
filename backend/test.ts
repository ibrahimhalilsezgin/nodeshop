// import mongoose from 'mongoose';
// import productModel from './modules/product/product.model'; // model dosyanın doğru yolunu kullan

// import axios from 'axios';
// import { createCanvas } from 'canvas';
// import { v4 as uuidv4 } from 'uuid';
// import process from 'process';

// mongoose.connect("mongodb+srv://123:123@cluster0.s8cxfb6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

// const generateBase64Image = () => {
//   const canvas = createCanvas(256, 256); // 10x10 küçük resim
//   const ctx = canvas.getContext('2d');
//   ctx.fillStyle = `rgb(${rand255()}, ${rand255()}, ${rand255()})`;
//   ctx.fillRect(0, 0, 256, 256);
//   return canvas.toDataURL(); // data:image/png;base64,...
// };

// const rand255 = () => Math.floor(Math.random() * 256);

// const createTestProducts = async (count = 5000) => {
//   for (let i = 0; i < count; i++) {
//     const id = uuidv4();
//     const image = generateBase64Image();

//     try {
//       const response = await axios.post('http://localhost:9404/upload', {
//         id,
//         image
//       }, {
//         headers: {
//           Authorization: "Server PAPYABVPsUZMnAXSxUwVcbjZyTynKEZeMKwGGPACqbxpFnCHkxSzKhArNWzAQuUm"
//         }
//       });

//       console.log(`Uploaded ${i + 1}/${count}: ${id}`);
//       console.log(response.data.url);

//       await new productModel({
//         id,
//         title: `Product ${i + 1}`,
//         details: `Details for product ${i + 1}`,
//         stock: Math.floor(Math.random() * 100),
//         tags: ['test', 'random'],
//         price: (Math.random() * 100).toFixed(2),
//         image: response.data.url
//       }).save();

//     } catch (err) {
//       console.error(`Error on product ${i + 1}:`, err.message);
//       // İstersen break koy ya da devam et
//     }
//   }

//   console.log('✅ 5000 ürün başarıyla oluşturuldu');
//   process.exit(0);
// };

// createTestProducts(5000);

import twilio from "twilio"
import "dotenv/config"
const client = twilio(process.env.TwilioSID, process.env.TwilioAuth)
            client.messages.create({
                body: 'VirtualHub Telefon Numarası Doğrulama Kodunuz : TEST',
                to: `+905519477916`,
                from:"+13163944712"
            }).then((message) => console.log(message.sid));
