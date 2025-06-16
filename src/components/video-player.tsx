
"use client"

import { useState, useRef, useEffect } from "react"
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

  // Handle play/pause
  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play().catch((err) => {
        console.error("Error playing video:", err)
      })
    }
    setIsPlaying(!isPlaying)
  }



  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = value[0]
    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  // Handle mute toggle
  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
    if (isMuted) {
      video.volume = volume || 0.5
    }
  }

  // Skip forward/backward with visual indicator
  const skip = (seconds: number) => {
    const video = videoRef.current
    if (!video) return

    const newTime = Math.min(Math.max(video.currentTime + seconds, 0), duration)
    video.currentTime = newTime
    setCurrentTime(newTime)

    // Show skip indicator
    setSkipIndicator(seconds > 0 ? "forward" : "backward")
    setTimeout(() => setSkipIndicator(null), 800)
  }

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

  // // Keyboard shortcuts
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
      className={cn("relative group w-full aspect-video bg-black rounded-lg overflow-hidden", className)}
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
            "absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent text-white transition-opacity duration-300",
            isControlsVisible ? "opacity-100" : "opacity-0",
          )}
        >
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
      )}

      {/* Play/Pause overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Button
            variant="ghost"
            size="icon"
            className="h-20 w-20 rounded-full bg-white/20 hover:bg-white/30 text-white"
            onClick={togglePlay}
          >
            <Play className="h-12 w-12 fill-white" />
          </Button>
        </div>
      )}

      {/* Skip indicators */}
      {skipIndicator && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-black/60 rounded-full p-6 text-white">
            {skipIndicator === "forward" ? (
              <div className="flex flex-col items-center">
                <SkipForward className="h-10 w-10" />
                <span className="text-lg font-bold mt-1">10s</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <SkipBack className="h-10 w-10" />
                <span className="text-lg font-bold mt-1">10s</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Controls */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300",
          isControlsVisible ? "opacity-100" : "opacity-0",
        )}
      >
        {/* Progress bar (disabled for seeking but still shows progress) */}
        <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: `${(currentTime / duration) * 100}%` }} />
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            {/* Play/Pause button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={togglePlay}>
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
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
                    className="text-white hover:bg-white/10"
                    onClick={() => skip(-10)}
                  >
                    <SkipBack className="h-5 w-5" />
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
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => skip(10)}>
                    <SkipForward className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Forward 10s (→)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Volume control - perfectly aligned */}
            <div className="flex items-center gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/10 h-9 w-9 p-0"
                      onClick={toggleMute}
                    >
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Mute (m)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="w-20 hidden sm:flex items-center">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="[&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&>span:first-child_span]:bg-white"
                />
              </div>
            </div>

            {/* Time display */}
            <div className="text-white text-sm ml-2">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Playback speed */}
            <DropdownMenu open={speedMenuOpen} onOpenChange={setSpeedMenuOpen}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 text-xs">
                        {playbackSpeed}x
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Playback speed</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent className="min-w-[120px]">
                {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
                  <DropdownMenuItem
                    key={speed}
                    onClick={() => changePlaybackSpeed(speed)}
                    className="flex justify-between"
                  >
                    {speed}x{playbackSpeed === speed && <Check className="h-4 w-4" />}
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
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                        <Settings className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Quality</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent className="min-w-[150px]">
                {["auto", "1080p", "720p", "480p", "360p"].map((quality) => (
                  <DropdownMenuItem
                    key={quality}
                    onClick={() => setVideoQuality(quality)}
                    className="flex justify-between"
                  >
                    {quality}
                    {videoQuality === quality && <Check className="h-4 w-4" />}
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
                    className="text-white hover:bg-white/10"
                    onClick={togglePictureInPicture}
                  >
                    <PictureInPicture className="h-5 w-5" />
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
                    className="text-white hover:bg-white/10"
                    onClick={toggleFullscreen}
                  >
                    <Maximize className="h-5 w-5" />
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

