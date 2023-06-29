const mongoose = require('mongoose')
const Schema=mongoose.Schema

const invoiceSchema = new Schema({
    invoiceNumber: {
        type:Number,
        required:[true,'Invoice number is required']
    },
    customer: {
        type:String,
        required:[true,'Customer is required']
    },
    invoiceDate: {
        type:Date,
        default: new Date()
    },
    total :{
        type:Number,
        default:0
    }

},{
    timestamps:true
})


module.exports=mongoose.model("Invoice",invoiceSchema)