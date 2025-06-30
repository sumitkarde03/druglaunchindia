import { ExternalLink, Heart } from 'lucide-react'

const SponsorBanner = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-4 text-sm">
        <div className="flex items-center space-x-2">
          <Heart className="w-4 h-4 text-pink-200" />
          <span className="font-medium">Proudly supported by our hackathon sponsors</span>
        </div>
        
        <div className="hidden sm:block w-px h-4 bg-white/30"></div>
        
        <a
          href="/entri-redirect"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 hover:text-pink-200 transition-colors font-medium"
        >
          <span>Thanks to Entri</span>
          <ExternalLink className="w-3 h-3" />
        </a>
        
        <div className="hidden md:block text-xs opacity-75">
          Building the future of pharmaceutical investment intelligence
        </div>
      </div>
    </div>
  )
}

export default SponsorBanner