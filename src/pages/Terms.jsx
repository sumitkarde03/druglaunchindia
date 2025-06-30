import { FileText, Scale, Shield, AlertTriangle, CheckCircle, Globe } from 'lucide-react'

const Terms = () => {
  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: CheckCircle,
      content: [
        {
          text: 'By accessing and using DrugLaunchIndia ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
        },
        {
          text: 'These Terms of Use constitute a legally binding agreement between you and DrugLaunchIndia regarding your use of the Platform and all related services.'
        }
      ]
    },
    {
      id: 'services',
      title: 'Description of Services',
      icon: FileText,
      content: [
        {
          subtitle: 'Platform Services',
          text: 'DrugLaunchIndia provides pharmaceutical investment intelligence services including drug price predictions, market analysis, regulatory insights, and investment opportunities in India\'s pharmaceutical sector.'
        },
        {
          subtitle: 'Data Sources',
          text: 'Our platform integrates data from WHO Global Health Observatory, Indian Open Government Data Platform, and other official sources to provide comprehensive market intelligence.'
        },
        {
          subtitle: 'AI-Powered Analytics',
          text: 'We use artificial intelligence and machine learning algorithms to analyze market trends and predict future drug prices. While we strive for accuracy, predictions are estimates based on available data.'
        }
      ]
    },
    {
      id: 'user-obligations',
      title: 'User Obligations and Restrictions',
      icon: Scale,
      content: [
        {
          subtitle: 'Account Responsibility',
          text: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use.'
        },
        {
          subtitle: 'Prohibited Uses',
          text: 'You may not use the Platform for any illegal purposes, to transmit harmful content, to interfere with the Platform\'s operation, or to attempt unauthorized access to our systems.'
        },
        {
          subtitle: 'Data Usage',
          text: 'You may use the data and insights provided by the Platform for your own investment analysis and decision-making. You may not redistribute, resell, or share access to the Platform without our written consent.'
        }
      ]
    },
    {
      id: 'disclaimers',
      title: 'Disclaimers and Limitations',
      icon: AlertTriangle,
      content: [
        {
          subtitle: 'Investment Disclaimer',
          text: 'The information provided on this Platform is for informational purposes only and does not constitute investment advice, financial advice, or recommendations. You should consult with qualified professionals before making investment decisions.'
        },
        {
          subtitle: 'Data Accuracy',
          text: 'While we strive to provide accurate and up-to-date information, we do not guarantee the accuracy, completeness, or timeliness of any data or predictions provided through the Platform.'
        },
        {
          subtitle: 'Market Risks',
          text: 'Pharmaceutical investments involve significant risks, including regulatory changes, market volatility, and competitive pressures. Past performance does not guarantee future results.'
        },
        {
          subtitle: 'Limitation of Liability',
          text: 'DrugLaunchIndia shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of the Platform or reliance on the information provided.'
        }
      ]
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property Rights',
      icon: Shield,
      content: [
        {
          subtitle: 'Platform Content',
          text: 'All content, features, and functionality of the Platform, including but not limited to text, graphics, logos, software, and data compilations, are owned by DrugLaunchIndia and protected by copyright and other intellectual property laws.'
        },
        {
          subtitle: 'User License',
          text: 'We grant you a limited, non-exclusive, non-transferable license to access and use the Platform for your personal or business use in accordance with these Terms.'
        },
        {
          subtitle: 'Restrictions',
          text: 'You may not copy, modify, distribute, sell, or lease any part of the Platform or its content, nor may you reverse engineer or attempt to extract the source code of our software.'
        }
      ]
    },
    {
      id: 'privacy-data',
      title: 'Privacy and Data Protection',
      icon: Globe,
      content: [
        {
          subtitle: 'Privacy Policy',
          text: 'Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information when you use the Platform.'
        },
        {
          subtitle: 'Data Security',
          text: 'We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.'
        },
        {
          subtitle: 'Compliance',
          text: 'We comply with applicable data protection laws and regulations, including GDPR where applicable, and provide you with rights regarding your personal data.'
        }
      ]
    }
  ]

  const additionalTerms = [
    {
      title: 'Subscription and Payment Terms',
      items: [
        'Subscription fees are billed in advance and are non-refundable except as required by law',
        'We reserve the right to change subscription prices with 30 days\' notice',
        'Your subscription will automatically renew unless cancelled before the renewal date',
        'We may suspend or terminate your account for non-payment of fees'
      ]
    },
    {
      title: 'Termination',
      items: [
        'You may terminate your account at any time by contacting us or through your account settings',
        'We may terminate or suspend your access immediately for violation of these Terms',
        'Upon termination, your right to use the Platform ceases immediately',
        'Provisions regarding disclaimers, limitations of liability, and intellectual property survive termination'
      ]
    },
    {
      title: 'Governing Law and Jurisdiction',
      items: [
        'These Terms are governed by the laws of India without regard to conflict of law principles',
        'Any disputes arising from these Terms or your use of the Platform shall be subject to the exclusive jurisdiction of courts in New Delhi, India',
        'If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
                <Scale className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
              Terms of Use
            </h1>
            <p className="text-xl text-primary-700 max-w-3xl mx-auto">
              Please read these terms carefully before using our pharmaceutical investment intelligence platform.
            </p>
            <p className="text-sm text-primary-600 mt-4">
              Last updated: January 15, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to DrugLaunchIndia. These Terms of Use ("Terms") govern your use of our pharmaceutical investment 
              intelligence platform and services. By accessing or using our platform, you agree to be bound by these Terms.
            </p>
            <p className="text-gray-700 leading-relaxed">
              These Terms constitute a legal agreement between you and DrugLaunchIndia. If you do not agree to these Terms, 
              you may not access or use our services.
            </p>
          </div>
        </div>
      </section>

      {/* Main Sections */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <div key={section.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary-600" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-6">
                      {section.content.map((item, index) => (
                        <div key={index}>
                          {item.subtitle && (
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {item.subtitle}
                            </h3>
                          )}
                          <p className="text-gray-700 leading-relaxed">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Terms */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Additional Terms and Conditions</h2>
          
          <div className="space-y-8">
            {additionalTerms.map((section, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-16 bg-yellow-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-8 border-l-4 border-yellow-400">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Investment Disclaimer</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>This platform provides information for educational and research purposes only.</strong> 
                  The content, including price predictions and market analysis, should not be considered as investment advice, 
                  financial advice, or recommendations to buy or sell any securities or investments.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Pharmaceutical investments carry significant risks, including but not limited to regulatory changes, 
                  market volatility, competitive pressures, and technological disruptions. Always consult with qualified 
                  financial advisors and conduct your own due diligence before making any investment decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Questions About These Terms?</h2>
          <p className="text-primary-100 mb-6">
            If you have any questions about these Terms of Use, please contact us:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Email</h3>
              <p className="text-primary-100">legal@druglaunchindia.com</p>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Address</h3>
              <p className="text-primary-100">
                Legal Department<br />
                DrugLaunchIndia<br />
                Gurgaon, Haryana, India
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Terms