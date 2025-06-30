import { useState } from 'react'
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react'

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [openItems, setOpenItems] = useState(new Set([0])) // First item open by default
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'platform', name: 'Platform' },
    { id: 'data', name: 'Data & Analytics' },
    { id: 'investment', name: 'Investment' },
    { id: 'pricing', name: 'Pricing' },
    { id: 'technical', name: 'Technical' },
    { id: 'regulatory', name: 'Regulatory' }
  ]

  const faqs = [
    {
      id: 0,
      category: 'platform',
      question: 'What is PharmaInvest and how does it work?',
      answer: 'PharmaInvest is a comprehensive platform that provides data-driven insights for pharmaceutical investments in India. We use AI-powered analytics to predict drug prices, analyze market trends, and provide regulatory intelligence to help foreign investors make informed decisions in India\'s pharmaceutical sector.'
    },
    {
      id: 1,
      category: 'data',
      question: 'How accurate are your price predictions?',
      answer: 'Our machine learning models achieve 95% accuracy for 6-month price forecasts and 87% accuracy for 12-month predictions. These accuracy rates are based on historical validation using 5+ years of market data and continuous model refinement.'
    },
    {
      id: 2,
      category: 'data',
      question: 'What data sources do you use?',
      answer: 'We integrate data from multiple authoritative sources including WHO Global Health Observatory API, Indian Open Government Data Platform (data.gov.in), Central Drugs Standard Control Organization (CDSCO), and National Pharmaceutical Pricing Authority (NPPA). All data is verified and updated in real-time.'
    },
    {
      id: 3,
      category: 'investment',
      question: 'Do you provide investment advice?',
      answer: 'We provide market intelligence, data analysis, and insights to support investment decisions. However, we do not provide direct investment advice. We recommend consulting with qualified financial advisors and conducting your own due diligence before making investment decisions.'
    },
    {
      id: 4,
      category: 'platform',
      question: 'How often is the data updated?',
      answer: 'Our platform updates data continuously through real-time API connections. Price data is refreshed every 4 hours, regulatory information is updated daily, and our AI models generate new predictions every 24 hours to ensure you have the most current insights.'
    },
    {
      id: 5,
      category: 'pricing',
      question: 'What are your subscription plans?',
      answer: 'We offer flexible subscription plans: Basic (free with limited access), Professional ($99/month for individual investors), and Enterprise (custom pricing for institutions). Each plan includes different levels of data access, prediction accuracy, and support services.'
    },
    {
      id: 6,
      category: 'technical',
      question: 'Can I access your data through an API?',
      answer: 'Yes, we provide RESTful APIs for Professional and Enterprise subscribers. Our API allows you to integrate our data and predictions into your own systems, with comprehensive documentation and SDKs available for popular programming languages.'
    },
    {
      id: 7,
      category: 'regulatory',
      question: 'How do you track regulatory changes?',
      answer: 'We monitor regulatory changes through automated systems that track official government websites, regulatory body announcements, and policy updates. Our team of regulatory experts reviews and analyzes these changes to assess their impact on drug pricing and market dynamics.'
    },
    {
      id: 8,
      category: 'investment',
      question: 'What types of investment opportunities do you cover?',
      answer: 'We cover various pharmaceutical investment opportunities including generic drugs, branded formulations, biosimilars, medical devices, and pharmaceutical manufacturing. Our analysis includes market size, growth potential, competitive landscape, and regulatory requirements.'
    },
    {
      id: 9,
      category: 'data',
      question: 'Can I access historical data?',
      answer: 'Yes, we provide comprehensive historical data going back 5+ years for most pharmaceutical products. This includes price history, regulatory milestones, market share data, and competitive analysis to help you understand long-term trends and patterns.'
    },
    {
      id: 10,
      category: 'platform',
      question: 'Is my data secure on your platform?',
      answer: 'Absolutely. We use enterprise-grade security measures including SSL encryption, secure data centers, regular security audits, and compliance with international data protection standards. Your personal and business information is never shared with third parties.'
    },
    {
      id: 11,
      category: 'technical',
      question: 'What browsers and devices are supported?',
      answer: 'Our platform is optimized for all modern browsers (Chrome, Firefox, Safari, Edge) and is fully responsive for desktop, tablet, and mobile devices. We also offer native mobile apps for iOS and Android for on-the-go access.'
    },
    {
      id: 12,
      category: 'investment',
      question: 'Do you provide market research reports?',
      answer: 'Yes, we offer comprehensive market research reports covering specific therapeutic areas, competitive analysis, regulatory landscape, and investment opportunities. Custom research reports are available for Enterprise subscribers.'
    },
    {
      id: 13,
      category: 'regulatory',
      question: 'How do Indian regulations affect foreign investors?',
      answer: 'India allows 100% FDI in pharmaceuticals under the automatic route, making it attractive for foreign investors. However, investors must comply with local regulations including DPCO pricing controls, environmental clearances, and quality standards. We provide detailed regulatory guidance for each investment opportunity.'
    },
    {
      id: 14,
      category: 'pricing',
      question: 'Do you offer free trials?',
      answer: 'Yes, we offer a 14-day free trial of our Professional plan, giving you full access to our platform features, data, and predictions. No credit card required for the trial, and you can upgrade or cancel anytime.'
    }
  ]

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-primary-700 max-w-3xl mx-auto">
              Find answers to common questions about our platform, data sources, and investment insights
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="md:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {filteredFaqs.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500 text-lg">No questions found matching your search criteria.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredFaqs.map((faq, index) => (
                  <div key={faq.id} className="p-6">
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full flex justify-between items-start text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md"
                    >
                      <div className="flex-1 pr-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {faq.question}
                        </h3>
                        <span className="inline-block px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full capitalize">
                          {faq.category}
                        </span>
                      </div>
                      <div className="flex-shrink-0">
                        {openItems.has(faq.id) ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </button>
                    
                    {openItems.has(faq.id) && (
                      <div className="mt-4 pr-8">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Our team is here to help you with any additional questions about pharmaceutical investments in India
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="mailto:support@pharmainvest.com"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FAQ