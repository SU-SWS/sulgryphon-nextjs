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

const useLibraryHours = (branchId: string | null = null): LocationHours[] | LocationHours => {
  const {isLoading, error, data} = useDataFetch('/api/library-hours');

  if (isLoading) return [];
  if (error) return []

  return branchId ? data[branchId] : data;
}
export default useLibraryHours;