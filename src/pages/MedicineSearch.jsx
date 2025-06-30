import { useState } from 'react'
import { geminiService, isGeminiConfigured } from '../lib/gemini'
import { 
  Search, 
  Brain, 
  Loader2, 
  AlertCircle, 
  TrendingUp, 
  DollarSign, 
  Building2, 
  Globe, 
  Calendar,
  Package,
  Star,
  Sparkles,
  ChevronRight,
  BarChart3,
  Shield,
  Target,
  Lightbulb,
  Pill,
  Activity,
  Users,
  FileText
} from 'lucide-react'

const MedicineSearch = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [aiInsights, setAiInsights] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const searchMedicine = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a medicine name to search')
      return
    }

    if (!isGeminiConfigured()) {
      setError('AI insights are not available. Gemini API is not configured.')
      return
    }

    setLoading(true)
    setError(null)
    setAiInsights(null)

    try {
      const result = await geminiService.searchMedicineInIndia(searchQuery.trim())
      
      if (result.success) {
        setAiInsights(result.data)
      } else {
        setError(result.error || 'Failed to get medicine information')
      }
    } catch (err) {
      setError('Error searching for medicine: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchMedicine()
    }
  }

  const parseAIInsights = (insights) => {
    if (!insights) return null

    // Split the insights into sections based on numbered points
    const sections = insights.split(/\d+\.\s+/).filter(section => section.trim())
    
    return {
      overview: sections[0] || '',
      marketInfo: sections[1] || '',
      pricing: sections[2] || '',
      availability: sections[3] || '',
      regulations: sections[4] || '',
      investment: sections[5] || ''
    }
  }

  const popularMedicines = [
    'Paracetamol', 'Aspirin', 'Ibuprofen', 'Metformin', 'Atorvastatin', 
    'Amlodipine', 'Omeprazole', 'Ciprofloxacin', 'Azithromycin', 'Insulin',
    'Losartan', 'Simvastatin', 'Pantoprazole', 'Clopidogrel', 'Ramipril'
  ]

  const parsedInsights = parseAIInsights(aiInsights)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full mb-6">
            <Brain className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">AI-Powered Medicine Search</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Search Any Medicine in India
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block">
              Get AI Insights
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Search for any pharmaceutical product available in India and get comprehensive AI-powered 
            analysis including market information, pricing, availability, and investment insights.
          </p>
        </div>

        {/* Search Section */}
        <div className="card-premium p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Enter any medicine name (e.g., Paracetamol, Insulin, Aspirin)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-14 pr-4 py-4 text-lg border border-slate-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white backdrop-blur-sm text-slate-900"
                  style={{ 
                    color: '#1e293b',
                    fontSize: '18px',
                    letterSpacing: '0.025em'
                  }}
                />
              </div>
            </div>
            
            <button
              onClick={searchMedicine}
              disabled={loading || !searchQuery.trim()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5" />
                  <span>Get AI Analysis</span>
                </>
              )}
            </button>
          </div>

          {/* Popular Medicine Suggestions */}
          <div className="mt-6">
            <p className="text-sm text-slate-600 mb-3">Popular medicines to search:</p>
            <div className="flex flex-wrap gap-2">
              {popularMedicines.map((medicine) => (
                <button
                  key={medicine}
                  onClick={() => {
                    setSearchQuery(medicine)
                  }}
                  className="px-3 py-1 bg-white/60 border border-slate-200 rounded-full text-sm text-slate-700 hover:bg-white hover:shadow-md transition-all duration-200"
                >
                  {medicine}
                </button>
              ))}
            </div>
          </div>

          {/* AI Configuration Status */}
          <div className="mt-4 flex items-center justify-center space-x-2 text-sm">
            {isGeminiConfigured() ? (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-700">AI Analysis Available</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-red-700">AI Analysis Not Available (Demo Mode)</span>
              </>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="card-premium p-12 text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Analyzing Medicine</h3>
            <p className="text-slate-600 mb-4">Our AI is gathering comprehensive information about "{searchQuery}"</p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}

        {/* AI Insights Results */}
        {aiInsights && !loading && (
          <div className="space-y-8">
            {/* Medicine Header */}
            <div className="card-premium p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <Pill className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">{searchQuery}</h2>
                  <div className="flex items-center space-x-2 mt-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-purple-700">AI-Generated Analysis</span>
                  </div>
                </div>
              </div>

              {/* Comprehensive AI Analysis */}
              <div className="prose prose-lg max-w-none">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                  <div className="whitespace-pre-line text-slate-700 leading-relaxed">
                    {aiInsights}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200">
                <div className="flex items-center space-x-2 text-sm text-slate-500">
                  <Brain className="w-4 h-4" />
                  <span>Powered by Google Gemini AI</span>
                  <span>•</span>
                  <span>Generated on {new Date().toLocaleDateString()}</span>
                </div>
                
                <button
                  onClick={searchMedicine}
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-1"
                >
                  <span>Regenerate Analysis</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card-modern p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Market Analysis</h3>
                <p className="text-sm text-slate-600">Comprehensive market position and competitive landscape</p>
              </div>
              
              <div className="card-modern p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Pricing Information</h3>
                <p className="text-sm text-slate-600">Current pricing trends and cost analysis</p>
              </div>
              
              <div className="card-modern p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Regulatory Status</h3>
                <p className="text-sm text-slate-600">Approval status and regulatory compliance</p>
              </div>
            </div>
          </div>
        )}

        {/* Getting Started Guide */}
        {!searchQuery && !aiInsights && !loading && (
          <div className="space-y-12">
            {/* How it Works */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">How It Works</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">1. Search Medicine</h3>
                  <p className="text-slate-600">Enter any medicine name available in India</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">2. AI Analysis</h3>
                  <p className="text-slate-600">Our AI analyzes market data and regulations</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">3. Get Insights</h3>
                  <p className="text-slate-600">Receive comprehensive market intelligence</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="card-premium p-12">
              <h2 className="text-3xl font-bold text-slate-900 text-center mb-8">What You'll Get</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Activity className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Market Overview</h4>
                  <p className="text-sm text-slate-600">Current market position and trends</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Pricing Analysis</h4>
                  <p className="text-sm text-slate-600">Cost structure and pricing trends</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Building2 className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Manufacturer Info</h4>
                  <p className="text-sm text-slate-600">Key manufacturers and suppliers</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Regulatory Status</h4>
                  <p className="text-sm text-slate-600">Approval and compliance information</p>
                </div>
              </div>
            </div>

            {/* Sample Searches */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Try These Popular Medicines</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {popularMedicines.slice(0, 10).map((medicine) => (
                  <button
                    key={medicine}
                    onClick={() => {
                      setSearchQuery(medicine)
                      searchMedicine()
                    }}
                    className="card-modern p-4 text-center hover:scale-105 transition-all duration-300"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Pill className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-900">{medicine}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MedicineSearch