import { AuthProvider } from './context/AuthContext'
import { CarProvider } from './context/CarContext'
import { InquiryProvider } from './context/InquiryContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import Login from './pages/Login'
import Register from './pages/Register'
import CarList from './pages/CarList'
import CarDetail from './pages/CarDetails'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import { Toaster } from './components/ui/toaster'
import {Toaster as Sonner} from './components/ui/sonner'
import { TooltipProvider } from './components/ui/tooltip'
function App() {

  return (
    <TooltipProvider>
      <AuthProvider>
        <CarProvider>
          <InquiryProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cars" element={<CarList />} />
                <Route path="/cars/:id" element={<CarDetail />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </InquiryProvider>
        </CarProvider>
      </AuthProvider>
    </TooltipProvider>
  )
}

export default App
