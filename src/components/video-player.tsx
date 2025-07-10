
"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipForward,
  SkipBack,
  Settings,
  PictureInPicture,
  Check,
} from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface VideoPlayerProps {
  src: string
  poster?: string
  title?: string
  onComplete?: () => void
  className?: string
}

export function VideoPlayer({ src, poster, title, onComplete, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isControlsVisible, setIsControlsVisible] = useState(true)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [skipIndicator, setSkipIndicator] = useState<"forward" | "backward" | null>(null)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [speedMenuOpen, setSpeedMenuOpen] = useState(false)
  const [videoQuality, setVideoQuality] = useState("auto")
  const [qualityMenuOpen, setQualityMenuOpen] = useState(false)

  // Initialize video
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Set initial volume to ensure audio works
    video.volume = volume
    video.muted = isMuted

    const onLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      // Check if video is complete
      if (video.currentTime >= video.duration - 0.5) {
        if (onComplete) onComplete()
      }
    }

    video.addEventListener("loadedmetadata", onLoadedMetadata)
    video.addEventListener("timeupdate", onTimeUpdate)

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata)
      video.removeEventListener("timeupdate", onTimeUpdate)
    }
  }, [onComplete, volume, isMuted])

  const togglePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play().catch((err) => {
        console.error("Error playing video:", err)
      })
    }
    setIsPlaying((prev) => !prev)
  }, [isPlaying])

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = value[0]
    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    setIsMuted((prev) => {
      const newMuted = !prev
      video.muted = newMuted
      // If unmuting and volume is 0, set to default (e.g. 0.5)
      if (!newMuted && volume === 0) {
        video.volume = 0.5
        setVolume(0.5)
      }
      return newMuted
    })
  }, [volume])

  const skip = useCallback(
    (seconds: number) => {
      const video = videoRef.current
      if (!video) return

      const newTime = Math.min(Math.max(video.currentTime + seconds, 0), duration)
      video.currentTime = newTime
      setCurrentTime(newTime)
      setSkipIndicator(seconds > 0 ? "forward" : "backward")
      setTimeout(() => setSkipIndicator(null), 800)
    },
    [duration],
  )

  // Toggle fullscreen
  const toggleFullscreen = () => {
    const videoContainer = document.getElementById("video-container")
    if (!videoContainer) return

    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  // Change playback speed
  const changePlaybackSpeed = (speed: number) => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = speed
    setPlaybackSpeed(speed)
    setSpeedMenuOpen(false)
  }

  // Toggle picture-in-picture
  const togglePictureInPicture = async () => {
    const video = videoRef.current
    if (!video) return

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
      } else {
        await video.requestPictureInPicture()
      }
    } catch (error) {
      console.error("Picture-in-Picture failed:", error)
    }
  }

  // Auto-hide controls
  const showControls = () => {
    setIsControlsVisible(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setIsControlsVisible(false)
      }, 3000)
    }
  }

  // Format time (seconds to MM:SS)
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!videoRef.current) return

      switch (e.key.toLowerCase()) {
        case " ":
        case "k":
          e.preventDefault()
          togglePlay()
          break
        case "f":
          e.preventDefault()
          toggleFullscreen()
          break
        case "m":
          e.preventDefault()
          toggleMute()
          break
        case "arrowright":
          e.preventDefault()
          skip(10)
          break
        case "arrowleft":
          e.preventDefault()
          skip(-10)
          break
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          e.preventDefault()
          const percent = Number.parseInt(e.key) * 10
          videoRef.current.currentTime = (duration * percent) / 100
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [duration, togglePlay, toggleMute, skip])

  return (
    <div
      id="video-container"
      className={cn("relative group w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl", className)}
      onMouseMove={showControls}
      onMouseLeave={() => isPlaying && setIsControlsVisible(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-contain"
        onClick={togglePlay}
        playsInline
      />

      {/* Title overlay */}
      {title && (
        <div
          className={cn(
            "absolute top-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-b from-black/70 to-transparent text-white transition-opacity duration-300",
            isControlsVisible ? "opacity-100" : "opacity-0",
          )}
        >
          <h3 className="text-sm sm:text-lg font-medium truncate">{title}</h3>
        </div>
      )}

      {/* Play/Pause overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200"
            onClick={togglePlay}
          >
            <Play className="h-6 w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 fill-white" />
          </Button>
        </div>
      )}

      {/* Skip indicators */}
      {skipIndicator && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-black/60 rounded-full p-3 sm:p-4 lg:p-6 text-white">
            {skipIndicator === "forward" ? (
              <div className="flex flex-col items-center">
                <SkipForward className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10" />
                <span className="text-sm sm:text-base lg:text-lg font-bold mt-1">10s</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <SkipBack className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10" />
                <span className="text-sm sm:text-base lg:text-lg font-bold mt-1">10s</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Controls */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-2 sm:p-3 lg:p-4 transition-opacity duration-300",
          isControlsVisible ? "opacity-100" : "opacity-0",
        )}
      >
        {/* Progress bar */}
        <div className="w-full h-1 sm:h-1.5 bg-white/30 rounded-full overflow-hidden mb-2 sm:mb-3">
          <div
            className="h-full bg-primary rounded-full transition-all duration-150"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>

        {/* Main controls container */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
          {/* Left controls */}
          <div className="flex items-center gap-1 sm:gap-2 order-2 sm:order-1">
            {/* Play/Pause button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10 h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10"
                    onClick={togglePlay}
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                    ) : (
                      <Play className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Play/Pause (k)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Skip backward */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10 h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10"
                    onClick={() => skip(-10)}
                  >
                    <SkipBack className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Rewind 10s (←)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Skip forward */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10 h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10"
                    onClick={() => skip(10)}
                  >
                    <SkipForward className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Forward 10s (→)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Volume control */}
            <div className="flex items-center gap-1 sm:gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/10 h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10"
                      onClick={toggleMute}
                    >
                      {isMuted ? (
                        <VolumeX className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                      ) : (
                        <Volume2 className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Mute (m)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="w-12 sm:w-16 lg:w-20 hidden md:flex items-center">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="[&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-2 [&_[role=slider]]:h-2 sm:[&_[role=slider]]:w-3 sm:[&_[role=slider]]:h-3 [&>span:first-child_span]:bg-white"
                />
              </div>
            </div>

            {/* Time display */}
            <div className="text-white text-xs sm:text-sm lg:text-base ml-1 sm:ml-2 font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2">
            {/* Playback speed */}
            <DropdownMenu open={speedMenuOpen} onOpenChange={setSpeedMenuOpen}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/10 text-xs sm:text-sm h-7 sm:h-8 lg:h-9 px-2 sm:px-3"
                      >
                        {playbackSpeed}x
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Playback speed</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent className="min-w-[100px] sm:min-w-[120px]">
                {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
                  <DropdownMenuItem
                    key={speed}
                    onClick={() => changePlaybackSpeed(speed)}
                    className="flex justify-between text-xs sm:text-sm"
                  >
                    {speed}x{playbackSpeed === speed && <Check className="h-3 w-3 sm:h-4 sm:w-4" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Quality selector */}
            <DropdownMenu open={qualityMenuOpen} onOpenChange={setQualityMenuOpen}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/10 h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10"
                      >
                        <Settings className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Quality</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent className="min-w-[120px] sm:min-w-[150px]">
                {["auto", "1080p", "720p", "480p", "360p"].map((quality) => (
                  <DropdownMenuItem
                    key={quality}
                    onClick={() => setVideoQuality(quality)}
                    className="flex justify-between text-xs sm:text-sm"
                  >
                    {quality}
                    {videoQuality === quality && <Check className="h-3 w-3 sm:h-4 sm:w-4" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Picture-in-Picture */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10 h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 hidden sm:flex"
                    onClick={togglePictureInPicture}
                  >
                    <PictureInPicture className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Picture-in-Picture</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Fullscreen button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10 h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10"
                    onClick={toggleFullscreen}
                  >
                    <Maximize className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Fullscreen (f)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  )
}
