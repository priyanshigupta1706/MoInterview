'use client'

import { useState } from 'react'

interface FindCoachesHeaderProps {
  onSearchChange?: (query: string) => void
}

export default function FindCoachesHeader({
  onSearchChange,
}: FindCoachesHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    onSearchChange?.(value)
  }

  return (
    <div className="bg-background border-b border-border">
      <div className="px-6 sm:px-8 lg:px-12 py-16">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Badge and Title */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-light">
              Coaches 1,200+ vetted experts
            </p>
            <h1 className="text-5xl sm:text-6xl font-light text-foreground leading-tight">
              Find your coach
            </h1>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground font-light max-w-2xl leading-relaxed">
            Practice with engineers, PMs and leaders from the companies you're targeting - and get the unfiltered feedback that gets you hired.
          </p>

          {/* Search Bar with TRY Button */}
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-card border border-border flex items-center px-0">
              <span className="px-4 text-muted-foreground text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search by name, company, role or skill..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="flex-1 py-3 pr-4 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none text-sm font-light"
              />
            </div>
            <button className="px-6 py-3 bg-foreground text-background text-xs uppercase tracking-wider font-light hover:opacity-90 transition-smooth whitespace-nowrap">
              TRY
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
