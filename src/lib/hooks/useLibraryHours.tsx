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

const useLibraryHours = <T extends Record<string, LocationHours> | LocationHours>(branchId?: string): T => {
  const {isLoading, isError, data} = useDataFetch<Record<string, LocationHours>>("/api/library-hours")
  if (isError || isLoading || !data) return {} as T
  return (branchId ? data[branchId] : data) as T
}
export default useLibraryHours
