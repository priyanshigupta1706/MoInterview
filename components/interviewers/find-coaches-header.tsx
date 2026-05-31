'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

export default function FindCoachesHeader() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search functionality will be added to the grid component via context/props
    console.log('[v0] Search query:', searchQuery)
  }

  return (
    <div className="bg-background py-24 px-4 sm:px-8 lg:px-12">
      <div className="max-w-2xl mx-auto space-y-12 text-center">
        {/* Title */}
        <h1 className="text-5xl sm:text-6xl font-light text-foreground tracking-tight">
          Find Your Coach
        </h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="w-full">
          <div className="relative flex items-center bg-card border-2 border-border rounded-sm overflow-hidden hover:border-foreground/30 transition-smooth">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search coaches by name, company, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-6 py-4 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none text-base"
            />

            {/* Search Icon Button */}
            <button
              type="submit"
              className="px-6 py-4 bg-foreground text-background hover:opacity-90 transition-smooth flex items-center justify-center"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Subheading */}
        <p className="text-muted-foreground font-light max-w-xl mx-auto">
          Browse experienced professionals from top tech companies. Find the perfect coach to prepare for your interview.
        </p>
      </div>
    </div>
  )
}
