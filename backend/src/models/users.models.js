import { Schema, model } from "mongoose";
import { cartModel } from './carts.models.js'
import paginate from 'mongoose-paginate-v2'

const userSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true,
        index: true
    },
    edad: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        default: 'User'
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'carts'
    },
    ultimaConexion: {
        type: Date
        
    }
})

userSchema.plugin(paginate) //Implementar el metodo paginate en el schema

userSchema.pre('save', async function (next) {
    try {
        const newCart = await cartModel.create({});
        this.cart = newCart._id;
    } catch (error) {
        next(error);
    }
});

userSchema.pre(['findOne', 'find', 'findById'], function () {
    this.populate({
        path: 'cart',
        populate: { path: 'products.id_prod' } // Populate products in cart
    });
});





//Parametro 1:Nombre coleccion - Parametro 2: Schema 
export const userModel = model('users', userSchema)
