"use client"

import {useEffect, useState} from "react";
import axios from "axios";
import {deserialize} from "@/lib/drupal/deserialize";

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
  const [hours, setHours] = useState({});

  useEffect(() => {
    const fetchList = async () => {
      await axios.get('https://library-hours.stanford.edu/libraries.json')
        .then(result => {

          const deserializedData = deserialize(result.data);
          if (!deserializedData) {
            return;
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
              const location = result.data.included.find(a => a.id == additionalPlace.id);

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
          setHours(branchId ? locations[branchId] as LocationHours : locations as LibraryHoursType);
        })
    }
    fetchList();
  }, [branchId])
  return hours;
}
export default useLibraryHours;