
import './App.css'
import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Sales 2023',
    },
  },
};







export const socket = io("http://localhost:3100");



function App() {
  const [invoices, setInvoices] = useState([])
  const [labels,setLabels]=useState([])
  const [data,setData]=useState([])

  const fetchInvoices = async () => {
    fetch('http://localhost:3000/invoice/all')
      .then(data => data.json())
      .then(json => {
        setLabels(json.map(invoice=>invoice.customer))
        setData(json.map(invoice => invoice.total))
        setInvoices(json)
      })
  }
  
  const dataJs = {
    labels,
    datasets: [
      {
        label: 'Customer',
        data,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  useEffect(() => {
    fetchInvoices()
    socket.on("add-invoice", data => {
      console.log(data, "from server")
      setInvoices(prev => [...prev, data])
    })

    return () => socket.off('add-invoice')

  }, [data])

  return (
    <>
      {invoices.map((invoice) => {
        return (<li key={invoice._id}>
          <span>{invoice?.invoiceNumber}</span>
          <span>{invoice?.invoiceDate}</span>
          <span>{invoice?.customer}</span>
          <span>{invoice?.total}</span>
        </li>)
      })}
      <hr/>
      <Bar options={options} data={dataJs} />;
    </>
  )
}

export default App
