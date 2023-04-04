"use client"

import {deserialize} from "@/lib/drupal/deserialize";
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

export interface LibraryHoursType {
  [key: string]: LocationHours
}

const useLibraryHours = (branchId: string | null = null) => {
  const {isLoading, error, data} = useDataFetch('https://library-hours.stanford.edu/libraries.json');

  if (isLoading) return [];
  if (error) return []


  const deserializedData = deserialize(data);
  if (!deserializedData) {
    return [];
  }

  const locations = {};
  deserializedData.map(place => {
    locations[place.id.toLowerCase()] = {
      name: place.name,
      type: place.type,
      primaryHours: place.hours,
      additionalLocations: []
    }

    place.locations.map(additionalPlace => {
      const location = data.included.find(a => a.id == additionalPlace.id);

      if (location.attributes.primary) {
        return;
      }
      locations[place.id.toLowerCase()].additionalLocations.push({
        id: additionalPlace.id.toLowerCase(),
        name: additionalPlace.name,
        hours: location.attributes.hours
      })
    })
  });
  return branchId ? locations[branchId] : locations;
}
export default useLibraryHours;