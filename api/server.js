const http = require('http')
const app = require('./app')
const mongoose = require('mongoose')
const Invoice = require('./models/invoice.model')
const io = require('socket.io')(3100,{cors:{
    origin:"*"
}})


mongoose.connect('mongodb://127.0.0.1:27017/alfadb?replicaSet=rs0',{directConnection: true})
    .then(() => {
        console.log("API is successfully connected to DB")
        const invoiceChangeStream = Invoice.watch()

        io.on('connection', (socket)=>{
            console.log("Client Connectd")
    
            invoiceChangeStream.on('change',data =>{
                switch (data.operationType) {
                    case 'insert':
                        console.log(data.fullDocument)
                        socket.emit('add-invoice',data.fullDocument)
                        break;
                
                    default:
                        break;
                }
            })
        })
        
    })
    .catch(error => {
        console.log('Erro :', error.message)
    })

const server = http.createServer(app);



app.listen(3000, () => {
    console.log("API Listening on http://localhost:3000")
})