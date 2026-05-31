import { Metadata } from 'next'
import InterviewersGrid from '@/components/interviewers/interviewers-grid'
import FindCoachesHeader from '@/components/interviewers/find-coaches-header'

export const metadata: Metadata = {
  title: 'Find Coaches - InterviewHub',
  description: 'Browse and filter interview coaches from top tech companies. Find the perfect coach for your preparation.',
}

export default function FindInterviewersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with search */}
      <FindCoachesHeader />

      {/* Content */}
      <div className="px-4 sm:px-8 lg:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <InterviewersGrid />
        </div>
      </div>
    </div>
  )
}
