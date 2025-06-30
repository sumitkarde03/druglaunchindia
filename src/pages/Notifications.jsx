import { useState, useEffect } from 'react'
import { 
  Bell, 
  AlertCircle, 
  Info, 
  CheckCircle, 
  TrendingUp, 
  FileText, 
  Building2, 
  Calendar,
  Filter,
  MoreVertical,
  Trash2,
  Eye,
  EyeOff,
  Settings,
  Search,
  Clock,
  Star,
  Archive,
  RefreshCw,
  Sparkles,
  Zap
} from 'lucide-react'

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedNotifications, setSelectedNotifications] = useState(new Set())
  const [loading, setLoading] = useState(true)

  // Mock notifications data
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'price_alert',
        title: 'Price Alert: Paracetamol 500mg',
        message: 'Price increased by 8.5% to ₹2.70. This exceeds your 5% threshold.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        read: false,
        priority: 'high',
        category: 'market',
        actionUrl: '/drugs',
        data: {
          drugName: 'Paracetamol 500mg',
          oldPrice: 2.50,
          newPrice: 2.70,
          change: 8.5
        }
      },
      {
        id: 2,
        type: 'regulatory',
        title: 'New DPCO Amendment Published',
        message: 'Drug Price Control Order has been amended affecting 25 essential medicines.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: false,
        priority: 'high',
        category: 'regulatory',
        actionUrl: '/regulations',
        data: {
          affectedDrugs: 25,
          effectiveDate: '2025-02-01'
        }
      },
      {
        id: 3,
        type: 'market_insight',
        title: 'AI Market Analysis Ready',
        message: 'New AI insights available for Cardiovascular drug segment showing 15% growth potential.',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        read: true,
        priority: 'medium',
        category: 'insights',
        actionUrl: '/drugs?category=cardiovascular',
        data: {
          segment: 'Cardiovascular',
          growthPotential: 15
        }
      },
      {
        id: 4,
        type: 'investment',
        title: 'Investment Opportunity Alert',
        message: 'Sun Pharma shows strong Q4 performance with 22% revenue growth.',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        read: true,
        priority: 'medium',
        category: 'investment',
        actionUrl: '/drugs',
        data: {
          company: 'Sun Pharma',
          growth: 22
        }
      },
      {
        id: 5,
        type: 'system',
        title: 'Weekly Market Report Available',
        message: 'Your personalized weekly pharmaceutical market report is ready for download.',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        read: false,
        priority: 'low',
        category: 'reports',
        actionUrl: '/reports',
        data: {
          reportType: 'Weekly Market Report',
          period: 'Week 3, January 2025'
        }
      },
      {
        id: 6,
        type: 'price_prediction',
        title: 'Price Prediction Update',
        message: 'AI model confidence for Metformin predictions increased to 96%.',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        read: true,
        priority: 'low',
        category: 'predictions',
        actionUrl: '/drugs',
        data: {
          drugName: 'Metformin',
          confidence: 96
        }
      }
    ]

    setTimeout(() => {
      setNotifications(mockNotifications)
      setLoading(false)
    }, 1000)
  }, [])

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'price_alert':
        return TrendingUp
      case 'regulatory':
        return FileText
      case 'market_insight':
        return Sparkles
      case 'investment':
        return Building2
      case 'system':
        return Settings
      case 'price_prediction':
        return Zap
      default:
        return Bell
    }
  }

  const getNotificationColor = (priority, read) => {
    if (read) {
      return 'bg-white/60 border-slate-200/60'
    }
    
    switch (priority) {
      case 'high':
        return 'bg-gradient-to-r from-red-50/80 to-pink-50/80 border-red-200/60'
      case 'medium':
        return 'bg-gradient-to-r from-amber-50/80 to-orange-50/80 border-amber-200/60'
      case 'low':
        return 'bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border-blue-200/60'
      default:
        return 'bg-white/60 border-slate-200/60'
    }
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-gradient-to-r from-red-100 to-red-50 text-red-700 border-red-200/60'
      case 'medium':
        return 'bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 border-amber-200/60'
      case 'low':
        return 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border-blue-200/60'
      default:
        return 'bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 border-slate-200/60'
    }
  }

  const getIconColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600'
      case 'medium':
        return 'text-amber-600'
      case 'low':
        return 'text-blue-600'
      default:
        return 'text-slate-600'
    }
  }

  const getIconBackground = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-gradient-to-br from-red-100 to-red-50'
      case 'medium':
        return 'bg-gradient-to-br from-amber-100 to-amber-50'
      case 'low':
        return 'bg-gradient-to-br from-blue-100 to-blue-50'
      default:
        return 'bg-gradient-to-br from-slate-100 to-slate-50'
    }
  }

  const formatTimestamp = (timestamp) => {
    const now = new Date()
    const diff = now - timestamp
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) {
      return `${minutes}m ago`
    } else if (hours < 24) {
      return `${hours}h ago`
    } else {
      return `${days}d ago`
    }
  }

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const filteredNotifications = notifications.filter(notif => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && !notif.read) ||
                         (filter === 'read' && notif.read) ||
                         notif.category === filter

    const matchesSearch = notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notif.message.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesFilter && matchesSearch
  })

  const unreadCount = notifications.filter(n => !n.read).length

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-indigo-50/50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse shadow-lg">
              <Bell className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Loading Notifications</h2>
            <p className="text-slate-600 text-lg">Fetching your latest updates...</p>
            <div className="flex items-center justify-center space-x-2 mt-6">
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-indigo-50/50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">Notifications</h1>
                <p className="text-slate-600 text-lg">
                  {unreadCount > 0 ? (
                    <span className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      <span>{unreadCount} unread notifications</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>All caught up!</span>
                    </span>
                  )}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-slate-200/60 text-slate-700 px-6 py-3 rounded-2xl hover:bg-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Mark all read</span>
              </button>
              
              <button className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-2xl hover:shadow-lg transition-all duration-300 font-medium hover:scale-105">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
            </div>
          </div>

          {/* Enhanced Search and Filters */}
          <div className="card-modern p-8 backdrop-blur-xl">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 text-lg border border-slate-200/60 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80 backdrop-blur-sm transition-all duration-300"
                  />
                </div>
              </div>
              
              <div className="lg:w-64">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full px-6 py-4 text-lg border border-slate-200/60 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80 backdrop-blur-sm transition-all duration-300"
                >
                  <option value="all">All Notifications</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                  <option value="market">Market Updates</option>
                  <option value="regulatory">Regulatory</option>
                  <option value="insights">AI Insights</option>
                  <option value="investment">Investment</option>
                  <option value="reports">Reports</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Notifications List */}
        <div className="space-y-6">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-slate-100 to-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <Bell className="w-16 h-16 text-slate-400" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">No notifications found</h3>
              <p className="text-slate-500 text-xl mb-8">
                {searchTerm ? 'Try adjusting your search terms.' : 'You\'re all caught up!'}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type)
              return (
                <div
                  key={notification.id}
                  className={`card-modern p-8 border-l-4 ${getNotificationColor(notification.priority, notification.read)} hover:shadow-xl transition-all duration-300 backdrop-blur-xl group`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-6 flex-1">
                      <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shadow-lg ${getIconBackground(notification.priority)} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-8 h-8 ${getIconColor(notification.priority)}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <h3 className={`text-xl font-bold ${notification.read ? 'text-slate-700' : 'text-slate-900'} group-hover:text-slate-900 transition-colors`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-pulse shadow-lg"></div>
                          )}
                          <span className={`px-4 py-2 text-sm font-semibold rounded-full border ${getPriorityBadge(notification.priority)} backdrop-blur-sm`}>
                            {notification.priority}
                          </span>
                        </div>
                        
                        <p className={`mb-4 text-lg leading-relaxed ${notification.read ? 'text-slate-600' : 'text-slate-700'}`}>
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6 text-sm text-slate-500">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-5 h-5" />
                              <span className="font-medium">{formatTimestamp(notification.timestamp)}</span>
                            </div>
                            <span className="capitalize font-medium px-3 py-1 bg-slate-100 rounded-full">
                              {notification.category}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            {notification.actionUrl && (
                              <a
                                href={notification.actionUrl}
                                className="text-indigo-600 hover:text-indigo-700 text-lg font-semibold hover:underline transition-colors"
                              >
                                View Details →
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 ml-6">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all duration-300 hover:scale-110"
                          title="Mark as read"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-300 hover:scale-110"
                        title="Delete notification"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Enhanced Summary Stats */}
        {notifications.length > 0 && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="card-modern p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-slate-900 mb-3">{notifications.length}</div>
              <div className="text-slate-600 text-lg font-medium">Total Notifications</div>
            </div>
            
            <div className="card-modern p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">{unreadCount}</div>
              <div className="text-slate-600 text-lg font-medium">Unread</div>
            </div>
            
            <div className="card-modern p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent mb-3">
                {notifications.filter(n => n.priority === 'high').length}
              </div>
              <div className="text-slate-600 text-lg font-medium">High Priority</div>
            </div>
            
            <div className="card-modern p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-3">
                {notifications.filter(n => n.type === 'price_alert').length}
              </div>
              <div className="text-slate-600 text-lg font-medium">Price Alerts</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Notifications