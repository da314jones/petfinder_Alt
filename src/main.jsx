import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import dotenv from 'dotenv';
import './index.css'

dotenv.config();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
