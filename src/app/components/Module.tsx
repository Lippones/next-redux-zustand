'use client'
import { ChevronDown } from 'lucide-react'
import { Lesson } from './Lesson'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useStore } from '../zustand-store'

interface ModuleProps {
  title: string
  amountOfLessons: number
  moduleIndex: number
}

export function Module({ amountOfLessons, moduleIndex, title }: ModuleProps) {
  const { currentLessonIndex, currentModuleIndex, play, lessons } = useStore(
    (state) => {
      return {
        currentLessonIndex: state.currentLessonIndex,
        currentModuleIndex: state.currentModuleIndex,
        play: state.play,
        lessons: state.course?.modules[moduleIndex].lessons,
      }
    },
  )

  return (
    <Collapsible.Root className="group">
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </span>
        <div className="flex flex-col gap-1 text-left">
          <strong>{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons}</span>
        </div>
        <ChevronDown className="ml-auto h-5 w-5 text-zinc-400 group-data-[state=open]:rotate-180" />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons?.map((lesson, lessonIndex) => {
            const isCurrent =
              currentModuleIndex === moduleIndex &&
              currentLessonIndex === lessonIndex
            return (
              <Lesson
                key={lesson.id}
                duration={lesson.duration}
                title={lesson.title}
                onPlay={() => play([moduleIndex, lessonIndex])}
                isCurrent={isCurrent}
              />
            )
          })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
