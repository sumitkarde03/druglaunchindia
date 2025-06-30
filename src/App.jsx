import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import DrugDirectory from './pages/DrugDirectory'
import MedicineSearch from './pages/MedicineSearch'
import Regulations from './pages/Regulations'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import AccessibilityPage from './pages/Accessibility'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes without layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Routes with layout */}
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/accessibility" element={<AccessibilityPage />} />
                
                {/* Medicine Search - Public but enhanced with auth */}
                <Route path="/search" element={<MedicineSearch />} />
                
                {/* Protected routes */}
                <Route path="/drugs" element={
                  <ProtectedRoute>
                    <DrugDirectory />
                  </ProtectedRoute>
                } />
                <Route path="/regulations" element={
                  <ProtectedRoute>
                    <Regulations />
                  </ProtectedRoute>
                } />
              </Routes>
            </Layout>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App