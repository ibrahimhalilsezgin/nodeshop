import { Schema, model, Types } from "mongoose";

const payentSchema = new Schema({
    userId: {
        type: Types.ObjectId,   // user'ın _id'si ile bağlanabilir
        ref: 'User',
        required: true
    },
    basketId: {
        type: String,
        required: true
    },
    cardAssociation: String,
    binNumber: String,
    lastFourDigits: String,
    items: [
        {
            itemId: {
                type: String,   // ürün id
                required: true
            },
            paidPrice: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            productTitle: String,
            productDetails: String,
            productTags: [String],
            productImage: String
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default model('Payment', payentSchema);
