import { supabase } from './supabase'

// Database service for fetching real data from Supabase
export const databaseService = {
  // Fetch all drugs with manufacturer information
  getDrugs: async () => {
    try {
      const { data, error } = await supabase
        .from('drugs')
        .select(`
          *,
          manufacturers (
            name,
            country,
            who_gmp_certified,
            fda_approved
          )
        `)
        .order('name')

      if (error) throw error
      return { success: true, data: data || [] }
    } catch (error) {
      console.error('Error fetching drugs:', error)
      return { success: false, error: error.message, data: [] }
    }
  },

  // Fetch drug price history
  getDrugPriceHistory: async (drugId) => {
    try {
      const { data, error } = await supabase
        .from('drug_price_history')
        .select('*')
        .eq('drug_id', drugId)
        .order('recorded_date')

      if (error) throw error
      return { success: true, data: data || [] }
    } catch (error) {
      console.error('Error fetching price history:', error)
      return { success: false, error: error.message, data: [] }
    }
  },

  // Fetch drug predictions
  getDrugPredictions: async (drugId) => {
    try {
      const { data, error } = await supabase
        .from('drug_predictions')
        .select('*')
        .eq('drug_id', drugId)
        .order('prediction_date')

      if (error) throw error
      return { success: true, data: data || [] }
    } catch (error) {
      console.error('Error fetching predictions:', error)
      return { success: false, error: error.message, data: [] }
    }
  },

  // Fetch market statistics
  getMarketStats: async () => {
    try {
      const { data, error } = await supabase
        .from('market_stats')
        .select('*')
        .order('category')

      if (error) throw error
      
      // Transform data into the expected format
      const stats = {}
      data.forEach(stat => {
        const key = stat.metric_name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
        stats[key] = stat.metric_value
      })

      return { success: true, data: stats }
    } catch (error) {
      console.error('Error fetching market stats:', error)
      return { success: false, error: error.message, data: {} }
    }
  },

  // Fetch regulatory updates
  getRegulatoryUpdates: async () => {
    try {
      const { data, error } = await supabase
        .from('regulatory_updates')
        .select('*')
        .order('last_updated', { ascending: false })

      if (error) throw error
      return { success: true, data: data || [] }
    } catch (error) {
      console.error('Error fetching regulatory updates:', error)
      return { success: false, error: error.message, data: [] }
    }
  },

  // Fetch user profiles
  getUserProfiles: async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return { success: true, data: data || [] }
    } catch (error) {
      console.error('Error fetching user profiles:', error)
      return { success: false, error: error.message, data: [] }
    }
  },

  // Get current user profile
  getCurrentUserProfile: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return { success: false, error: 'No authenticated user', data: null }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return { success: false, error: error.message, data: null }
    }
  },

  // Update user profile
  updateUserProfile: async (profileData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return { success: false, error: 'No authenticated user' }

      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...profileData,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error updating user profile:', error)
      return { success: false, error: error.message }
    }
  },

  // Search drugs
  searchDrugs: async (searchTerm, category = null) => {
    try {
      let query = supabase
        .from('drugs')
        .select(`
          *,
          manufacturers (
            name,
            country,
            who_gmp_certified,
            fda_approved
          )
        `)

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,generic_name.ilike.%${searchTerm}%`)
      }

      if (category && category !== 'all') {
        query = query.eq('category', category)
      }

      const { data, error } = await query.order('name')

      if (error) throw error
      return { success: true, data: data || [] }
    } catch (error) {
      console.error('Error searching drugs:', error)
      return { success: false, error: error.message, data: [] }
    }
  },

  // Get drug categories
  getDrugCategories: async () => {
    try {
      const { data, error } = await supabase
        .from('drugs')
        .select('category')
        .order('category')

      if (error) throw error
      
      const categories = [...new Set(data.map(item => item.category))]
      return { success: true, data: categories }
    } catch (error) {
      console.error('Error fetching drug categories:', error)
      return { success: false, error: error.message, data: [] }
    }
  },

  // Get comprehensive drug data with history and predictions
  getDrugDetails: async (drugId) => {
    try {
      // Fetch drug details
      const { data: drug, error: drugError } = await supabase
        .from('drugs')
        .select(`
          *,
          manufacturers (
            name,
            country,
            who_gmp_certified,
            fda_approved
          )
        `)
        .eq('id', drugId)
        .single()

      if (drugError) throw drugError

      // Fetch price history
      const { data: priceHistory, error: historyError } = await supabase
        .from('drug_price_history')
        .select('*')
        .eq('drug_id', drugId)
        .order('recorded_date')

      if (historyError) throw historyError

      // Fetch predictions
      const { data: predictions, error: predictionsError } = await supabase
        .from('drug_predictions')
        .select('*')
        .eq('drug_id', drugId)
        .order('prediction_date')

      if (predictionsError) throw predictionsError

      return {
        success: true,
        data: {
          ...drug,
          priceHistory: priceHistory || [],
          predictions: predictions || []
        }
      }
    } catch (error) {
      console.error('Error fetching drug details:', error)
      return { success: false, error: error.message, data: null }
    }
  }
}

// Helper functions for data transformation
export const dataTransformers = {
  // Transform database drug data to match the expected format
  transformDrugData: (dbDrug) => {
    return {
      id: dbDrug.id,
      name: dbDrug.name,
      genericName: dbDrug.generic_name,
      manufacturer: dbDrug.manufacturers?.name || 'Unknown',
      currentPrice: parseFloat(dbDrug.current_price),
      launchPrice: parseFloat(dbDrug.launch_price),
      approvalDate: dbDrug.approval_date,
      category: dbDrug.category,
      therapeuticClass: dbDrug.therapeutic_class,
      dosageForm: dbDrug.dosage_form,
      strength: dbDrug.strength,
      packSize: dbDrug.pack_size,
      mrp: parseFloat(dbDrug.mrp),
      retailPrice: parseFloat(dbDrug.retail_price),
      wholesalePrice: parseFloat(dbDrug.wholesale_price),
      manufacturingCost: parseFloat(dbDrug.manufacturing_cost),
      marketShare: parseFloat(dbDrug.market_share),
      monthlyVolume: dbDrug.monthly_volume,
      regulatoryStatus: dbDrug.regulatory_status,
      patentStatus: dbDrug.patent_status,
      exportMarkets: dbDrug.export_markets || []
    }
  },

  // Transform price history data
  transformPriceHistory: (historyData) => {
    return historyData.map(item => ({
      date: item.recorded_date,
      price: parseFloat(item.price),
      volume: item.volume
    }))
  },

  // Transform predictions data
  transformPredictions: (predictionsData) => {
    return predictionsData.map(item => ({
      date: item.prediction_date,
      price: parseFloat(item.predicted_price),
      confidence: parseFloat(item.confidence_score)
    }))
  }
}