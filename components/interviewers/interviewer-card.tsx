'use client'

import Link from 'next/link'
import { type Interviewer } from '@/lib/types'

interface InterviewerCardProps {
  interviewer: Interviewer
}

export default function InterviewerCard({ interviewer }: InterviewerCardProps) {
  const formatDate = (date: Date) => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    if (date.toDateString() === today.toDateString()) return 'Tomorrow'
    if (date.toDateString() === tomorrow.toDateString()) return 'In 2 days'
    
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  const reviewCount = Math.floor(Math.random() * 400 + 100)
  const sessionCount = Math.floor(Math.random() * 300 + 50)
  const initials = interviewer.name.split(' ').map(n => n[0]).join('').toUpperCase()

  return (
    <div className="bg-card border border-border">
      {/* Header: Badge, Name, Role, Company, Checkbox */}
      <div className="p-5 border-b border-border space-y-3">
        <div className="flex items-start gap-3 justify-between">
          {/* Left: Badge + Info */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Initials Badge */}
            <div className="w-11 h-11 bg-muted flex items-center justify-center flex-shrink-0 text-xs font-light text-foreground">
              {initials}
            </div>
            <div className="flex-1 min-w-0 space-y-0.5">
              <h3 className="text-sm font-light text-foreground truncate">{interviewer.name}</h3>
              <p className="text-xs font-light text-muted-foreground">{interviewer.role}</p>
              <p className="text-xs font-light text-muted-foreground">• {interviewer.company}</p>
            </div>
          </div>
          {/* Right: Checkbox */}
          <span className="text-base font-light text-muted-foreground flex-shrink-0 ml-2">☐</span>
        </div>
      </div>

      {/* Rating and review count */}
      <div className="px-5 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-sm text-foreground tracking-tight">★★★★★</span>
          <span className="text-xs text-muted-foreground font-light">
            {interviewer.rating} ({reviewCount} reviews)
          </span>
        </div>
      </div>

      {/* Bio/Description */}
      <div className="px-5 py-4 border-b border-border">
        <p className="text-xs font-light text-muted-foreground leading-relaxed">
          {interviewer.bio}
        </p>
      </div>

      {/* Stats: Price/Experience/Sessions */}
      <div className="px-5 py-4 border-b border-border flex items-stretch justify-between gap-6">
        <div className="text-center flex-1">
          <p className="text-sm font-light text-foreground">${interviewer.pricePerSession}/hr</p>
          <p className="text-xs font-light text-muted-foreground uppercase tracking-wider mt-1.5">Rate</p>
        </div>
        <div className="text-center flex-1">
          <p className="text-sm font-light text-foreground">{interviewer.experience}yrs</p>
          <p className="text-xs font-light text-muted-foreground uppercase tracking-wider mt-1.5">Experience</p>
        </div>
        <div className="text-center flex-1">
          <p className="text-sm font-light text-foreground">{sessionCount}</p>
          <p className="text-xs font-light text-muted-foreground uppercase tracking-wider mt-1.5">Sessions</p>
        </div>
      </div>

      {/* Skills */}
      <div className="px-5 py-4 border-b border-border">
        <div className="flex flex-wrap gap-1.5">
          {interviewer.skills.slice(0, 2).map((skill) => (
            <span
              key={skill}
              className="text-xs px-2.5 py-1 bg-muted text-foreground font-light"
            >
              {skill}
            </span>
          ))}
          {interviewer.skills.length > 2 && (
            <span className="text-xs px-2.5 py-1 bg-muted text-foreground font-light">
              +{interviewer.skills.length - 2}
            </span>
          )}
        </div>
      </div>

      {/* Next Available */}
      <div className="px-5 py-4 border-b border-border">
        <p className="text-xs font-light text-muted-foreground">
          • Next available <span className="text-foreground">{formatDate(interviewer.nextAvailable)}</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="px-5 py-4 flex gap-3">
        <Link
          href={`/interviewer/${interviewer.id}`}
          className="flex-1 text-center py-2.5 border border-foreground text-foreground text-xs uppercase tracking-wider font-light hover:bg-foreground hover:text-background transition-smooth"
        >
          View Profile
        </Link>
        <button className="flex-1 py-2.5 bg-foreground text-background text-xs uppercase tracking-wider font-light hover:opacity-90 transition-smooth">
          Book ${interviewer.pricePerSession}
        </button>
      </div>
    </div>
  )
}
