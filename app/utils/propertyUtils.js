export function normalizeProperty(property, index) {
  const address = property.address ?? {};
  const sourceId = property._id ?? property.id;
  const bedrooms = Number(property.bedrooms ?? property.beds ?? 0);
  const bathrooms = Number(property.bathrooms ?? property.baths ?? 0);
  const parkingSpaces = Number(property.parkingSpaces ?? property.garage ?? 0);
  const suites = Number(property.suites ?? Math.max(0, bedrooms - 2));
  const area = Number(property.area ?? 0);
  const image = property.imageUrl ?? property.image;
  const country = pickText(address.country, property.addressCountry, property.address_country, property.country, "Brasil");
  const city = pickText(address.city, property.addressCity, property.address_city, property.city);
  const regionCandidate = pickText(address.state, property.addressState, property.address_state, property.state, property.region);
  const region = regionCandidate && regionCandidate !== city ? regionCandidate : "";
  const neighborhood = pickText(
    address.district,
    property.addressDistrict,
    property.address_district,
    property.district,
    property.neighborhood,
  );
  const cityState = city && region ? `${city} - ${region}` : city;

  return {
    id: sourceId ? String(sourceId) : `property-${index}`,
    key: sourceId ? `${sourceId}-${index}` : `property-${index}`,
    title: property.title ?? `Imovel ${index + 1}`,
    type: property.type ?? "Imovel",
    status: property.status ?? "Venda",
    price: Number(property.price ?? 0),
    locationText:
      property.locationText ?? [address.street, address.district, cityState].filter(Boolean).join(", "),
    country,
    city,
    region,
    neighborhood,
    beds: bedrooms,
    baths: bathrooms,
    suites,
    garage: parkingSpaces,
    area,
    image,
    images: property.images ?? property.gallery ?? [image].filter(Boolean),
    broker: property.broker ?? {
      name: "Helena Alvez",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    },
    description: property.description ?? "",
    mapLocation: property.location ?? { lat: -1.45583, lng: -48.50389 },
  };
}

export function uniqueOptions(properties, key) {
  return [...new Set(
    properties.map((property) => property[key]).filter((value) => value && value.trim() !== "")
  )].sort();
}

function pickText(...values) {
  for (const value of values) {
    if (typeof value === "string" && value.trim() !== "") {
      return value.trim();
    }
  }

  return "";
}
