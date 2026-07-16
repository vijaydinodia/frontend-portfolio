import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import Base_URL from './api'
import App from './App.jsx'
import { Analytics } from '@vercel/analytics/react'
import './index.css'

// Set global base URL for all axios requests
axios.defaults.baseURL = Base_URL;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Analytics />
    </BrowserRouter>
  </React.StrictMode>,
)
