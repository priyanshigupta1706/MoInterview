'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface FindCoachesHeaderProps {
  onSearchChange?: (query: string) => void
  onTagsChange?: (tags: string[]) => void
  selectedTags?: string[]
}

export default function FindCoachesHeader({
  onSearchChange,
  onTagsChange,
  selectedTags = [],
}: FindCoachesHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [localTags, setLocalTags] = useState<string[]>(selectedTags)

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    onSearchChange?.(value)
  }

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = localTags.filter(tag => tag !== tagToRemove)
    setLocalTags(newTags)
    onTagsChange?.(newTags)
  }

  const handleAddTag = () => {
    if (searchQuery.trim() && !localTags.includes(searchQuery.trim())) {
      const newTags = [...localTags, searchQuery.trim()]
      setLocalTags(newTags)
      setSearchQuery('')
      onTagsChange?.(newTags)
    }
  }

  return (
    <div className="bg-background border-b border-border">
      {/* Header Section */}
      <div className="px-4 sm:px-8 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Badge and Title */}
          <div className="mb-8 space-y-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-light">
              COACHES 1,200+ VETTED EXPERTS
            </p>
            <h1 className="text-4xl sm:text-5xl font-light text-foreground">
              Find your coach
            </h1>
          </div>

          {/* Description */}
          <p className="text-base text-muted-foreground font-light mb-8 max-w-3xl">
            Practice with engineers, PMs and leaders from the companies you're targeting - and get the unfiltered feedback that gets you hired.
          </p>

          {/* Search Bar */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 relative flex items-center bg-card border border-border overflow-hidden hover:border-foreground/30 transition-smooth">
              <input
                type="text"
                placeholder="Search by name, company, role or skill..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddTag()
                  }
                }}
                className="flex-1 px-4 py-3 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none text-sm"
              />
            </div>
            <button
              onClick={handleAddTag}
              className="px-6 py-3 bg-foreground text-background hover:opacity-90 transition-smooth text-sm font-light uppercase tracking-widest"
            >
              TRY
            </button>
          </div>

          {/* Selected Tags */}
          {localTags.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              {localTags.map((tag) => (
                <div
                  key={tag}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-muted/50 border border-border rounded-sm text-sm text-foreground"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={`Remove ${tag}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
