const Base_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? "http://localhost:5000"
  : "https://backend-portfolio-7tgk.onrender.com";

export default Base_URL;
