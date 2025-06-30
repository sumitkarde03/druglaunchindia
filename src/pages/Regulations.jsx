import { useState, useEffect } from 'react'
import { indiaGovApi } from '../lib/api'
import { isGeminiConfigured } from '../lib/gemini'
import AIInsights from '../components/AIInsights'
import { FileText, ExternalLink, Scale, Building2, Globe, Shield, Brain } from 'lucide-react'

const Regulations = () => {
  const [regulations, setRegulations] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('pricing')
  const [selectedRegulation, setSelectedRegulation] = useState(null)

  useEffect(() => {
    const fetchRegulations = async () => {
      try {
        const data = await indiaGovApi.getRegulatoryInfo()
        setRegulations(data.data)
      } catch (error) {
        console.error('Error fetching regulations:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRegulations()
  }, [])

  const tabs = [
    { id: 'pricing', name: 'Pricing', icon: Scale },
    { id: 'investment', name: 'Investment', icon: Building2 },
    { id: 'regulatory', name: 'Regulatory', icon: Shield },
    { id: 'international', name: 'International', icon: Globe },
  ]

  const getRegulationsByCategory = (category) => {
    return regulations.filter(reg => reg.category.toLowerCase() === category.toLowerCase())
  }

  const regulatoryContent = {
    pricing: {
      title: 'Drug Pricing Regulations',
      description: 'Comprehensive overview of India\'s drug pricing policies and regulations affecting pharmaceutical investments.',
      content: [
        {
          title: 'Drug Price Control Order (DPCO) 2013',
          description: 'The DPCO 2013 is the primary legislation governing drug pricing in India. It regulates the prices of essential medicines listed in the National List of Essential Medicines (NLEM).',
          keyPoints: [
            'Covers 348+ essential medicines under price control',
            'Ceiling prices calculated based on simple average of all brands with market share ≥1%',
            'Annual price increase limited to Wholesale Price Index (WPI)',
            'Non-scheduled drugs can increase prices by up to 10% annually'
          ]
        },
        {
          title: 'National Pharmaceutical Pricing Authority (NPPA)',
          description: 'NPPA is the regulatory body responsible for monitoring and controlling drug prices in India.',
          keyPoints: [
            'Monitors prices of controlled and decontrolled drugs',
            'Has power to fix ceiling prices for essential medicines',
            'Conducts market-based pricing for patented drugs',
            'Ensures availability and accessibility of medicines'
          ]
        }
      ]
    },
    investment: {
      title: 'Foreign Investment Policies',
      description: 'Guidelines and regulations for foreign direct investment in India\'s pharmaceutical sector.',
      content: [
        {
          title: 'FDI Policy for Pharmaceuticals',
          description: '100% FDI is allowed in the pharmaceutical sector under the automatic route, making it attractive for foreign investors.',
          keyPoints: [
            '100% FDI allowed under automatic route',
            'No prior government approval required',
            'Greenfield and brownfield investments permitted',
            'Manufacturing and R&D activities encouraged'
          ]
        },
        {
          title: 'Production Linked Incentive (PLI) Scheme',
          description: 'Government incentive scheme to boost domestic manufacturing and attract investments.',
          keyPoints: [
            'INR 15,000 crore allocated for pharmaceutical PLI',
            'Incentives for bulk drugs and medical devices',
            '4-6% incentive on incremental sales',
            'Focus on import substitution and export promotion'
          ]
        }
      ]
    },
    regulatory: {
      title: 'Regulatory Framework',
      description: 'Key regulatory bodies and approval processes for pharmaceutical products in India.',
      content: [
        {
          title: 'Central Drugs Standard Control Organization (CDSCO)',
          description: 'India\'s national regulatory authority for pharmaceuticals and medical devices.',
          keyPoints: [
            'Approves new drugs and clinical trials',
            'Regulates drug imports and exports',
            'Ensures drug safety and efficacy',
            'Issues manufacturing licenses'
          ]
        },
        {
          title: 'Drug Approval Process',
          description: 'Streamlined approval process for faster market entry of pharmaceutical products.',
          keyPoints: [
            'Online application system through SUGAM portal',
            'Risk-based approach for drug approvals',
            'Fast-track approval for orphan drugs',
            'Mutual recognition agreements with international regulators'
          ]
        }
      ]
    },
    international: {
      title: 'International Compliance',
      description: 'International standards and agreements affecting pharmaceutical trade and investment.',
      content: [
        {
          title: 'WHO-GMP Compliance',
          description: 'Indian pharmaceutical manufacturers must comply with WHO Good Manufacturing Practices.',
          keyPoints: [
            'Mandatory for export-oriented units',
            'Regular inspections and audits',
            'Quality assurance standards',
            'International market access'
          ]
        },
        {
          title: 'TRIPS Agreement Compliance',
          description: 'India\'s compliance with international intellectual property regulations.',
          keyPoints: [
            'Patent protection for pharmaceutical products',
            'Data exclusivity provisions',
            'Compulsory licensing provisions',
            'Balance between innovation and access'
          ]
        }
      ]
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Rules & Regulations</h1>
          <p className="text-lg text-gray-600">
            Comprehensive guide to pharmaceutical regulations, investment policies, and compliance requirements in India
          </p>
          
          {isGeminiConfigured() && (
            <div className="mt-4 inline-flex items-center space-x-2 bg-purple-50 px-3 py-1 rounded-full text-sm text-purple-800">
              <Brain className="w-4 h-4" />
              <span>AI-powered regulatory analysis available</span>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {regulatoryContent[activeTab].title}
              </h2>
              <p className="text-gray-600">
                {regulatoryContent[activeTab].description}
              </p>
            </div>

            <div className="space-y-8">
              {regulatoryContent[activeTab].content.map((section, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {section.title}
                      </h3>
                      <p className="text-gray-700 mb-4">
                        {section.description}
                      </p>
                    </div>
                    
                    {isGeminiConfigured() && (
                      <button
                        onClick={() => setSelectedRegulation({
                          title: section.title,
                          description: section.description,
                          category: activeTab,
                          impact_level: 'High'
                        })}
                        className="ml-4 flex items-center space-x-2 bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 transition-colors text-sm"
                      >
                        <Brain className="w-4 h-4" />
                        <span>AI Analysis</span>
                      </button>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Key Points:</h4>
                    <ul className="space-y-2">
                      {section.keyPoints.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights Modal */}
        {selectedRegulation && isGeminiConfigured() && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-gray-900">AI Regulatory Analysis</h2>
                  <button
                    onClick={() => setSelectedRegulation(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <AIInsights 
                  type="regulatory" 
                  data={selectedRegulation} 
                />
              </div>
            </div>
          </div>
        )}

        {/* Official Resources */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Official Resources</h2>
            <p className="text-gray-600 mt-1">
              Direct links to official government documents and regulatory bodies
            </p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regulations.map((regulation, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <FileText className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {regulation.title}
                        </h3>
                        {isGeminiConfigured() && (
                          <button
                            onClick={() => setSelectedRegulation(regulation)}
                            className="ml-2 text-purple-600 hover:text-purple-700"
                          >
                            <Brain className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {regulation.description}
                      </p>
                      <a
                        href={regulation.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        <span>View Document</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-2">Important Disclaimer</h3>
              <p className="text-yellow-800 text-sm">
                This information is provided for general guidance only and should not be considered as legal or regulatory advice. 
                Always consult with qualified legal and regulatory experts before making investment decisions. 
                Regulations may change frequently, and it's important to verify the latest requirements with official sources.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Regulations