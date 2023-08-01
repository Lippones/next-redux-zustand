'use client'
import { MessageCircle } from 'lucide-react'
import { ReactPlayer } from './components/Player'
import { Header } from './components/Header'
import { Module } from './components/Module'
import { useCurrentLesson, useStore } from './zustand-store'
import { useEffect } from 'react'

export default function Home() {
  const { load, course, isLoading } = useStore((state) => {
    return {
      load: state.load,
      course: state.course,
      isLoading: state.isLoading,
    }
  })
  const { currentLesson } = useCurrentLesson()

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    document.title = `Assistindo ${currentLesson?.title}`
  }, [currentLesson])

  return (
    <main className="flex h-screen items-center justify-center bg-zinc-950 text-zinc-50">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />
          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
            <MessageCircle className="h-4 w-4" />
            Deixar feedback
          </button>
        </div>
        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 pr-80 shadow">
          <div className="flex-1">
            <ReactPlayer controls width="100%" height="100%" />
          </div>
          <aside className="absolute bottom-0 right-0 top-0 w-80 divide-y-2 divide-zinc-900 overflow-y-auto border-l border-zinc-800 bg-zinc-900 scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            {isLoading ? (
              <div>
                <div className="flex h-20 w-full animate-pulse items-center gap-2 bg-zinc-800 px-4">
                  <div className="h-10 w-10 animate-pulse rounded-full bg-zinc-600"></div>
                  <div className="flex flex-col gap-1">
                    <div className="h-6 w-32 animate-pulse rounded bg-zinc-600"></div>
                    <div className="h-4 w-24 animate-pulse rounded bg-zinc-600"></div>
                  </div>
                </div>
              </div>
            ) : (
              course?.modules.map((module, index) => {
                return (
                  <Module
                    key={module.id}
                    amountOfLessons={module.lessons.length}
                    title={module.title}
                    moduleIndex={index}
                  />
                )
              })
            )}
          </aside>
        </main>
      </div>
    </main>
  )
}
