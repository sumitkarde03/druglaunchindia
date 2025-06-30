import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { isGeminiConfigured } from '../lib/gemini'
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Home, 
  FileText, 
  Database, 
  Shield, 
  Phone, 
  Info,
  HelpCircle,
  Lock,
  Accessibility,
  Brain,
  ChevronDown,
  Bell,
  Search,
  Settings,
  Star,
  Zap,
  Sparkles
} from 'lucide-react'

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hasNotifications, setHasNotifications] = useState(true) // Simulating notifications
  const { user, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  // Handle scroll effect for floating navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menus when route changes
  useEffect(() => {
    setIsMenuOpen(false)
    setIsUserMenuOpen(false)
  }, [location.pathname])

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
    setIsUserMenuOpen(false)
  }

  const handleNotificationClick = () => {
    navigate('/notifications')
  }

  const navigation = [
    { name: 'Home', href: '/', icon: Home, color: 'from-blue-500 to-cyan-500' },
    { name: 'AI Search', href: '/search', icon: Search, color: 'from-purple-500 to-pink-500', featured: true },
    { name: 'Drug Directory', href: '/drugs', icon: Database, color: 'from-green-500 to-emerald-500' },
    { name: 'Regulations', href: '/regulations', icon: FileText, color: 'from-orange-500 to-red-500' },
    { name: 'About', href: '/about', icon: Info, color: 'from-indigo-500 to-purple-500' },
    { name: 'Contact', href: '/contact', icon: Phone, color: 'from-teal-500 to-cyan-500' },
  ]

  const footerLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Use', href: '/terms' },
    { name: 'Accessibility', href: '/accessibility' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-indigo-50/50">
      {/* Enhanced Floating Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-3' 
          : 'py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-500 ${
            scrolled
              ? 'bg-white/95 backdrop-blur-3xl shadow-2xl border border-white/30'
              : 'bg-white/85 backdrop-blur-2xl shadow-xl border border-white/40'
          } rounded-3xl`}>
            <div className="flex justify-between items-center h-18 px-8">
              {/* Enhanced Logo */}
              <Link to="/" className="flex items-center space-x-4 group">
                <div className="relative">
                  <div className={`transition-all duration-300 ${
                    scrolled ? 'w-12 h-12' : 'w-14 h-14'
                  } bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}>
                    <span className="text-white font-bold text-lg">DLI</span>
                  </div>
                  {isGeminiConfigured() && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="hidden sm:block">
                  <span className={`font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent transition-all duration-300 ${
                    scrolled ? 'text-xl' : 'text-2xl'
                  }`}>
                    DrugLaunchIndia
                  </span>
                  {isGeminiConfigured() && (
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-purple-600 font-semibold">AI Powered</span>
                    </div>
                  )}
                </div>
              </Link>

              {/* Enhanced Desktop Navigation */}
              <nav className="hidden xl:flex items-center space-x-3">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`relative flex items-center space-x-3 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 group ${
                        isActive
                          ? 'text-white shadow-xl transform scale-105'
                          : 'text-slate-700 hover:text-white hover:shadow-lg hover:scale-105'
                      }`}
                      style={isActive || undefined ? {
                        background: `linear-gradient(135deg, ${item.color.split(' ')[0].replace('from-', '')}, ${item.color.split(' ')[1].replace('to-', '')})`
                      } : undefined}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.target.style.background = `linear-gradient(135deg, ${item.color.split(' ')[0].replace('from-', '')}, ${item.color.split(' ')[1].replace('to-', '')})`
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.target.style.background = 'transparent'
                        }
                      }}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                      {item.featured && (
                        <div className="absolute -top-1 -right-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current animate-pulse" />
                        </div>
                      )}
                    </Link>
                  )
                })}
              </nav>

              {/* Enhanced Tablet Navigation */}
              <nav className="hidden lg:flex xl:hidden items-center space-x-2">
                {navigation.slice(0, 4).map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 group ${
                        isActive
                          ? 'text-white shadow-xl transform scale-110'
                          : 'text-slate-700 hover:text-white hover:shadow-lg hover:scale-110'
                      }`}
                      style={isActive || undefined ? {
                        background: `linear-gradient(135deg, ${item.color.split(' ')[0].replace('from-', '')}, ${item.color.split(' ')[1].replace('to-', '')})`
                      } : undefined}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.target.style.background = `linear-gradient(135deg, ${item.color.split(' ')[0].replace('from-', '')}, ${item.color.split(' ')[1].replace('to-', '')})`
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.target.style.background = 'transparent'
                        }
                      }}
                      title={item.name}
                    >
                      <Icon className="w-6 h-6" />
                      {item.featured && (
                        <div className="absolute -top-1 -right-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current animate-pulse" />
                        </div>
                      )}
                    </Link>
                  )
                })}
              </nav>

              {/* Enhanced Right side actions */}
              <div className="flex items-center space-x-4">
                {/* Enhanced Quick Search Button - Desktop */}
                <Link
                  to="/search"
                  className="hidden lg:flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm font-semibold"
                >
                  <Search className="w-5 h-5" />
                  <span className="hidden xl:block">AI Search</span>
                </Link>

                {/* Enhanced Notifications */}
                {user && (
                  <button 
                    onClick={handleNotificationClick}
                    className={`relative p-3 rounded-2xl transition-all duration-300 hover:scale-110 ${
                      hasNotifications 
                        ? 'text-orange-600 hover:text-orange-700 bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 shadow-lg border-2 border-orange-200/60 animate-pulse' 
                        : 'text-slate-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:shadow-lg'
                    }`}
                  >
                    <Bell className={`w-6 h-6 ${hasNotifications ? 'animate-pulse' : ''}`} />
                    {hasNotifications && (
                      <>
                        {/* Enhanced notification dot */}
                        <div className="absolute top-2 right-2 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse border-2 border-white shadow-lg"></div>
                        {/* Enhanced pulsing ring effect */}
                        <div className="absolute top-2 right-2 w-4 h-4 bg-red-400 rounded-full animate-ping"></div>
                      </>
                    )}
                  </button>
                )}

                {/* Enhanced User Menu */}
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-3 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                      <span className="hidden sm:block text-sm font-semibold max-w-28 truncate">
                        {user.email.split('@')[0]}
                      </span>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-4 w-72 bg-white/95 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/30 py-3 z-50 animate-fade-in-scale">
                        <div className="px-6 py-4 border-b border-slate-100">
                          <p className="text-sm font-bold text-slate-900">{user.email}</p>
                          <div className="flex items-center space-x-3 mt-2">
                            <div className="flex items-center space-x-2">
                              <Zap className="w-4 h-4 text-yellow-500" />
                              <span className="text-xs text-slate-600 font-medium">Premium Member</span>
                            </div>
                            {isGeminiConfigured() && (
                              <div className="flex items-center space-x-2">
                                <Brain className="w-4 h-4 text-purple-500" />
                                <span className="text-xs text-purple-600 font-medium">AI Enabled</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="py-2">
                          <Link
                            to="/notifications"
                            className="flex items-center space-x-4 w-full px-6 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors font-medium"
                          >
                            <Bell className="w-5 h-5" />
                            <span>Notifications</span>
                            {hasNotifications && (
                              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                            )}
                          </Link>
                          <button className="flex items-center space-x-4 w-full px-6 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors font-medium">
                            <Settings className="w-5 h-5" />
                            <span>Account Settings</span>
                          </button>
                          <button
                            onClick={handleSignOut}
                            className="flex items-center space-x-4 w-full px-6 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                          >
                            <LogOut className="w-5 h-5" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Link
                      to="/login"
                      className="text-slate-700 hover:text-indigo-600 transition-colors text-sm font-semibold px-4 py-2 rounded-2xl hover:bg-white/60"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm font-semibold"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}

                {/* Enhanced Mobile menu button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden p-3 text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Navigation Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-24 bg-black/20 backdrop-blur-sm z-40">
            <div className="max-w-md mx-auto mt-6 mx-6">
              <div className="bg-white/95 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden animate-fade-in-scale">
                <nav className="py-6">
                  {navigation.map((item, index) => {
                    const Icon = item.icon
                    const isActive = location.pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center space-x-5 px-8 py-5 text-base font-semibold transition-all duration-300 ${
                          isActive
                            ? 'text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 shadow-lg'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          isActive 
                            ? 'bg-white/20' 
                            : 'bg-gradient-to-br ' + item.color
                        }`}>
                          <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-white'}`} />
                        </div>
                        <div className="flex-1">
                          <span>{item.name}</span>
                          {item.featured && (
                            <div className="flex items-center space-x-2 mt-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-xs opacity-75">Featured</span>
                            </div>
                          )}
                        </div>
                      </Link>
                    )
                  })}
                </nav>
                
                {/* Enhanced Mobile Quick Actions */}
                <div className="border-t border-slate-100 p-6">
                  <Link
                    to="/search"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center space-x-3 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300"
                  >
                    <Search className="w-6 h-6" />
                    <span>AI Medicine Search</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content with proper top padding */}
      <main className="pt-28">
        {children}
      </main>

      {/* Enhanced Important Safety Information */}
      <div className="bg-gradient-to-r from-amber-50/80 to-orange-50/80 border-t border-amber-200/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4 text-sm text-amber-800">
            <Shield className="w-6 h-6 flex-shrink-0 text-amber-600" />
            <span className="font-bold">Important Safety Information:</span>
            <span className="hidden sm:block">All drug information is for investment analysis only. Consult healthcare professionals for medical advice.</span>
            <span className="sm:hidden">For investment analysis only. Consult healthcare professionals.</span>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-white/85 backdrop-blur-sm border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-xl">DLI</span>
                </div>
                <div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    DrugLaunchIndia
                  </span>
                  {isGeminiConfigured() && (
                    <div className="flex items-center space-x-2 mt-2">
                      <Brain className="w-5 h-5 text-purple-600" />
                      <span className="text-sm text-purple-600 font-semibold">AI Powered</span>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed max-w-md text-lg">
                Empowering foreign investment decisions in India's pharmaceutical market through data-driven insights and AI-powered analysis.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-slate-900 mb-6 text-lg">Legal</h3>
              <ul className="space-y-4">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-slate-600 hover:text-indigo-600 text-sm transition-colors font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-slate-900 mb-6 text-lg">Technology</h3>
              <div className="space-y-4 text-sm text-slate-600">
                <p className="leading-relaxed">Powered by Open Government Data Platform India and WHO Global Health Observatory API</p>
                {isGeminiConfigured() && (
                  <div className="flex items-center space-x-3">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">AI insights by Google Gemini</span>
                  </div>
                )}
                <p className="text-xs text-slate-500 mt-6">
                  Built with Bolt.new
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-slate-200/50">
            <p className="text-center text-sm text-slate-500">
              © 2025 DrugLaunchIndia. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout