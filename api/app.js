const express=require('express')
const cors = require('cors')
const morgan = require('morgan')
const invoiceRouter = require("./routes/invoice.routes")


const app =express()
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/invoice',invoiceRouter)

app.use((error,req,res,next)=>{
    res.json({
        error:'500 server',
        raison:error.message
    })
})

module.exports=app