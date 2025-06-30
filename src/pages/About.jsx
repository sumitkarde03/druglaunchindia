import { Users, Target, Award, Globe, TrendingUp, Shield } from 'lucide-react'

const About = () => {
  const team = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Chief Executive Officer',
      bio: 'Former pharmaceutical executive with 20+ years in drug development and market analysis.',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      name: 'Sarah Chen',
      role: 'Chief Technology Officer',
      bio: 'AI and data science expert specializing in predictive analytics for healthcare markets.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      name: 'Dr. Priya Sharma',
      role: 'Head of Regulatory Affairs',
      bio: 'Former CDSCO official with deep expertise in Indian pharmaceutical regulations.',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Investment Analyst',
      bio: 'Financial expert with focus on emerging market pharmaceutical investments.',
      image: 'https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    }
  ]

  const values = [
    {
      icon: Target,
      title: 'Precision',
      description: 'We provide accurate, data-driven insights to help investors make informed decisions in the complex pharmaceutical market.'
    },
    {
      icon: Shield,
      title: 'Transparency',
      description: 'Our platform ensures complete transparency in data sources, methodologies, and potential risks associated with investments.'
    },
    {
      icon: Globe,
      title: 'Global Perspective',
      description: 'We combine local market expertise with international best practices to serve global investors effectively.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'Leveraging cutting-edge AI and machine learning to predict market trends and investment opportunities.'
    }
  ]

  const achievements = [
    {
      icon: Award,
      title: '95% Accuracy',
      description: 'Our price prediction models achieve 95% accuracy in 6-month forecasts'
    },
    {
      icon: Users,
      title: '500+ Investors',
      description: 'Trusted by over 500 international investors and pharmaceutical companies'
    },
    {
      icon: Globe,
      title: '50+ Countries',
      description: 'Serving clients from over 50 countries worldwide'
    },
    {
      icon: TrendingUp,
      title: '$2B+ Tracked',
      description: 'Monitoring over $2 billion in pharmaceutical investments'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
              About DrugLaunchIndia
            </h1>
            <p className="text-xl text-primary-700 max-w-3xl mx-auto">
              Empowering global investors with data-driven insights into India's pharmaceutical market through 
              advanced analytics, regulatory expertise, and comprehensive market intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                To democratize access to India's pharmaceutical investment opportunities by providing 
                transparent, accurate, and actionable market intelligence to investors worldwide.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We believe that informed investment decisions drive innovation, improve healthcare access, 
                and create sustainable value for all stakeholders in the pharmaceutical ecosystem.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Our Goal</h3>
                  <p className="text-gray-600">Bridge the information gap between global investors and India's pharma market</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Pharmaceutical research"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-primary-600 bg-opacity-10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">
              The principles that guide our work and define our commitment to excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-lg text-gray-600">
              Experienced professionals combining pharmaceutical expertise with financial acumen
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Achievements</h2>
            <p className="text-xl text-primary-100">
              Trusted by investors worldwide for accurate market intelligence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{achievement.title}</h3>
                  <p className="text-primary-100">{achievement.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Data analytics"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-primary-600 bg-opacity-10 rounded-lg"></div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Technology</h2>
              <p className="text-lg text-gray-700 mb-6">
                We leverage cutting-edge artificial intelligence and machine learning algorithms to analyze 
                vast amounts of pharmaceutical data, regulatory information, and market trends.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Real-time Data Integration</h4>
                    <p className="text-gray-600">Direct API connections to government databases and WHO health observatory</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Predictive Analytics</h4>
                    <p className="text-gray-600">Advanced ML models for price forecasting and market trend analysis</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Secure Infrastructure</h4>
                    <p className="text-gray-600">Enterprise-grade security with encrypted data transmission and storage</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About