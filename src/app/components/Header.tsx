'use client'
import { useCurrentLesson, useStore } from '../zustand-store'

export function Header() {
  const { currentLesson, currentModule } = useCurrentLesson()

  const isLoading = useStore((store) => store.isLoading)

  if (isLoading) {
    return (
      <div className="flex flex-col gap-1">
        <div className="h-6 w-32 animate-pulse rounded bg-zinc-800"></div>
        <div className="h-4 w-24 animate-pulse rounded bg-zinc-800"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">{currentLesson?.title}</h1>
      <span className="text-sm text-zinc-400">{currentModule?.title}</span>
    </div>
  )
}
