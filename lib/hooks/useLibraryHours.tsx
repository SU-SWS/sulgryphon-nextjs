"use client"

import useDataFetch from "@/lib/hooks/useDataFetch";

export interface DayHours {
  day: string
  weekday: string
  closed: boolean
  opens_at?: string
  closes_at?: string
}

export interface LocationHours {
  name: string
  type: string
  primaryHours: DayHours[]
  additionalLocations: [
    {
      id: string
      name: string
      hours: DayHours[]
    }
  ]
}

const useLibraryHours = (branchId: string | null = null) => {
  const {isLoading, error, data: locations} = useDataFetch('/api/library-hours');

  if (isLoading) return [];
  if (error) return []

  return branchId ? locations[branchId] : locations;
}
export default useLibraryHours;