import User from "./user.interface";
import userModel from "./user.model";
import bcrypt, { hashSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config"
import twilio from "twilio"

const client = twilio(process.env.TwilioSID, process.env.TwilioAuth)
import { generateSnowflake,validateEmail } from "../../utils/functions";
class UserController {
        async Register(req, res) {
            let {
                firstName,
                lastName,
                email,
                password,
            }:User = req.body;
            const IPAddress = req.ip
            let errors:any = [];


            if((!firstName || firstName.length < 3) || !lastName) errors.push('İsim Soyisim geçerli değil.');
            if(!email || !validateEmail(email)) errors.push('Geçerli Bir E-Posta Adresi Giriniz.')
            if(!password || password.length < 8) errors.push('Geçerli Bir Şifre Girin. Şifre Minimum 8 Harften Oluşabilir.')
            
            const checkUser1 = await userModel.findOne({ firstName, lastName });
            const checkUser2 = await userModel.findOne({ email });

            if(checkUser1 || checkUser2) errors.push('Bu Kullanıcı Adı Veya E-Posta Hali Hazırda Kullanılıyor.');    

            if(errors.length > 0) return res.status(400).json({
                errors: errors
            });


            const id = generateSnowflake();

            const hashedPassword = hashSync(password, 10);
            new userModel({
                id,
                firstName, 
                lastName,
                email,
                password: hashedPassword,
                IPAddress:IPAddress.toString()
            }).save();

            
            return res.status(200).json({
                message: 'Successfully registered'
            });
            
        };

        async Login(req, res) {
            let {
                email,
                password,
            }:User = req.body;
            if(!email || !password) return res.status(400).json({
                error: 'Tüm Bilgileri giriniz.'
            });
            const user = await userModel.findOne({email});
            if(!user) return res.status(400).json({
                error: 'Kullanıcı Bulunmuyor.'
            });
            const decodedPassword = bcrypt.compareSync(password, user.password as string);

            if(!decodedPassword) return res.status(401).json({
                error: 'E-Posta Veya Şifre Yanlış'
            });
            const token = jwt.sign({id: user.id, firstName: user.firstName, lastName: user.lastName,isAdmin: user.admin }, process.env.SecretKey);
            // user.updateOne({
            //     IPAddress: IPAddress
            // });
            return res.status(200).json({
                token
            });
        };

        async userDetails(req, res) {
                        
            const user = await userModel.findOne({id: req.user.id}).select('email gsmNumber city purchases registrationAddress');

            if(!user) return res.status(403).json({
                error: 'Giriş Yapmadan Kullanamazsın'
            });
            return res.status(200).json({
                email:user.email,
                gsmNumber: user.gsmNumber,
                city: user.city,
                purchases: user.purchases,
                registrationAddress: user.registrationAddress
            })


        }
        async Settings(req, res) {
            const usr = req.user;
            console.log(usr)
            let {idenityNumber, registrationAddress, city, zipCode, activePassword} = req.body;
            if(!idenityNumber || !registrationAddress || !city || !zipCode || !activePassword) return res.status(401).json({
                error:"Tüm Bilgiler Doğru Girilmeli"
            });

            const user = await userModel.findOne({id: usr.id});
            console.log(user)

            if(!user) return res.status(403).json({
                error: 'Giriş Yapmadan Kullanamazsın'
            });

            if(!bcrypt.compareSync(activePassword, user.password)) {
                return res.status(401).json({
                    error: 'Mevcut Şifren Doğru Değil.'
                });
            };

            await userModel.findOneAndUpdate({ id: usr.id }, {
                idenityNumber,
                registrationAddress,
                city,
                zipCode
            });

            res.status(200).json({
                message: 'Ayarlar Başarıyla Güncellendi'
            })  
        };
        async sendPhoneVerifyCode(req, res) {
            let {phoneNumber} = req.body;
            const user = await userModel.findOne({ id: req.user.id });
            if(!user) return;
            let randomCode = Math.floor(100000 + Math.random() * 900000);
            await userModel.findOneAndUpdate({
                id: user.id
            }, {gsmNumberVerifyCode: randomCode});

            // client.messages.create({
            //     body: 'VirtualHub Telefon Numarası Doğrulama Kodunuz : ' + randomCode,
            //     to: `${phoneNumber}`,
            //     from:"+13163944712"
            // })

            if(process.env.DEVELOPMENTMODE){
                return res.status(200).json({
                message:'sms gönderildi. ' + randomCode
                });
            } else {
                return res.status(200).json({
                message:'sms gönderildi. '
                });
            }
        }
        async verifyPhoneNumber(req, res) {
            let {phoneNumber} = req.body;
            const user = await userModel.findOne({id: req.user.id}).select('id gsmNumberVerifyCode');

            if(!user) return;
            let {code} = req.body;

            if(!code ||  code < 6) return res.status(400).json({
                error: 'Geçersiz Doğrulama Kodu Girildi.'
            });

            if(code != user.gsmNumberVerifyCode) return res.status(403).json({
                error: 'Doğrulama Kodun Geçersiz Veya Süresi Dolmuş.'
            });

            await userModel.findOneAndUpdate({id:user.id}, {
                gsmNumberStatus: true,
                gsmNumber:phoneNumber,
            });

            return res.status(200).json({
                message:'Telefon Numaran Başarıyla Doğrulandı.'
            })
            
        }
}


export default new UserController();        