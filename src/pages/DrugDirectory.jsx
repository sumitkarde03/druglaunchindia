import { useState, useEffect } from 'react'
import { indiaGovApi, dataUtils, apiWrapper } from '../lib/api'
import { databaseService } from '../lib/database'
import { isSupabaseConfigured } from '../lib/supabase'
import { isGeminiConfigured } from '../lib/gemini'
import AIInsights from '../components/AIInsights'
import { 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Building2,
  DollarSign,
  BarChart3,
  Package,
  Globe,
  Award,
  AlertCircle,
  RefreshCw,
  Database,
  Wifi,
  WifiOff,
  Brain,
  Sparkles,
  ChevronDown,
  Star
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const DrugDirectory = () => {
  const [drugs, setDrugs] = useState([])
  const [filteredDrugs, setFilteredDrugs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDrug, setSelectedDrug] = useState(null)
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [dataStatus, setDataStatus] = useState('loading')
  const [dataSource, setDataSource] = useState('unknown')

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        setDataStatus('loading')
        
        // Check if we're using database or mock data
        const isDbConfigured = isSupabaseConfigured()
        setDataSource(isDbConfigured ? 'database' : 'mock')
        
        const result = await apiWrapper.safeApiCall(() => indiaGovApi.getDrugPrices())
        
        if (result.success) {
          setDrugs(result.data.data || result.data)
          setFilteredDrugs(result.data.data || result.data)
          setDataStatus('success')
        } else {
          setDataStatus('error')
          console.error('Failed to fetch drug data:', result.error)
        }
      } catch (error) {
        console.error('Error fetching drugs:', error)
        setDataStatus('error')
      } finally {
        setLoading(false)
      }
    }

    fetchDrugs()
  }, [])

  useEffect(() => {
    let filtered = [...drugs]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(drug =>
        drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drug.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drug.genericName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(drug =>
        drug.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // Sorting
    filtered.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredDrugs(filtered)
  }, [searchTerm, selectedCategory, drugs, sortBy, sortOrder])

  const categories = ['all', ...new Set(drugs.map(drug => drug.category))]

  const formatCurrency = (amount) => {
    return dataUtils.formatCurrency(amount)
  }

  const getPriceChange = (drug) => {
    const change = ((drug.currentPrice - drug.launchPrice) / drug.launchPrice) * 100
    return {
      percentage: change.toFixed(1),
      isPositive: change > 0
    }
  }

  const getMarketTrend = (drug) => {
    if (!drug.priceHistory || drug.priceHistory.length < 2) return 'stable'
    
    const recentPrices = drug.priceHistory.slice(-3)
    const trend = recentPrices[recentPrices.length - 1].price - recentPrices[0].price
    if (trend > 0.1) return 'rising'
    if (trend < -0.1) return 'falling'
    return 'stable'
  }

  const refreshData = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
    window.location.reload()
  }

  const DrugCard = ({ drug }) => {
    const priceChange = getPriceChange(drug)
    const trend = getMarketTrend(drug)
    
    return (
      <div className="card-modern p-6 group hover:scale-105 transition-all duration-300">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-slate-900">{drug.name}</h3>
              {drug.marketShare > 15 && (
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
              )}
            </div>
            <p className="text-sm text-slate-600 mb-2">{drug.genericName}</p>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Building2 className="w-4 h-4" />
              <span>{drug.manufacturer}</span>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className={`status-badge ${
              drug.category === 'Analgesic' ? 'status-info' :
              drug.category === 'Cardiovascular' ? 'status-error' :
              drug.category === 'Antidiabetic' ? 'status-warning' :
              'status-success'
            }`}>
              {drug.category}
            </div>
            <div className={`status-badge ${
              trend === 'rising' ? 'status-error' :
              trend === 'falling' ? 'status-success' :
              'status-info'
            }`}>
              {trend}
            </div>
            {isGeminiConfigured() && (
              <div className="status-badge" style={{ background: 'rgba(147, 51, 234, 0.1)', color: '#7c3aed', border: '1px solid rgba(147, 51, 234, 0.2)' }}>
                <Brain className="w-3 h-3 mr-1" />
                AI
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="text-center">
            <p className="text-sm text-slate-600 mb-1">Current Price</p>
            <p className="text-2xl font-bold text-slate-900">
              {formatCurrency(drug.currentPrice)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-600 mb-1">Market Share</p>
            <p className="text-2xl font-bold text-slate-900">
              {drug.marketShare}%
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            {priceChange.isPositive ? (
              <TrendingUp className="w-5 h-5 text-red-500" />
            ) : (
              <TrendingDown className="w-5 h-5 text-green-500" />
            )}
            <span className={`text-sm font-semibold ${
              priceChange.isPositive ? 'text-red-600' : 'text-green-600'
            }`}>
              {priceChange.isPositive ? '+' : ''}{priceChange.percentage}%
            </span>
            <span className="text-xs text-slate-500">since launch</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Package className="w-4 h-4" />
            <span>{drug.monthlyVolume?.toLocaleString() || 'N/A'}/mo</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6 text-sm text-slate-600">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Approved: {new Date(drug.approvalDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span>{drug.exportMarkets?.length || 0} markets</span>
          </div>
        </div>

        <button
          onClick={() => setSelectedDrug(drug)}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 font-medium"
        >
          <BarChart3 className="w-4 h-4" />
          <span>View Detailed Analysis</span>
        </button>
      </div>
    )
  }

  const DrugModal = ({ drug, onClose }) => {
    if (!drug) return null

    const combinedData = [
      ...(drug.priceHistory || []).map(item => ({ ...item, type: 'historical' })),
      ...(drug.predictedPrices || []).map(item => ({ ...item, type: 'predicted' }))
    ]

    const competitorData = (drug.competitorAnalysis || []).map(comp => ({
      name: comp.company,
      marketShare: comp.marketShare,
      price: comp.price
    }))

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="card-premium max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-slate-200/50">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">{drug.name}</h2>
                <p className="text-slate-600 text-lg">{drug.genericName}</p>
                <p className="text-sm text-slate-500">{drug.manufacturer} • {drug.dosageForm} {drug.strength}</p>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="metric-card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-slate-900">Current Price</span>
                </div>
                <p className="text-3xl font-bold text-slate-900 mb-2">
                  {formatCurrency(drug.currentPrice)}
                </p>
                <p className="text-sm text-slate-600">MRP: {formatCurrency(drug.mrp || 0)}</p>
              </div>
              
              <div className="metric-card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-slate-900">Market Share</span>
                </div>
                <p className="text-3xl font-bold text-slate-900 mb-2">
                  {drug.marketShare}%
                </p>
                <p className="text-sm text-slate-600">Monthly: {drug.monthlyVolume?.toLocaleString() || 'N/A'}</p>
              </div>
              
              <div className="metric-card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-slate-900">Predicted (2025)</span>
                </div>
                <p className="text-3xl font-bold text-slate-900 mb-2">
                  {formatCurrency(drug.predictedPrices?.[0]?.price || 0)}
                </p>
                <p className="text-sm text-slate-600">
                  Confidence: {((drug.predictedPrices?.[0]?.confidence || 0) * 100).toFixed(0)}%
                </p>
              </div>

              <div className="metric-card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-slate-900">Export Markets</span>
                </div>
                <p className="text-3xl font-bold text-slate-900 mb-2">
                  {drug.exportMarkets?.length || 0}
                </p>
                <p className="text-sm text-slate-600">Countries</p>
              </div>
            </div>

            {/* AI Insights Section */}
            {isGeminiConfigured() && (
              <div className="mb-8">
                <div className="card-modern p-6">
                  <AIInsights drug={drug} type="drug" />
                </div>
              </div>
            )}

            {combinedData.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Price Trend Chart */}
                <div className="chart-container">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Price Trend Analysis</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={combinedData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip 
                          formatter={(value, name) => [formatCurrency(value), 'Price']}
                          labelFormatter={(label) => `Date: ${label}`}
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="price" 
                          stroke="url(#priceGradient)" 
                          strokeWidth={3}
                          dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                          strokeDasharray={(entry) => entry?.type === 'predicted' ? '5 5' : '0'}
                        />
                        <defs>
                          <linearGradient id="priceGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                          </linearGradient>
                        </defs>
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Competitor Analysis */}
                {competitorData.length > 0 && (
                  <div className="chart-container">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Competitor Analysis</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={competitorData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                          <YAxis stroke="#64748b" fontSize={12} />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: 'white',
                              border: '1px solid #e2e8f0',
                              borderRadius: '12px',
                              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                            }}
                          />
                          <Bar dataKey="marketShare" fill="url(#barGradient)" radius={[4, 4, 0, 0]} name="Market Share %" />
                          <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#3b82f6" />
                              <stop offset="100%" stopColor="#1d4ed8" />
                            </linearGradient>
                          </defs>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Drug Information */}
              <div className="card-modern p-6">
                <h4 className="font-semibold text-slate-900 mb-4">Drug Information</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Therapeutic Class:</span>
                    <span className="font-medium text-slate-900">{drug.therapeuticClass || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Dosage Form:</span>
                    <span className="font-medium text-slate-900">{drug.dosageForm || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Strength:</span>
                    <span className="font-medium text-slate-900">{drug.strength || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Pack Size:</span>
                    <span className="font-medium text-slate-900">{drug.packSize || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Patent Status:</span>
                    <span className="font-medium text-slate-900">{drug.patentStatus || 'N/A'}</span>
                  </div>
                </div>
              </div>
              
              {/* Pricing Details */}
              <div className="card-modern p-6">
                <h4 className="font-semibold text-slate-900 mb-4">Pricing Structure</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">MRP:</span>
                    <span className="font-medium text-slate-900">{formatCurrency(drug.mrp || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Retail Price:</span>
                    <span className="font-medium text-slate-900">{formatCurrency(drug.retailPrice || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Wholesale Price:</span>
                    <span className="font-medium text-slate-900">{formatCurrency(drug.wholesalePrice || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Manufacturing Cost:</span>
                    <span className="font-medium text-slate-900">{formatCurrency(drug.manufacturingCost || 0)}</span>
                  </div>
                  {drug.retailPrice && drug.manufacturingCost && (
                    <div className="flex justify-between pt-2 border-t border-slate-200">
                      <span className="text-slate-600">Margin:</span>
                      <span className="font-medium text-green-600">
                        {(((drug.retailPrice - drug.manufacturingCost) / drug.manufacturingCost) * 100).toFixed(1)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Export Markets */}
              <div className="card-modern p-6">
                <h4 className="font-semibold text-slate-900 mb-4">Export Markets</h4>
                <div className="space-y-3">
                  {(drug.exportMarkets || []).map((market, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Globe className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-slate-900">{market}</span>
                    </div>
                  ))}
                  {(!drug.exportMarkets || drug.exportMarkets.length === 0) && (
                    <p className="text-sm text-slate-500">No export data available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Database className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Loading Drug Directory</h2>
          <p className="text-slate-600 mb-4">Fetching comprehensive pharmaceutical data...</p>
          <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <p className="text-sm text-slate-500 mt-4">
            {isSupabaseConfigured() ? 'Fetching from database...' : 'Loading demo data...'}
          </p>
        </div>
      </div>
    )
  }

  if (dataStatus === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Data Loading Error</h2>
          <p className="text-slate-600 mb-6">Unable to fetch drug data. Please try again.</p>
          <button
            onClick={refreshData}
            className="btn-primary flex items-center space-x-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in-up">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-3">Drug Directory</h1>
              <p className="text-xl text-slate-600">
                Comprehensive database with AI-powered price predictions and market analysis
              </p>
            </div>
            <button
              onClick={refreshData}
              className="btn-secondary flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh Data</span>
            </button>
          </div>
          
          {/* Data Source Badges */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full text-sm text-blue-800">
              <Award className="w-4 h-4" />
              <span>Data from Indian Government Sources & WHO Global Health Observatory</span>
            </div>
            
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm border ${
              dataSource === 'database' 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-yellow-50 border-yellow-200 text-yellow-800'
            }`}>
              {dataSource === 'database' ? (
                <>
                  <Database className="w-4 h-4" />
                  <span>Live Database</span>
                </>
              ) : (
                <>
                  <Wifi className="w-4 h-4" />
                  <span>Demo Data</span>
                </>
              )}
            </div>

            {isGeminiConfigured() && (
              <div className="inline-flex items-center space-x-2 bg-purple-50 border border-purple-200 px-4 py-2 rounded-full text-sm text-purple-800">
                <Brain className="w-4 h-4" />
                <span>AI Insights Available</span>
              </div>
            )}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="card-modern p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search drugs, manufacturers, or generic names..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input w-full pl-12 pr-4 py-3 text-lg"
                />
              </div>
            </div>
            
            <div className="lg:w-56">
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="form-select w-full pl-12 pr-4 py-3"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="lg:w-56">
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-')
                  setSortBy(field)
                  setSortOrder(order)
                }}
                className="form-select w-full px-4 py-3"
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="currentPrice-asc">Price (Low-High)</option>
                <option value="currentPrice-desc">Price (High-Low)</option>
                <option value="marketShare-desc">Market Share (High-Low)</option>
                <option value="monthlyVolume-desc">Volume (High-Low)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-8 flex justify-between items-center">
          <p className="text-slate-600 text-lg">
            Showing <span className="font-semibold text-slate-900">{filteredDrugs.length}</span> of <span className="font-semibold text-slate-900">{drugs.length}</span> drugs
          </p>
          <div className="text-sm text-slate-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Drug Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
          {filteredDrugs.map(drug => (
            <DrugCard key={drug.id} drug={drug} />
          ))}
        </div>

        {filteredDrugs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No drugs found</h3>
            <p className="text-slate-500 text-lg mb-6">Try adjusting your search or filter options.</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Drug Detail Modal */}
        {selectedDrug && (
          <DrugModal 
            drug={selectedDrug} 
            onClose={() => setSelectedDrug(null)} 
          />
        )}
      </div>
    </div>
  )
}

export default DrugDirectory