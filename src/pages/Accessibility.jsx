import { Accessibility, Eye, Keyboard, Volume2, Monitor, Users } from 'lucide-react'

const AccessibilityPage = () => {
  const features = [
    {
      icon: Eye,
      title: 'Visual Accessibility',
      items: [
        'High contrast color schemes for better readability',
        'Scalable fonts and adjustable text sizes',
        'Alternative text for all images and graphics',
        'Clear visual hierarchy and consistent navigation',
        'Color-blind friendly design with sufficient contrast ratios'
      ]
    },
    {
      icon: Keyboard,
      title: 'Keyboard Navigation',
      items: [
        'Full keyboard navigation support for all interactive elements',
        'Logical tab order throughout the platform',
        'Visible focus indicators for keyboard users',
        'Keyboard shortcuts for common actions',
        'Skip links to main content areas'
      ]
    },
    {
      icon: Volume2,
      title: 'Audio and Screen Reader Support',
      items: [
        'Compatible with popular screen readers (NVDA, JAWS, VoiceOver)',
        'Proper heading structure and semantic markup',
        'Descriptive link text and button labels',
        'Form labels and error messages clearly associated',
        'ARIA labels and descriptions where appropriate'
      ]
    },
    {
      icon: Monitor,
      title: 'Device and Browser Compatibility',
      items: [
        'Responsive design that works on all device sizes',
        'Compatible with modern browsers and assistive technologies',
        'Touch-friendly interface for mobile and tablet users',
        'Consistent experience across different platforms',
        'Progressive enhancement for older browsers'
      ]
    }
  ]

  const standards = [
    {
      title: 'WCAG 2.1 AA Compliance',
      description: 'We strive to meet Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards to ensure our platform is accessible to users with diverse abilities.'
    },
    {
      title: 'Section 508 Compliance',
      description: 'Our platform is designed to comply with Section 508 of the Rehabilitation Act, ensuring accessibility for federal agencies and their users.'
    },
    {
      title: 'ADA Compliance',
      description: 'We work to ensure our digital services comply with the Americans with Disabilities Act (ADA) requirements for digital accessibility.'
    }
  ]

  const assistiveTechnologies = [
    'NVDA (NonVisual Desktop Access)',
    'JAWS (Job Access With Speech)',
    'VoiceOver (macOS and iOS)',
    'TalkBack (Android)',
    'Dragon NaturallySpeaking',
    'Switch Control devices',
    'Eye-tracking software',
    'Voice recognition software'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
                <Accessibility className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
              Accessibility Statement
            </h1>
            <p className="text-xl text-primary-700 max-w-3xl mx-auto">
              We are committed to ensuring our pharmaceutical investment platform is accessible to all users, 
              regardless of their abilities or the technologies they use.
            </p>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Commitment</h2>
            <p className="text-lg text-gray-600">
              Accessibility is not just a feature—it's a fundamental principle that guides our design and development process
            </p>
          </div>
          
          <div className="bg-primary-50 rounded-lg p-8 border border-primary-200">
            <div className="flex items-start space-x-4">
              <Users className="w-8 h-8 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-4">Inclusive Design Philosophy</h3>
                <p className="text-primary-800 leading-relaxed mb-4">
                  At PharmaInvest, we believe that everyone should have equal access to pharmaceutical investment information 
                  and market intelligence. Our platform is designed with accessibility in mind from the ground up, ensuring 
                  that users with disabilities can effectively navigate, understand, and interact with our services.
                </p>
                <p className="text-primary-800 leading-relaxed">
                  We continuously work to improve the accessibility of our platform and welcome feedback from our users 
                  to help us identify areas for enhancement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Accessibility Features</h2>
            <p className="text-lg text-gray-600">
              Our platform includes numerous features designed to support users with diverse needs and abilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                  
                  <ul className="space-y-2">
                    {feature.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Standards Compliance */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Standards and Compliance</h2>
            <p className="text-lg text-gray-600">
              We adhere to internationally recognized accessibility standards and guidelines
            </p>
          </div>
          
          <div className="space-y-6">
            {standards.map((standard, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{standard.title}</h3>
                <p className="text-gray-700 leading-relaxed">{standard.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assistive Technologies */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Supported Assistive Technologies</h2>
            <p className="text-lg text-gray-600">
              Our platform is tested and optimized to work with various assistive technologies
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assistiveTechnologies.map((tech, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <span className="text-gray-700">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Keyboard Shortcuts */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Keyboard Shortcuts</h2>
            <p className="text-lg text-gray-600">
              Use these keyboard shortcuts to navigate our platform more efficiently
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Navigation</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Skip to main content</span>
                    <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Alt + M</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Go to search</span>
                    <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Alt + S</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Open navigation menu</span>
                    <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Alt + N</kbd>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">General</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Open help</span>
                    <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Alt + H</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Close modal/dialog</span>
                    <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Esc</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Navigate between elements</span>
                    <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Tab</kbd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback and Contact */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Help Us Improve</h2>
          <p className="text-xl text-primary-100 mb-8">
            Your feedback is essential in helping us create a more accessible platform for everyone
          </p>
          
          <div className="bg-white bg-opacity-10 rounded-lg p-8 text-left max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Contact Our Accessibility Team</h3>
            <p className="text-primary-100 mb-6">
              If you encounter any accessibility barriers while using our platform, or if you have suggestions 
              for improvement, please don't hesitate to contact us:
            </p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-white">Email</h4>
                <p className="text-primary-100">accessibility@pharmainvest.com</p>
              </div>
              
              <div>
                <h4 className="font-medium text-white">Phone</h4>
                <p className="text-primary-100">+91 11 4567 8900 (Mon-Fri, 9 AM - 6 PM IST)</p>
              </div>
              
              <div>
                <h4 className="font-medium text-white">Response Time</h4>
                <p className="text-primary-100">We aim to respond to accessibility inquiries within 2 business days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ongoing Commitment */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Ongoing Commitment</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Accessibility is an ongoing process, not a one-time achievement. We regularly audit our platform, 
            conduct user testing with people with disabilities, and stay updated with the latest accessibility 
            standards and best practices. We are committed to continuous improvement and making our platform 
            more inclusive with each update.
          </p>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>This accessibility statement was last updated on January 15, 2025.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AccessibilityPage