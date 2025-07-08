import {Schema, Types, model} from "mongoose";


const schema = new Schema({
    id:{
        type:Number,
        required: true,
    },
    idenityNumber:{
        type:String
    },
    firstName: {
        type:String,
        required: true,
        maxLength: 64,
        minLength: 3
    },
    lastName: {
        type:String,
        required: true,
        maxLength: 64,
        minLength: 3
    },
    email: {
        type:String,
        required: true,
    },
    gsmNumber: {
        type:String
    },
    password: {
        type:String,
        required: true
    },
    lastHeartbeat: Date,
    IPAddress: {
        type:String,
    },
    createdAt: {
        type:Date,
        default: Date()
    },
    admin:{
        type:Boolean,
        default:false
    },
    registrationAddress:{
        type:String
    },
    city:{
        type:String,
    },
    country:{
        type:String,
        default:'Turkey'
    },
    zipCode:{
        type:String
    },
    purchases: [{
        type:Array
    }],
    gsmNumberStatus:{
        type:Boolean,
        default: false
    },
    gsmNumberVerifyCode:Number
});

export default model('User', schema);