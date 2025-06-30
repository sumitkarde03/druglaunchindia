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
  RefreshCw
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
        return Info
      case 'investment':
        return Building2
      case 'system':
        return Settings
      case 'price_prediction':
        return TrendingUp
      default:
        return Bell
    }
  }

  const getNotificationColor = (priority, read) => {
    if (read) {
      return 'bg-gray-50 border-gray-200'
    }
    
    switch (priority) {
      case 'high':
        return 'bg-red-50 border-red-200'
      case 'medium':
        return 'bg-yellow-50 border-yellow-200'
      case 'low':
        return 'bg-blue-50 border-blue-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Bell className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Loading Notifications</h2>
            <p className="text-slate-600">Fetching your latest updates...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
                <p className="text-slate-600">
                  {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className="flex items-center space-x-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Mark all read</span>
              </button>
              
              <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="card-modern p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              
              <div className="lg:w-48">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Bell className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No notifications found</h3>
              <p className="text-slate-500 text-lg mb-6">
                {searchTerm ? 'Try adjusting your search terms.' : 'You\'re all caught up!'}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type)
              return (
                <div
                  key={notification.id}
                  className={`card-modern p-6 border-l-4 ${getNotificationColor(notification.priority, notification.read)} hover:shadow-lg transition-all duration-300`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        notification.priority === 'high' ? 'bg-red-100' :
                        notification.priority === 'medium' ? 'bg-yellow-100' :
                        'bg-blue-100'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          notification.priority === 'high' ? 'text-red-600' :
                          notification.priority === 'medium' ? 'text-yellow-600' :
                          'text-blue-600'
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className={`text-lg font-semibold ${notification.read ? 'text-slate-700' : 'text-slate-900'}`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                          )}
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityBadge(notification.priority)}`}>
                            {notification.priority}
                          </span>
                        </div>
                        
                        <p className={`mb-3 ${notification.read ? 'text-slate-600' : 'text-slate-700'}`}>
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-slate-500">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{formatTimestamp(notification.timestamp)}</span>
                            </div>
                            <span className="capitalize">{notification.category}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {notification.actionUrl && (
                              <a
                                href={notification.actionUrl}
                                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                              >
                                View Details →
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Mark as read"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete notification"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Summary Stats */}
        {notifications.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card-modern p-6 text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2">{notifications.length}</div>
              <div className="text-slate-600">Total Notifications</div>
            </div>
            
            <div className="card-modern p-6 text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">{unreadCount}</div>
              <div className="text-slate-600">Unread</div>
            </div>
            
            <div className="card-modern p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {notifications.filter(n => n.priority === 'high').length}
              </div>
              <div className="text-slate-600">High Priority</div>
            </div>
            
            <div className="card-modern p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {notifications.filter(n => n.type === 'price_alert').length}
              </div>
              <div className="text-slate-600">Price Alerts</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Notifications