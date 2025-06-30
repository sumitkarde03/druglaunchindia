import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      })
    }, 3000)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'contact@druglaunchindia.com',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+91 11 4567 8900',
      description: 'Mon-Fri from 9am to 6pm IST'
    },
    {
      icon: MapPin,
      title: 'Office',
      details: 'Gurgaon, Haryana, India',
      description: 'Visit our headquarters'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: '9:00 AM - 6:00 PM IST',
      description: 'Monday to Friday'
    }
  ]

  const offices = [
    {
      city: 'New Delhi',
      address: 'Connaught Place, New Delhi 110001',
      phone: '+91 11 4567 8900',
      email: 'delhi@druglaunchindia.com'
    },
    {
      city: 'Mumbai',
      address: 'Bandra Kurla Complex, Mumbai 400051',
      phone: '+91 22 4567 8900',
      email: 'mumbai@druglaunchindia.com'
    },
    {
      city: 'Bangalore',
      address: 'Electronic City, Bangalore 560100',
      phone: '+91 80 4567 8900',
      email: 'bangalore@druglaunchindia.com'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-primary-700 max-w-3xl mx-auto">
              Ready to explore investment opportunities in India's pharmaceutical market? 
              Our team of experts is here to help you make informed decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="your.email@company.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Your company name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select a subject</option>
                      <option value="investment-inquiry">Investment Inquiry</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="data-access">Data Access Request</option>
                      <option value="technical-support">Technical Support</option>
                      <option value="media-inquiry">Media Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Tell us about your investment interests, questions, or how we can help you..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 text-white py-3 px-6 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon
                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{info.title}</h3>
                          <p className="text-primary-600 font-medium">{info.details}</p>
                          <p className="text-gray-600 text-sm">{info.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Office Locations */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Offices</h3>
                <div className="space-y-4">
                  {offices.map((office, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2">{office.city}</h4>
                      <p className="text-gray-600 text-sm mb-1">{office.address}</p>
                      <p className="text-gray-600 text-sm mb-1">{office.phone}</p>
                      <p className="text-primary-600 text-sm">{office.email}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions about our services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How accurate are your price predictions?</h3>
                <p className="text-gray-600">Our AI models achieve 95% accuracy for 6-month price forecasts, based on historical validation and real-time market data.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What data sources do you use?</h3>
                <p className="text-gray-600">We integrate data from WHO Global Health Observatory, Indian Open Government Data Platform, and other official regulatory sources.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Do you provide investment advice?</h3>
                <p className="text-gray-600">We provide market intelligence and data analysis. For investment advice, please consult with qualified financial advisors.</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How often is data updated?</h3>
                <p className="text-gray-600">Our platform updates data in real-time from API sources, with price predictions refreshed daily.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Can I access historical data?</h3>
                <p className="text-gray-600">Yes, we provide comprehensive historical data going back 5+ years for most pharmaceutical products.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Do you offer custom research?</h3>
                <p className="text-gray-600">We provide custom market research and analysis for specific pharmaceutical sectors or investment opportunities.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact