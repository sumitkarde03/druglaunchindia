import { Shield, Eye, Lock, Users, FileText, Globe } from 'lucide-react'

const Privacy = () => {
  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: FileText,
      content: [
        {
          subtitle: 'Personal Information',
          text: 'We collect personal information you provide directly to us, such as when you create an account, subscribe to our services, or contact us. This includes your name, email address, company information, and payment details.'
        },
        {
          subtitle: 'Usage Data',
          text: 'We automatically collect information about how you use our platform, including pages visited, features used, search queries, and interaction patterns. This helps us improve our services and provide personalized experiences.'
        },
        {
          subtitle: 'Device Information',
          text: 'We collect information about the devices you use to access our platform, including IP address, browser type, operating system, and device identifiers.'
        }
      ]
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      icon: Eye,
      content: [
        {
          subtitle: 'Service Provision',
          text: 'We use your information to provide, maintain, and improve our pharmaceutical investment intelligence services, including price predictions, market analysis, and regulatory insights.'
        },
        {
          subtitle: 'Communication',
          text: 'We may use your contact information to send you service-related notifications, updates about new features, market insights, and promotional materials (which you can opt out of at any time).'
        },
        {
          subtitle: 'Analytics and Improvement',
          text: 'We analyze usage patterns to understand how our platform is used, identify areas for improvement, and develop new features that better serve our users.'
        }
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing and Disclosure',
      icon: Users,
      content: [
        {
          subtitle: 'Third-Party Service Providers',
          text: 'We may share your information with trusted third-party service providers who assist us in operating our platform, processing payments, or providing customer support. These providers are bound by confidentiality agreements.'
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose your information if required by law, regulation, or legal process, or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others.'
        },
        {
          subtitle: 'Business Transfers',
          text: 'In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction, subject to the same privacy protections.'
        }
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: Lock,
      content: [
        {
          subtitle: 'Security Measures',
          text: 'We implement industry-standard security measures to protect your personal information, including SSL encryption, secure data centers, regular security audits, and access controls.'
        },
        {
          subtitle: 'Data Retention',
          text: 'We retain your personal information only as long as necessary to provide our services and comply with legal obligations. You can request deletion of your account and associated data at any time.'
        },
        {
          subtitle: 'Breach Notification',
          text: 'In the unlikely event of a data breach that affects your personal information, we will notify you and relevant authorities as required by applicable laws.'
        }
      ]
    },
    {
      id: 'your-rights',
      title: 'Your Rights and Choices',
      icon: Shield,
      content: [
        {
          subtitle: 'Access and Correction',
          text: 'You have the right to access, update, or correct your personal information. You can do this through your account settings or by contacting us directly.'
        },
        {
          subtitle: 'Data Portability',
          text: 'You can request a copy of your personal data in a structured, machine-readable format, and you have the right to transmit this data to another service provider.'
        },
        {
          subtitle: 'Deletion',
          text: 'You can request deletion of your personal information, subject to certain legal and contractual obligations. We will respond to such requests within 30 days.'
        },
        {
          subtitle: 'Marketing Communications',
          text: 'You can opt out of marketing communications at any time by using the unsubscribe link in our emails or updating your preferences in your account settings.'
        }
      ]
    },
    {
      id: 'international-transfers',
      title: 'International Data Transfers',
      icon: Globe,
      content: [
        {
          subtitle: 'Cross-Border Processing',
          text: 'Your information may be processed and stored in countries other than your own. We ensure appropriate safeguards are in place to protect your data during international transfers.'
        },
        {
          subtitle: 'Adequacy Decisions',
          text: 'We rely on adequacy decisions by relevant authorities or implement appropriate safeguards such as standard contractual clauses to ensure your data is protected.'
        }
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
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-primary-700 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
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
              DrugLaunchIndia ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our pharmaceutical 
              investment intelligence platform.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By using our services, you agree to the collection and use of information in accordance with this policy. 
              If you do not agree with our policies and practices, please do not use our services.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
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
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {item.subtitle}
                          </h3>
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

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-50 rounded-lg p-8 border border-primary-200">
            <h2 className="text-2xl font-bold text-primary-900 mb-4">Contact Us About Privacy</h2>
            <p className="text-primary-800 mb-6">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-primary-900 mb-2">Email</h3>
                <p className="text-primary-700">privacy@druglaunchindia.com</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-primary-900 mb-2">Address</h3>
                <p className="text-primary-700">
                  Data Protection Officer<br />
                  DrugLaunchIndia<br />
                  Gurgaon, Haryana, India
                </p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-primary-200">
              <p className="text-sm text-primary-700">
                We will respond to your privacy-related inquiries within 30 days of receipt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Updates Notice */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Policy Updates</h3>
            <p className="text-gray-600">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy 
              periodically for any changes.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Privacy