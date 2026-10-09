"use client"

import useDataFetch from "@/lib/hooks/useDataFetch"

export type DayHours = {
  day: string
  weekday: string
  closed: boolean
  opens_at?: string
  closes_at?: string
}

export type LocationHours = {
  name: string
  type: string
  primaryHours: DayHours[]
  additionalLocations: {
    id: string
    name: string
    hours: DayHours[]
  }[]
}

// Stable while loading, so components that memoize on the hours don't recompute every render.
const NO_HOURS: Record<string, LocationHours> = {}

/**
 * Opening hours for every location from /api/library-hours, keyed by location id. Empty until loaded.
 */
export const useAllLibraryHours = (): Record<string, LocationHours> =>
  useDataFetch<Record<string, LocationHours>>("/api/library-hours").data ?? NO_HOURS

/**
 * Opening hours for one branch, e.g. `green`, or `green/location` for an additional location within
 * that branch. `undefined` while loading or if the branch is unknown.
 */
const useLibraryHours = (branchId?: string): LocationHours | undefined => {
  const hours = useAllLibraryHours()
  // Additional locations are listed under their branch, and the API keys branches in lowercase.
  return branchId ? hours[branchId.split("/")[0].toLowerCase()] : undefined
}

export default useLibraryHours
