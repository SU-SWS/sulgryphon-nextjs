import {useEffect, useState} from "react";
import axios from "axios";

export const useLibraryHours = () => {
  const [hours, setHours] = useState({});

  useEffect(() => {
    const fetchList = async () => {
      await axios.get('https://library-hours.stanford.edu/libraries.json')
        .then(result => {
          const locations = {};
          result.data.data.map(place => {
            locations[place.id.toLowerCase()] = {
              name: place.attributes.name,
              type: place.type,
              primary_hours: place.attributes.hours,
              locations: {}
            }
          })

          result.data.included.map(item => {
            const locationId = item.relationships?.library?.data?.id?.toLowerCase();
            locations[locationId].locations[item.id.toLowerCase()] = item.attributes.hours;
          });
          setHours(locations);
        })
    }
    fetchList();
  }, [])
  return hours;
}