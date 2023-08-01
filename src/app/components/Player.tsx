'use client'
import dynamic from 'next/dynamic'
import { ReactPlayerProps } from 'react-player'
import { Loader } from 'lucide-react'
import { useCurrentLesson, useStore } from '../zustand-store'
const Player = dynamic(() => import('react-player'), { ssr: false })

type Props = ReactPlayerProps

export function ReactPlayer({ ...rest }: Props) {
  const { currentLesson } = useCurrentLesson()
  const { isLoading, next } = useStore((state) => {
    return {
      isLoading: state.isLoading,
      next: state.next,
    }
  })

  return (
    <div className="aspect-video w-full bg-zinc-950">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader className="h-6 w-6 animate-spin text-zinc-400" />
        </div>
      ) : (
        <Player
          {...rest}
          onEnded={next}
          playing
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
        />
      )}
    </div>
  )
}
