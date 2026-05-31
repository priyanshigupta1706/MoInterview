'use client'

import Link from 'next/link'
import { type Interviewer } from '@/lib/types'
import { useState } from 'react'

interface InterviewerCardProps {
  interviewer: Interviewer
}

export default function InterviewerCard({ interviewer }: InterviewerCardProps) {
  const [isSaved, setIsSaved] = useState(false)

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

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    return (
      <span className="text-sm text-foreground">
        {'★'.repeat(fullStars)}
        <span className="text-muted-foreground">{'★'.repeat(5 - fullStars)}</span>
      </span>
    )
  }

  return (
    <div className="bg-card border border-border hover:border-foreground/50 transition-smooth">
      {/* Header with initials badge and company */}
      <div className="p-4 flex items-start justify-between border-b border-border">
        <div className="flex items-start gap-3">
          {/* Avatar initials */}
          <div className="w-10 h-10 bg-muted flex items-center justify-center rounded font-light text-sm text-foreground">
            {interviewer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
          <div>
            <h3 className="text-sm font-light text-foreground">{interviewer.name}</h3>
            <p className="text-xs text-muted-foreground font-light">{interviewer.role}</p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-light mt-1">
              {interviewer.company}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsSaved(!isSaved)}
          className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Save"
        >
          <svg
            className={`w-5 h-5 ${isSaved ? 'fill-accent' : ''}`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill={isSaved ? 'currentColor' : 'none'}
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      {/* Rating and bio */}
      <div className="p-4 border-b border-border space-y-3">
        <div className="flex items-center gap-2">
          {renderStars(interviewer.rating)}
          <span className="text-xs text-muted-foreground">
            {interviewer.rating} ({Math.floor(Math.random() * 400 + 100)} reviews)
          </span>
        </div>
        <p className="text-xs text-muted-foreground font-light leading-relaxed">
          {interviewer.bio}
        </p>
      </div>

      {/* Stats: Price, Experience, Sessions */}
      <div className="px-4 py-3 flex items-center justify-between gap-4 border-b border-border">
        <div className="text-left">
          <p className="text-sm font-light text-foreground">${interviewer.pricePerSession}/hr</p>
          <p className="text-xs text-muted-foreground">RATE</p>
        </div>
        <div className="text-left">
          <p className="text-sm font-light text-foreground">{interviewer.experience}yrs</p>
          <p className="text-xs text-muted-foreground">EXPERIENCE</p>
        </div>
        <div className="text-left">
          <p className="text-sm font-light text-foreground">{Math.floor(Math.random() * 300 + 50)}</p>
          <p className="text-xs text-muted-foreground">SESSIONS</p>
        </div>
      </div>

      {/* Skills */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-wrap gap-2">
          {interviewer.skills.slice(0, 2).map((skill) => (
            <span
              key={skill}
              className="text-xs px-2 py-1 bg-muted text-foreground font-light"
            >
              {skill}
            </span>
          ))}
          {interviewer.skills.length > 2 && (
            <span className="text-xs px-2 py-1 bg-muted text-foreground font-light">
              +{interviewer.skills.length - 2}
            </span>
          )}
        </div>
      </div>

      {/* Next available */}
      <div className="p-4 border-b border-border">
        <p className="text-xs text-muted-foreground font-light">
          • Next available <span className="text-foreground">{formatDate(interviewer.nextAvailable)}</span>
        </p>
      </div>

      {/* Action buttons */}
      <div className="p-4 flex gap-2">
        <Link
          href={`/interviewer/${interviewer.id}`}
          className="flex-1 text-center py-2 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-smooth text-xs uppercase tracking-widest font-light"
        >
          View Profile
        </Link>
        <button className="flex-1 py-2 bg-foreground text-background hover:opacity-90 transition-smooth text-xs uppercase tracking-widest font-light">
          Book ${interviewer.pricePerSession}
        </button>
      </div>
    </div>
  )
}
