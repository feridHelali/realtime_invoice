const Invoice = require('../models/invoice.model')

const addInvoice =async (invoice)=>{
    const result = await Invoice.create(invoice)
    if(result){
        return result
    }else{
        throw new Error('Enable to add Invoice')
    }
}

const getAllInvoices= async ()=>{
    const result = await Invoice.find({})
    if(result){
        return result
    }else{
        throw new Error('Enable to get Invoice')
    }

}

const updateInvoice = async (id, newInvoice)=>{
    const result = await Invoice.updateOne({_id:id},invoice)
    if(result){
        return result
    }else{
        throw new Error(`Enable to Updta Invoice ${id}`)
    }

}

const removeInvoice =async (id)=>{
    const result = await Invoice.deleteOne({_id:id})
    if(result){
        return result
    }else{
        throw new Error('Enable to delete Invoice')
    }
}

module.exports={
    addInvoice,
    getAllInvoices,
    updateInvoice,
    removeInvoice
}