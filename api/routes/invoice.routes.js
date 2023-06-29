const express = require('express')
const router = express.Router() 
const invoiceService = require('../services/invoice.service')

router.post('/add',async (req,res,next)=>{
    const result = await invoiceService.addInvoice(req.body)
    return res.json(result)
})

router.get('/all',async (req,res,next)=>{
    const result = await invoiceService.getAllInvoices()
    return res.json(result)
})


router.put('/update/:id',async (req,res,next)=>{
    //
})

router.delete('/delete/:id',async (req,res,next)=>{
    //
})




module.exports=router