
import './App.css'
import { io } from 'socket.io-client';
import { useState,useEffect } from 'react';

export const socket = io("http://localhost:3100");

function App() {
  const [invoices,setInvoices]=useState([])

  useEffect(()=>{
    socket.on("add-invoice", data=>{
      console.log(data, "from server")
      setInvoices(prev=>[...prev,data])
    })

  },[])

  return (
    <>
    {invoices.map((invoice)=>{
      return(<li key={invoice._id}>
        <span>{invoice?.invoiceNumber}</span>
        <span>{invoice?.invoiceDate}</span>
        <span>{invoice?.customer}</span>
        <span>{invoice?.total}</span>
        </li>)
    })}
    </>
  )
}

export default App
