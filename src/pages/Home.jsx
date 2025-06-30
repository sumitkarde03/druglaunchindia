import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { indiaGovApi, whoApi, apiWrapper } from '../lib/api'
import { databaseService } from '../lib/database'
import { isSupabaseConfigured } from '../lib/supabase'
import { isGeminiConfigured } from '../lib/gemini'
import AIInsights from '../components/AIInsights'
import AIChat from '../components/AIChat'
import { 
  TrendingUp, 
  Globe, 
  DollarSign, 
  Users, 
  BarChart3, 
  Shield,
  ArrowRight,
  Activity,
  Building2,
  Target,
  Factory,
  Award,
  Zap,
  Database,
  Wifi,
  Brain,
  Sparkles,
  ChevronRight,
  Play,
  Search
} from 'lucide-react'

const Home = () => {
  const [marketStats, setMarketStats] = useState(null)
  const [healthData, setHealthData] = useState([])
  const [userProfiles, setUserProfiles] = useState([])
  const [drugs, setDrugs] = useState([])
  const [loading, setLoading] = useState(true)
  const [dataStatus, setDataStatus] = useState({
    market: 'loading',
    health: 'loading',
    users: 'loading'
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch market statistics
        const marketResult = await apiWrapper.safeApiCall(() => indiaGovApi.getMarketStats())
        if (marketResult.success) {
          setMarketStats(marketResult.data)
          setDataStatus(prev => ({ ...prev, market: 'success' }))
        } else {
          setDataStatus(prev => ({ ...prev, market: 'error' }))
        }

        // Fetch WHO health data
        const healthResult = await apiWrapper.safeApiCall(() => whoApi.getHealthData('IND'))
        if (healthResult.success) {
          setHealthData(healthResult.data)
          setDataStatus(prev => ({ ...prev, health: 'success' }))
        } else {
          setDataStatus(prev => ({ ...prev, health: 'error' }))
        }

        // Fetch user profiles if database is configured
        if (isSupabaseConfigured()) {
          const userResult = await apiWrapper.safeApiCall(() => indiaGovApi.getUserProfiles())
          if (userResult.success) {
            setUserProfiles(userResult.data)
            setDataStatus(prev => ({ ...prev, users: 'success' }))
          } else {
            setDataStatus(prev => ({ ...prev, users: 'error' }))
          }
        } else {
          setDataStatus(prev => ({ ...prev, users: 'not_configured' }))
        }

        // Fetch drugs for AI insights
        const drugsResult = await apiWrapper.safeApiCall(() => indiaGovApi.getDrugPrices())
        if (drugsResult.success) {
          setDrugs(drugsResult.data.data || drugsResult.data)
        }

      } catch (error) {
        console.error('Error fetching home page data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const features = [
    {
      icon: Search,
      title: 'AI Medicine Search',
      description: 'Search any medicine and get comprehensive AI-powered market analysis and investment insights.',
      highlight: 'New Feature',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: BarChart3,
      title: 'AI Price Predictions',
      description: 'Advanced machine learning models predict drug prices with 95% accuracy for 6-month forecasts.',
      highlight: '95% Accuracy',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Globe,
      title: 'Real-time Market Data',
      description: 'Live data integration from WHO Global Health Observatory and Indian government sources.',
      highlight: 'Real-time Updates',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Target,
      title: 'Investment Opportunities',
      description: 'Identify high-potential sectors including biosimilars, generics, and emerging therapeutic areas.',
      highlight: 'Expert Analysis',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const stats = [
    {
      icon: DollarSign,
      label: 'Market Size',
      value: marketStats?.totalMarketSize || marketStats?.total_market_size || 'Loading...',
      color: 'from-indigo-500 to-purple-600',
      change: '+12.3%',
      description: 'Annual growth rate'
    },
    {
      icon: TrendingUp,
      label: 'Export Value',
      value: marketStats?.exportValue || marketStats?.export_value || 'Loading...',
      color: 'from-green-500 to-emerald-600',
      change: '+18.7%',
      description: 'Year-over-year growth'
    },
    {
      icon: Building2,
      label: 'Manufacturing Units',
      value: marketStats?.manufacturingUnits || marketStats?.manufacturing_units || 'Loading...',
      color: 'from-blue-500 to-cyan-600',
      change: '2,000+',
      description: 'WHO-GMP certified'
    },
    {
      icon: Users,
      label: 'Registered Users',
      value: userProfiles.length > 0 ? userProfiles.length.toString() : 'Loading...',
      color: 'from-purple-500 to-pink-600',
      change: `+${userProfiles.length}`,
      description: 'Platform users'
    }
  ]

  const marketHighlights = [
    {
      icon: Award,
      title: 'Global Ranking',
      value: '3rd Largest',
      description: 'Pharmaceutical market globally',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Factory,
      title: 'Generic Market',
      value: '71%',
      description: 'Market share in generics',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'R&D Investment',
      value: '8.5%',
      description: 'Of revenue invested in R&D',
      color: 'from-blue-400 to-indigo-500'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-indigo-200/50 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-700">Powered by AI & Real-time Data</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-slate-900">Invest Smart in</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                India's Pharma Future
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Make informed investment decisions with AI-powered price predictions, comprehensive market analysis, 
              and real-time regulatory insights for India's booming pharmaceutical sector.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/search"
                className="group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Search className="w-5 h-5" />
                <span>Search Medicine with AI</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/drugs"
                className="group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <span>Explore Drug Directory</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="group inline-flex items-center justify-center space-x-2 bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:shadow-xl transition-all duration-300">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>
            
            {/* Data Source Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-slate-200/50 px-4 py-2 rounded-full text-sm text-slate-700">
                <Activity className="w-4 h-4 text-blue-600" />
                <span>WHO Global Health Observatory</span>
              </div>
              
              <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-slate-200/50 px-4 py-2 rounded-full text-sm text-slate-700">
                <Database className="w-4 h-4 text-green-600" />
                <span>Open Government Data Platform India</span>
              </div>
              
              {isSupabaseConfigured() && (
                <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-200 px-4 py-2 rounded-full text-sm text-green-800">
                  <Database className="w-4 h-4" />
                  <span>Live Database Connected</span>
                </div>
              )}
              
              {isGeminiConfigured() && (
                <div className="inline-flex items-center space-x-2 bg-purple-50 border border-purple-200 px-4 py-2 rounded-full text-sm text-purple-800">
                  <Brain className="w-4 h-4" />
                  <span>AI Insights Enabled</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Market Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              India's Pharmaceutical Market at a Glance
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Real-time data from government sources and international health organizations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="metric-card group hover:scale-105 transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="status-badge status-success">
                      {stat.change}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</p>
                    <p className="text-sm text-slate-500">{stat.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Market Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {marketHighlights.map((highlight, index) => {
              const Icon = highlight.icon
              return (
                <div key={index} className="card-modern p-8 text-center group hover:scale-105 transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-br ${highlight.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{highlight.title}</h3>
                  <div className="text-3xl font-bold text-slate-900 mb-2">{highlight.value}</div>
                  <p className="text-slate-600">{highlight.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* AI Medicine Search CTA */}
      {isGeminiConfigured() && (
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <div className="inline-flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full mb-6">
                <Brain className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">New Feature</span>
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Search Any Medicine, Get AI Insights
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
                Our new AI-powered medicine search gives you instant market analysis, investment insights, 
                and competitive intelligence for any pharmaceutical product.
              </p>
              
              <Link
                to="/search"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Search className="w-5 h-5" />
                <span>Try Medicine Search</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* AI Market Insights Section */}
      {isGeminiConfigured() && marketStats && (
        <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <div className="inline-flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full mb-6">
                <Brain className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Powered by Google Gemini AI</span>
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                AI-Powered Market Intelligence
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Get comprehensive market analysis and investment insights powered by advanced artificial intelligence
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card-premium p-8">
                <AIInsights 
                  type="market" 
                  data={{ marketStats, healthData }} 
                />
              </div>
              
              {drugs.length > 0 && (
                <div className="card-premium p-8">
                  <AIInsights 
                    type="investment" 
                    data={{ drugs, marketStats }} 
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Why Choose DrugLaunchIndia?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive tools and insights for pharmaceutical investment decisions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="card-modern p-8 group hover:scale-105 transition-all duration-300">
                  <div className="mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="status-badge status-info mb-4">
                      {feature.highlight}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  <div className="mt-6">
                    <button className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-medium group">
                      <span>Learn more</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* User Profiles Section (if database is connected) */}
      {isSupabaseConfigured() && userProfiles.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Growing Community
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Join thousands of pharmaceutical investment professionals worldwide
              </p>
            </div>
            
            <div className="card-premium p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    {userProfiles.length}
                  </div>
                  <p className="text-slate-600 font-medium">Registered Users</p>
                </div>
                <div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    {userProfiles.filter(p => p.company).length}
                  </div>
                  <p className="text-slate-600 font-medium">Companies Represented</p>
                </div>
                <div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    50+
                  </div>
                  <p className="text-slate-600 font-medium">Countries Served</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Health Data Insights */}
      {healthData.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Health Market Indicators
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Key health statistics from WHO Global Health Observatory
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {healthData.slice(0, 6).map((item, index) => (
                <div key={index} className="card-modern p-6 group hover:scale-105 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {item.name}
                    </h3>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-slate-600">Data Points:</span>
                    <span className="font-semibold text-indigo-600">
                      {item.data?.value?.length || 0}
                    </span>
                  </div>
                  <div className={`status-badge ${item.success ? 'status-success' : 'status-warning'}`}>
                    {item.success ? 'Data Available' : 'Limited Data'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="text-xl text-indigo-100 mb-12 max-w-3xl mx-auto">
              Join thousands of investors making data-driven decisions in India's pharmaceutical market
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center space-x-2 bg-white text-indigo-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <span>Get Started Today</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/search"
                className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300"
              >
                <Search className="w-5 h-5" />
                <span>Search Medicine</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Data Status Footer */}
      <div className="bg-slate-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-8 text-sm text-slate-600">
            <span className="font-medium">System Status:</span>
            {Object.entries(dataStatus).map(([key, status]) => (
              <div key={key} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  status === 'success' ? 'bg-green-500' : 
                  status === 'error' ? 'bg-red-500' : 
                  status === 'not_configured' ? 'bg-gray-500' :
                  'bg-yellow-500'
                }`}></div>
                <span className="capitalize font-medium">{key}</span>
              </div>
            ))}
            {isGeminiConfigured() && (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="font-medium">AI</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Chat Component */}
      <AIChat />
    </div>
  )
}

export default Home