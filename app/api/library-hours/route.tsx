
import {deserialize} from "@/lib/drupal/deserialize";
import {NextResponse} from "next/server";

export const GET = async () => {
  const data = await fetch('https://library-hours.stanford.edu/libraries.json')
    .then(res => res.json())
    .catch(e => {
      console.error(e);
      return NextResponse.json([]);
    });

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
  return NextResponse.json(locations);
}