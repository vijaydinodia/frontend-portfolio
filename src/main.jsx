import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import Base_URL from './api'
import { setupMockBackend } from './mockBackend'
import App from './App.jsx'
import './index.css'

// Initialize client-side mock backend layer & base URL
setupMockBackend();
axios.defaults.baseURL = Base_URL;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
