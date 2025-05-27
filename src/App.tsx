import './App.css'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import Home from '@/pages/home'
import Product from '@/pages/products'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from '@/pages/about'

function App() {

  return (
    <div className='bg-gradient-to-br from-[#f8fafc] via-[#edf2f7] to-[#e2e8f0] flex flex-col min-h-screen justify-center items-center '>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
