import { GoogleGenerativeAI } from '@google/generative-ai'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

// Check if Gemini API is properly configured
export const isGeminiConfigured = () => {
  return API_KEY && API_KEY !== 'your_gemini_api_key_here'
}

// Initialize Gemini AI
let genAI = null
let model = null

if (isGeminiConfigured()) {
  try {
    genAI = new GoogleGenerativeAI(API_KEY)
    model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  } catch (error) {
    console.error('Error initializing Gemini AI:', error)
  }
}

// Gemini API service
export const geminiService = {
  // Search for any medicine in India and provide comprehensive analysis
  searchMedicineInIndia: async (medicineName) => {
    if (!model) {
      return { 
        success: false, 
        error: 'Gemini AI not configured',
        data: null 
      }
    }

    try {
      const prompt = `
        As a pharmaceutical expert specializing in the Indian market, provide a comprehensive analysis of the medicine "${medicineName}" in India. 

        Please provide detailed information covering:

        1. Medicine Overview
        - Generic name and brand names
        - Therapeutic category and uses
        - Mechanism of action (brief)
        - Common dosage forms available in India

        2. Market Information in India
        - Availability status (prescription/OTC)
        - Major Indian manufacturers/brands
        - Market penetration and popularity
        - Approximate market share of top brands

        3. Pricing and Cost Analysis
        - Typical price range in Indian market
        - Generic vs branded pricing
        - Cost comparison with international markets
        - Factors affecting pricing in India

        4. Regulatory and Availability Status
        - CDSCO approval status
        - Schedule classification (if applicable)
        - Import/export regulations
        - Patent status in India

        5. Market Dynamics and Competition
        - Key competitors in Indian market
        - Market growth trends
        - Challenges and opportunities
        - Future outlook

        6. Investment and Business Insights
        - Manufacturing opportunities
        - Export potential from India
        - Investment attractiveness
        - Risk factors for investors

        Please provide accurate, current information specific to the Indian pharmaceutical market. If the medicine is not commonly available in India or has specific restrictions, please mention that clearly.

        Keep the analysis professional, data-driven, and focused on practical insights for pharmaceutical industry stakeholders.
      `

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      return {
        success: true,
        data: text,
        error: null
      }
    } catch (error) {
      console.error('Error searching medicine:', error)
      return {
        success: false,
        error: error.message,
        data: null
      }
    }
  },

  // Generate drug market analysis
  analyzeDrugMarket: async (drugData) => {
    if (!model) {
      return { 
        success: false, 
        error: 'Gemini AI not configured',
        data: null 
      }
    }

    try {
      const prompt = `
        As a pharmaceutical market analyst, provide a comprehensive analysis of the following drug:

        Drug Name: ${drugData.name}
        Generic Name: ${drugData.genericName}
        Manufacturer: ${drugData.manufacturer}
        Category: ${drugData.category}
        Current Price: ₹${drugData.currentPrice}
        Market Share: ${drugData.marketShare}%
        Monthly Volume: ${drugData.monthlyVolume}
        Export Markets: ${drugData.exportMarkets?.join(', ') || 'None'}

        Please provide:
        1. Market Position Analysis (2-3 sentences)
        2. Investment Potential (2-3 sentences)
        3. Key Risk Factors (2-3 bullet points)
        4. Growth Opportunities (2-3 bullet points)
        5. Competitive Landscape Insights (2-3 sentences)

        Keep the analysis professional, data-driven, and focused on investment insights for the Indian pharmaceutical market.
      `

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      return {
        success: true,
        data: text,
        error: null
      }
    } catch (error) {
      console.error('Error generating drug analysis:', error)
      return {
        success: false,
        error: error.message,
        data: null
      }
    }
  },

  // Generate regulatory insights
  analyzeRegulatoryImpact: async (regulatoryUpdate) => {
    if (!model) {
      return { 
        success: false, 
        error: 'Gemini AI not configured',
        data: null 
      }
    }

    try {
      const prompt = `
        As a pharmaceutical regulatory expert, analyze the following regulatory update for its impact on foreign investors in India's pharmaceutical market:

        Title: ${regulatoryUpdate.title}
        Description: ${regulatoryUpdate.description}
        Category: ${regulatoryUpdate.category}
        Impact Level: ${regulatoryUpdate.impact_level}

        Please provide:
        1. Impact Summary (2-3 sentences)
        2. Investment Implications (2-3 sentences)
        3. Compliance Requirements (2-3 bullet points)
        4. Strategic Recommendations (2-3 bullet points)

        Focus on actionable insights for foreign pharmaceutical investors considering the Indian market.
      `

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      return {
        success: true,
        data: text,
        error: null
      }
    } catch (error) {
      console.error('Error generating regulatory analysis:', error)
      return {
        success: false,
        error: error.message,
        data: null
      }
    }
  },

  // Generate market trend insights
  analyzeMarketTrends: async (marketStats, healthData) => {
    if (!model) {
      return { 
        success: false, 
        error: 'Gemini AI not configured',
        data: null 
      }
    }

    try {
      const prompt = `
        As a pharmaceutical market strategist, analyze the current state of India's pharmaceutical market based on the following data:

        Market Statistics:
        - Total Market Size: ${marketStats.totalMarketSize || marketStats.total_market_size}
        - Growth Rate: ${marketStats.growthRate || marketStats.growth_rate}
        - Export Value: ${marketStats.exportValue || marketStats.export_value}
        - Global Ranking: ${marketStats.globalRanking || marketStats.global_ranking}
        - Generic Market Share: ${marketStats.genericMarketShare || marketStats.generic_market_share}

        Health Indicators Available: ${healthData.length} data points from WHO

        Please provide:
        1. Market Overview (3-4 sentences)
        2. Key Growth Drivers (3-4 bullet points)
        3. Investment Opportunities (3-4 bullet points)
        4. Market Challenges (2-3 bullet points)
        5. Future Outlook (2-3 sentences)

        Focus on insights valuable for foreign investors considering entry into the Indian pharmaceutical market.
      `

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      return {
        success: true,
        data: text,
        error: null
      }
    } catch (error) {
      console.error('Error generating market analysis:', error)
      return {
        success: false,
        error: error.message,
        data: null
      }
    }
  },

  // Generate investment recommendations
  generateInvestmentInsights: async (drugs, marketData) => {
    if (!model) {
      return { 
        success: false, 
        error: 'Gemini AI not configured',
        data: null 
      }
    }

    try {
      const topDrugs = drugs.slice(0, 5).map(drug => 
        `${drug.name} (${drug.category}) - Market Share: ${drug.marketShare}%, Price: ₹${drug.currentPrice}`
      ).join('\n')

      const prompt = `
        As a pharmaceutical investment advisor, provide strategic insights based on the following data from India's pharmaceutical market:

        Top Performing Drugs:
        ${topDrugs}

        Market Context:
        - Total Market Size: ${marketData.totalMarketSize || 'N/A'}
        - Growth Rate: ${marketData.growthRate || 'N/A'}
        - Export Value: ${marketData.exportValue || 'N/A'}

        Please provide:
        1. Investment Thesis (3-4 sentences)
        2. High-Potential Therapeutic Areas (3-4 bullet points)
        3. Risk Assessment (3-4 bullet points)
        4. Entry Strategy Recommendations (3-4 bullet points)
        5. Timeline Considerations (2-3 sentences)

        Focus on actionable investment strategies for foreign pharmaceutical companies and investors.
      `

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      return {
        success: true,
        data: text,
        error: null
      }
    } catch (error) {
      console.error('Error generating investment insights:', error)
      return {
        success: false,
        error: error.message,
        data: null
      }
    }
  },

  // General Q&A for pharmaceutical queries
  askQuestion: async (question, context = '') => {
    if (!model) {
      return { 
        success: false, 
        error: 'Gemini AI not configured',
        data: null 
      }
    }

    try {
      const prompt = `
        You are an expert pharmaceutical market analyst specializing in India's pharmaceutical industry. 
        Answer the following question with accurate, professional insights focused on investment and market intelligence.

        ${context ? `Context: ${context}` : ''}

        Question: ${question}

        Please provide a comprehensive, data-driven response that would be valuable for pharmaceutical investors and industry professionals.
      `

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      return {
        success: true,
        data: text,
        error: null
      }
    } catch (error) {
      console.error('Error processing question:', error)
      return {
        success: false,
        error: error.message,
        data: null
      }
    }
  }
}

// Utility functions
export const geminiUtils = {
  // Format analysis text for better display
  formatAnalysis: (text) => {
    if (!text) return ''
    
    // Split by numbered sections and format
    return text
      .split(/\d+\.\s/)
      .filter(section => section.trim())
      .map(section => section.trim())
  },

  // Extract key insights from analysis
  extractKeyPoints: (text) => {
    if (!text) return []
    
    // Extract bullet points and numbered items
    const bulletPoints = text.match(/[•\-\*]\s+[^\n]+/g) || []
    const numberedPoints = text.match(/\d+\.\s+[^\n]+/g) || []
    
    return [...bulletPoints, ...numberedPoints].map(point => 
      point.replace(/^[•\-\*\d+\.\s]+/, '').trim()
    )
  },

  // Check if response contains useful information
  isValidResponse: (response) => {
    return response && 
           response.success && 
           response.data && 
           response.data.length > 50 // Minimum meaningful response length
  }
}

export default geminiService