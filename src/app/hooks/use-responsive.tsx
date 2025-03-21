"use client"

import { useState, useEffect } from "react"

type DeviceSize =
  | "xs-phone" // < 360px
  | "small-phone" // 360-374px
  | "medium-phone" // 375-413px
  | "large-phone" // 414-479px
  | "xl-phone" // 480-599px
  | "small-tablet" // 600-767px
  | "medium-tablet" // 768-799px
  | "large-tablet" // 800-1199px
  | "xl-tablet" // 1200-1365px
  | "small-laptop" // 1366-1439px
  | "medium-laptop" // 1440-1599px
  | "large-laptop" // 1600-1919px
  | "full-hd" // 1920-2559px
  | "quad-hd" // 2560-3839px
  | "uhd-4k" // 3840+px
  | "ultra-wide" // 21:9 aspect ratio
  | "ultra-wide-qhd" // 21:9 aspect ratio with QHD
  | "ultra-wide-4k" // 21:9 aspect ratio with 4K

export function useResponsive() {
  const [deviceSize, setDeviceSize] = useState<DeviceSize | null>(null)
  const [width, setWidth] = useState<number | null>(null)
  const [height, setHeight] = useState<number | null>(null)
  const [aspectRatio, setAspectRatio] = useState<number | null>(null)
  const [isUltraWide, setIsUltraWide] = useState(false)

  useEffect(() => {
    // Function to update all dimensions
    const updateDimensions = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const ratio = width / height

      setWidth(width)
      setHeight(height)
      setAspectRatio(ratio)
      setIsUltraWide(ratio >= 2.3) // Approximately 21:9 ratio

      // Determine device size
      if (width < 360) {
        setDeviceSize("xs-phone")
      } else if (width >= 360 && width < 375) {
        setDeviceSize("small-phone")
      } else if (width >= 375 && width < 414) {
        setDeviceSize("medium-phone")
      } else if (width >= 414 && width < 480) {
        setDeviceSize("large-phone")
      } else if (width >= 480 && width < 600) {
        setDeviceSize("xl-phone")
      } else if (width >= 600 && width < 768) {
        setDeviceSize("small-tablet")
      } else if (width >= 768 && width < 800) {
        setDeviceSize("medium-tablet")
      } else if (width >= 800 && width < 1200) {
        setDeviceSize("large-tablet")
      } else if (width >= 1200 && width < 1366) {
        setDeviceSize("xl-tablet")
      } else if (width >= 1366 && width < 1440) {
        setDeviceSize("small-laptop")
      } else if (width >= 1440 && width < 1600) {
        setDeviceSize("medium-laptop")
      } else if (width >= 1600 && width < 1920) {
        setDeviceSize("large-laptop")
      } else if (width >= 1920 && width < 2560) {
        setDeviceSize("full-hd")
      } else if (width >= 2560 && width < 3840) {
        if (ratio >= 2.3) {
          setDeviceSize("ultra-wide")
        } else {
          setDeviceSize("quad-hd")
        }
      } else if (width >= 3440 && width < 5120 && ratio >= 2.3) {
        setDeviceSize("ultra-wide-qhd")
      } else if (width >= 3840) {
        if (ratio >= 2.3 && width >= 5120) {
          setDeviceSize("ultra-wide-4k")
        } else {
          setDeviceSize("uhd-4k")
        }
      }
    }

    // Initial update
    updateDimensions()

    // Add event listener
    window.addEventListener("resize", updateDimensions)

    // Cleanup
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Helper functions
  const isPhone = deviceSize?.includes("phone") || false
  const isTablet = deviceSize?.includes("tablet") || false
  const isLaptop = deviceSize?.includes("laptop") || false
  const isDesktop =
    deviceSize === "full-hd" ||
    deviceSize === "quad-hd" ||
    deviceSize === "uhd-4k" ||
    deviceSize?.includes("ultra-wide") ||
    false

  return {
    deviceSize,
    width,
    height,
    aspectRatio,
    isUltraWide,
    isPhone,
    isTablet,
    isLaptop,
    isDesktop,
  }
}

