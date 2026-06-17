export type PropertyOverviewField = {
  label: string
  value: string
}

export type PropertyFeatureId =
  | "pool"
  | "fireplace"
  | "bar"
  | "double-bath-tub"
  | "garden"
  | "parking"
  | "wifi"

export type PropertyFeature = {
  id: PropertyFeatureId
  label: string
}

export type PropertyDetails = {
  fetchUrlPrefix: string
  fetchSlug: string
  overview: PropertyOverviewField[]
  features: PropertyFeature[]
  description: string[]
}

export const WILLOWCROFT_HOUSE_DETAILS: PropertyDetails = {
  fetchUrlPrefix: "https://www.cottages.com/cottages/",
  fetchSlug: "willowcroft-house-ambleside-sf17",
  overview: [
    { label: "Type", value: "House" },
    { label: "Grade", value: "5" },
    { label: "Location", value: "Ambleside" },
    { label: "Guests", value: "6" },
    { label: "Bedrooms", value: "3" },
    { label: "Bathrooms", value: "2" },
    { label: "Pets", value: "Allowed" },
  ],
  features: [
    { id: "pool", label: "Swimming pool" },
    { id: "fireplace", label: "Fireplace" },
    { id: "bar", label: "Bar area" },
    { id: "double-bath-tub", label: "Double bath tub" },
    { id: "garden", label: "Garden" },
    { id: "parking", label: "Private parking" },
    { id: "wifi", label: "Wi-Fi" },
  ],
  description: [
    "Willowcroft House is a beautifully restored five-star retreat in the heart of Ambleside, offering contemporary comfort within walking distance of Lake Windermere and the surrounding fells.",
    "Ground floor: Open-plan living and dining area with a wood-burning fireplace, fully equipped kitchen with electric cooker, microwave, fridge/freezer, dishwasher, washing machine and tumble dryer, and a dedicated bar area with wine fridge and seating for six.",
    "First floor: Bedroom 1 with king-size bed and en-suite shower room, Bedroom 2 with double bed, Bedroom 3 with twin beds, and a family bathroom with bath and separate shower.",
    "Outside: Heated swimming pool (April–October), double bath tub, landscaped garden with patio dining, and private parking for two cars. Gas central heating, electricity, bed linen and towels included. Wi-Fi throughout. No smoking.",
    "Ambleside village centre is a five-minute walk with shops, pubs and restaurants. Brockhole, Grasmere and Coniston Water are within easy reach, and the property sits on the edge of the Lake District National Park.",
  ],
}
