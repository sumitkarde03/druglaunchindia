import axios from 'axios'
import { databaseService, dataTransformers } from './database'
import { isSupabaseConfigured } from './supabase'

// WHO Global Health Observatory API
const WHO_BASE_URL = 'https://ghoapi.azureedge.net/api'

// Create axios instance with default config
const apiClient = axios.create({
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// WHO API functions
export const whoApi = {
  getDimensions: async () => {
    try {
      const response = await apiClient.get(`${WHO_BASE_URL}/Dimension`)
      return response.data
    } catch (error) {
      console.error('Error fetching WHO dimensions:', error)
      return { value: [] }
    }
  },

  getIndicator: async (indicatorCode) => {
    try {
      const response = await apiClient.get(`${WHO_BASE_URL}/${indicatorCode}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching WHO indicator ${indicatorCode}:`, error)
      return { value: [] }
    }
  },

  getHealthData: async (country = 'IND') => {
    try {
      // Comprehensive list of health indicators relevant to pharmaceutical market
      const indicators = [
        'WHOSIS_000001', // Life expectancy at birth
        'WHOSIS_000015', // Infant mortality rate
        'WHS9_86',       // Total expenditure on health as % of GDP
        'WHS7_156',      // Out-of-pocket expenditure on health
        'GHED_CHEGDP_SHA2011', // Current health expenditure (CHE) as % of GDP
        'WHS4_544',      // Physicians density per 1000 population
        'WHS4_543',      // Hospital beds per 10,000 population
        'MDG_0000000026', // Under-five mortality rate
        'WHOSIS_000002', // Healthy life expectancy at birth
        'WHS8_110',      // Universal health coverage service coverage index
      ]
      
      const promises = indicators.map(async (indicator) => {
        try {
          const response = await apiClient.get(`${WHO_BASE_URL}/${indicator}?$filter=SpatialDim eq '${country}'`)
          return {
            indicator,
            name: whoApi.getIndicatorName(indicator),
            data: response.data,
            success: true
          }
        } catch (error) {
          console.warn(`Failed to fetch indicator ${indicator}:`, error.message)
          return {
            indicator,
            name: whoApi.getIndicatorName(indicator),
            data: { value: [] },
            success: false,
            error: error.message
          }
        }
      })
      
      const results = await Promise.allSettled(promises)
      return results.map((result, index) => 
        result.status === 'fulfilled' ? result.value : {
          indicator: indicators[index],
          name: whoApi.getIndicatorName(indicators[index]),
          data: { value: [] },
          success: false,
          error: result.reason?.message || 'Unknown error'
        }
      )
    } catch (error) {
      console.error('Error fetching health data:', error)
      return []
    }
  },

  getIndicatorName: (code) => {
    const indicatorNames = {
      'WHOSIS_000001': 'Life Expectancy at Birth',
      'WHOSIS_000015': 'Infant Mortality Rate',
      'WHS9_86': 'Health Expenditure % of GDP',
      'WHS7_156': 'Out-of-pocket Health Expenditure',
      'GHED_CHEGDP_SHA2011': 'Current Health Expenditure % GDP',
      'WHS4_544': 'Physicians Density per 1000',
      'WHS4_543': 'Hospital Beds per 10,000',
      'MDG_0000000026': 'Under-five Mortality Rate',
      'WHOSIS_000002': 'Healthy Life Expectancy',
      'WHS8_110': 'UHC Service Coverage Index'
    }
    return indicatorNames[code] || code
  },

  getGlobalHealthStats: async () => {
    try {
      // Get global pharmaceutical and health statistics
      const globalIndicators = [
        'WHOSIS_000001', // Global life expectancy
        'WHS9_86',       // Global health expenditure
      ]
      
      const promises = globalIndicators.map(async (indicator) => {
        try {
          const response = await apiClient.get(`${WHO_BASE_URL}/${indicator}`)
          return {
            indicator,
            data: response.data
          }
        } catch (error) {
          return {
            indicator,
            data: { value: [] },
            error: error.message
          }
        }
      })
      
      const results = await Promise.allSettled(promises)
      return results.map(result => 
        result.status === 'fulfilled' ? result.value : result.reason
      )
    } catch (error) {
      console.error('Error fetching global health stats:', error)
      return []
    }
  }
}

// Enhanced Indian Government Data API - now integrates with Supabase database
export const indiaGovApi = {
  getDrugPrices: async () => {
    // Try to fetch from database first if Supabase is configured
    if (isSupabaseConfigured()) {
      try {
        const result = await databaseService.getDrugs()
        if (result.success && result.data.length > 0) {
          // Transform database data to match expected format
          const transformedData = result.data.map(drug => {
            const transformed = dataTransformers.transformDrugData(drug)
            
            // Add mock price history and predictions for now
            // In a real app, you'd fetch these separately
            transformed.priceHistory = [
              { date: '2020-01', price: transformed.launchPrice, volume: 45000 },
              { date: '2021-01', price: transformed.launchPrice * 1.1, volume: 47000 },
              { date: '2022-01', price: transformed.launchPrice * 1.2, volume: 49000 },
              { date: '2023-01', price: transformed.currentPrice, volume: 50000 },
            ]
            
            transformed.predictedPrices = [
              { date: '2025-01', price: transformed.currentPrice * 1.04, confidence: 0.95 },
              { date: '2025-06', price: transformed.currentPrice * 1.08, confidence: 0.92 },
              { date: '2026-01', price: transformed.currentPrice * 1.12, confidence: 0.88 },
            ]
            
            transformed.competitorAnalysis = [
              { company: 'Competitor A', marketShare: 12.5, price: transformed.currentPrice * 0.98 },
              { company: 'Competitor B', marketShare: 10.8, price: transformed.currentPrice * 1.02 },
              { company: 'Competitor C', marketShare: 8.3, price: transformed.currentPrice * 0.96 }
            ]
            
            return transformed
          })
          
          return { data: transformedData }
        }
      } catch (error) {
        console.error('Error fetching from database, falling back to mock data:', error)
      }
    }

    // Fallback to mock data if database is not available
    return {
      data: [
        {
          id: 1,
          name: 'Paracetamol 500mg',
          genericName: 'Acetaminophen',
          manufacturer: 'Cipla Ltd',
          currentPrice: 2.50,
          launchPrice: 2.00,
          approvalDate: '2020-01-15',
          category: 'Analgesic',
          therapeuticClass: 'Non-opioid analgesic',
          dosageForm: 'Tablet',
          strength: '500mg',
          packSize: '10 tablets',
          mrp: 25.00,
          retailPrice: 22.50,
          wholesalePrice: 20.00,
          manufacturingCost: 15.00,
          marketShare: 15.2,
          monthlyVolume: 50000,
          regulatoryStatus: 'Approved',
          patentStatus: 'Generic',
          exportMarkets: ['USA', 'UK', 'Germany', 'Australia'],
          priceHistory: [
            { date: '2020-01', price: 2.00, volume: 45000 },
            { date: '2020-06', price: 2.10, volume: 46000 },
            { date: '2021-01', price: 2.20, volume: 47000 },
            { date: '2021-06', price: 2.30, volume: 48000 },
            { date: '2022-01', price: 2.40, volume: 49000 },
            { date: '2022-06', price: 2.50, volume: 50000 },
          ],
          predictedPrices: [
            { date: '2025-01', price: 2.60, confidence: 0.95 },
            { date: '2025-06', price: 2.70, confidence: 0.92 },
            { date: '2026-01', price: 2.80, confidence: 0.88 },
          ],
          competitorAnalysis: [
            { company: 'Sun Pharma', marketShare: 12.5, price: 2.45 },
            { company: 'Dr. Reddy\'s', marketShare: 10.8, price: 2.55 },
            { company: 'Lupin', marketShare: 8.3, price: 2.40 }
          ]
        }
      ]
    }
  },

  getMarketStats: async () => {
    // Try to fetch from database first if Supabase is configured
    if (isSupabaseConfigured()) {
      try {
        const result = await databaseService.getMarketStats()
        if (result.success) {
          return result.data
        }
      } catch (error) {
        console.error('Error fetching market stats from database:', error)
      }
    }

    // Fallback to mock data
    return {
      totalMarketSize: '50.7 Billion USD',
      growthRate: '12.3%',
      exportValue: '24.4 Billion USD',
      totalDrugs: '3,000+',
      foreignInvestment: '8.2 Billion USD',
      regulatoryApprovals: '450+',
      manufacturingUnits: '3,000+',
      employmentGenerated: '4.7 Million',
      globalRanking: '3rd Largest',
      genericMarketShare: '71%'
    }
  },

  getRegulatoryInfo: async () => {
    // Try to fetch from database first if Supabase is configured
    if (isSupabaseConfigured()) {
      try {
        const result = await databaseService.getRegulatoryUpdates()
        if (result.success && result.data.length > 0) {
          return {
            data: result.data.map(item => ({
              title: item.title,
              description: item.description,
              link: item.source_url || '#',
              category: item.category,
              lastUpdated: item.last_updated,
              impact: item.impact_level,
              applicability: 'All pharmaceutical companies'
            }))
          }
        }
      } catch (error) {
        console.error('Error fetching regulatory info from database:', error)
      }
    }

    // Fallback to mock data
    return {
      data: [
        {
          title: 'Drug Price Control Order (DPCO) 2013',
          description: 'Regulates prices of essential medicines in India',
          link: 'https://cdsco.gov.in/opencms/opencms/en/Drugs/',
          category: 'Pricing'
        },
        {
          title: 'Foreign Direct Investment (FDI) Policy',
          description: '100% FDI allowed in pharmaceutical sector under automatic route',
          link: 'https://dpiit.gov.in/',
          category: 'Investment'
        },
        {
          title: 'Central Drugs Standard Control Organization (CDSCO)',
          description: 'National regulatory authority for pharmaceuticals',
          link: 'https://cdsco.gov.in/',
          category: 'Regulatory'
        }
      ]
    }
  },

  // New methods for database integration
  searchDrugs: async (searchTerm, category = null) => {
    if (isSupabaseConfigured()) {
      try {
        const result = await databaseService.searchDrugs(searchTerm, category)
        if (result.success) {
          return {
            data: result.data.map(drug => dataTransformers.transformDrugData(drug))
          }
        }
      } catch (error) {
        console.error('Error searching drugs in database:', error)
      }
    }
    
    // Fallback to mock search
    return { data: [] }
  },

  getDrugCategories: async () => {
    if (isSupabaseConfigured()) {
      try {
        const result = await databaseService.getDrugCategories()
        if (result.success) {
          return result.data
        }
      } catch (error) {
        console.error('Error fetching categories from database:', error)
      }
    }
    
    // Fallback to mock categories
    return ['Analgesic', 'Antidiabetic', 'Cardiovascular', 'Gastrointestinal']
  },

  getUserProfiles: async () => {
    if (isSupabaseConfigured()) {
      try {
        const result = await databaseService.getUserProfiles()
        return result
      } catch (error) {
        console.error('Error fetching user profiles:', error)
        return { success: false, error: error.message, data: [] }
      }
    }
    
    return { success: false, error: 'Database not configured', data: [] }
  }
}

// Utility functions for data processing
export const dataUtils = {
  formatCurrency: (amount, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount)
  },

  formatNumber: (number) => {
    return new Intl.NumberFormat('en-IN').format(number)
  },

  calculateGrowthRate: (current, previous) => {
    if (!previous || previous === 0) return 0
    return ((current - previous) / previous) * 100
  },

  processTimeSeriesData: (data) => {
    return data.map(item => ({
      ...item,
      date: new Date(item.date).toLocaleDateString('en-IN'),
      formattedPrice: dataUtils.formatCurrency(item.price)
    }))
  },

  aggregateMarketData: (drugs) => {
    const totalVolume = drugs.reduce((sum, drug) => sum + drug.monthlyVolume, 0)
    const averagePrice = drugs.reduce((sum, drug) => sum + drug.currentPrice, 0) / drugs.length
    const totalMarketValue = drugs.reduce((sum, drug) => sum + (drug.currentPrice * drug.monthlyVolume), 0)
    
    return {
      totalVolume,
      averagePrice,
      totalMarketValue,
      drugCount: drugs.length
    }
  }
}

// Error handling wrapper for API calls
export const apiWrapper = {
  safeApiCall: async (apiFunction, fallbackData = null) => {
    try {
      const result = await apiFunction()
      return { success: true, data: result, error: null }
    } catch (error) {
      console.error('API call failed:', error)
      return { 
        success: false, 
        data: fallbackData, 
        error: error.message || 'Unknown error occurred' 
      }
    }
  }
}