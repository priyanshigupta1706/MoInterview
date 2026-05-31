'use client'

import { mockInterviewers } from '@/lib/mock-data'
import { type InterviewerFilterOptions, type SortOption } from '@/lib/types'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface InterviewerFiltersProps {
  filters: InterviewerFilterOptions
  onFiltersChange: (filters: InterviewerFilterOptions) => void
  sortBy: SortOption
  onSortChange: (sort: SortOption) => void
  filteredCount?: number
}

export default function InterviewerFilters({
  filters,
  onFiltersChange,
  sortBy,
  onSortChange,
  filteredCount = 0,
}: InterviewerFiltersProps) {
  const companies = Array.from(new Set(mockInterviewers.map((i) => i.company)))
  const skills = Array.from(new Set(mockInterviewers.flatMap((i) => i.skills)))

  const getCompanyCount = (company: string) => {
    return mockInterviewers.filter((i) => i.company === company).length
  }

  const getSkillCount = (skill: string) => {
    return mockInterviewers.filter((i) => i.skills.includes(skill)).length
  }

  const handleCompanyChange = (company: string, checked: boolean) => {
    const companies = checked
      ? [...(filters.companies || []), company]
      : (filters.companies || []).filter((c) => c !== company)
    onFiltersChange({ ...filters, companies: companies.length > 0 ? companies : undefined })
  }

  const handleSkillChange = (skill: string, checked: boolean) => {
    const skillsList = checked
      ? [...(filters.skills || []), skill]
      : (filters.skills || []).filter((s) => s !== skill)
    onFiltersChange({ ...filters, skills: skillsList.length > 0 ? skillsList : undefined })
  }

  const handlePriceChange = (range: [number, number]) => {
    onFiltersChange({ ...filters, priceRange: range })
  }

  const handleRatingChange = (value: number) => {
    onFiltersChange({ ...filters, minRating: value > 0 ? value : undefined })
  }

  const handleReset = () => {
    onFiltersChange({})
    onSortChange('rating')
  }

  const hasActiveFilters = filters.companies?.length || filters.skills?.length || filters.minRating || filters.priceRange

  return (
    <div className="space-y-8">
      {/* Filters header and reset */}
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-light">Filters</p>
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors font-light"
          >
            RESET ALL
          </button>
        )}
      </div>

      {/* Companies */}
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-light mb-3">COMPANY</p>
        <div className="space-y-2">
          {companies.map((company) => (
            <div key={company} className="flex items-center space-x-2">
              <Checkbox
                id={`company-${company}`}
                checked={filters.companies?.includes(company) || false}
                onCheckedChange={(checked) => handleCompanyChange(company, checked as boolean)}
                className="w-4 h-4"
              />
              <Label
                htmlFor={`company-${company}`}
                className="font-light text-sm cursor-pointer flex items-center justify-between flex-1"
              >
                {company}
                <span className="text-xs text-muted-foreground ml-2">{getCompanyCount(company)}</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Focus Area / Skills */}
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-light mb-3">FOCUS AREA</p>
        <div className="space-y-2">
          {skills.slice(0, 6).map((skill) => (
            <div key={skill} className="flex items-center space-x-2">
              <Checkbox
                id={`skill-${skill}`}
                checked={filters.skills?.includes(skill) || false}
                onCheckedChange={(checked) => handleSkillChange(skill, checked as boolean)}
                className="w-4 h-4"
              />
              <Label
                htmlFor={`skill-${skill}`}
                className="font-light text-sm cursor-pointer flex items-center justify-between flex-1"
              >
                {skill}
                <span className="text-xs text-muted-foreground ml-2">{getSkillCount(skill)}</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-light mb-3">PRICE PER HOUR</p>
        <div className="space-y-2 text-sm">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="radio" name="price" value="any" checked={!filters.priceRange} onChange={() => onFiltersChange({ ...filters, priceRange: undefined })} className="w-4 h-4" />
            <span className="font-light">Up to $200</span>
          </label>
        </div>
      </div>

      {/* Experience */}
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-light mb-3">MIN. EXPERIENCE</p>
        <div className="space-y-2 text-sm">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="radio" name="experience" value="any" checked={!filters.experienceRange} onChange={() => onFiltersChange({ ...filters, experienceRange: undefined })} className="w-4 h-4" />
            <span className="font-light">0+ years</span>
          </label>
        </div>
      </div>

      {/* Rating */}
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-light mb-3">MIN. RATING</p>
        <div className="space-y-2">
          {[0, 4.7, 4.8, 4.9].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.minRating === rating}
                onCheckedChange={(checked) => handleRatingChange(checked ? rating : 0)}
                className="w-4 h-4"
              />
              <Label htmlFor={`rating-${rating}`} className="font-light text-sm cursor-pointer">
                {rating === 0 ? 'Any rating' : `${rating}+ stars`}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
