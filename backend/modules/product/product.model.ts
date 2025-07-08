import {Schema, Types, model} from "mongoose";


const schema = new Schema({
    id:{
        type:String,
        required: true,
        unique: true
    },
    title: {
        type:String,
        maxLength: 64,
    },
    details:{
        type:String,
        maxLength: 512
    },
    tags:[{
        type:String,
        maxLength: 12
    }],
    stock: {
        type:Number,
        default: 0,
        required: true        
    },
    price: {
        type:Number,
        required: true        
    },
    cargoType:{
        type:String
    },
    image:{
        type:String
    },
    status: {
        type:Boolean,
        default: true
    }
});

export default model('product', schema);  