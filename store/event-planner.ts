import { atom } from "jotai"

export interface EventFormData {
  overview: string
  budgetMin: number
  budgetMax: number
  guestsMin: number
  guestsMax: number
  eventDate: Date | undefined
  eventTimeStart: string
  eventTimeEnd: string
  mustHaves: string
  niceToHaves: string
  thingsToAvoid: string
  dietaryRestrictions: string
  specialNeeds: string
}

export interface EventConcept {
  id: string
  title: string
  description: string
  theme: string
  location: string
  budgetLevel: "Budget-friendly" | "Balanced" | "Premium"
  tags: string[]
}

export interface Vendor {
  id: string
  name: string
  type: string
  reasoning: string
}

export interface VendorCategory {
  id: string
  name: string
  vendors: Vendor[]
}

export interface VendorSelectionData {
  vendorFeedback: string
  categories: VendorCategory[]
}

export interface ConceptGenerationData {
  additionalIdeas: string
  concepts: EventConcept[]
  selectedConceptId: string | null
  feedbackLiked: string
  feedbackDisliked: string
  showFeedbackForm: boolean
}

export const eventFormAtom = atom<EventFormData>({
  overview: "",
  budgetMin: 0,
  budgetMax: 5000,
  guestsMin: 0,
  guestsMax: 100,
  eventDate: undefined,
  eventTimeStart: "",
  eventTimeEnd: "",
  mustHaves: "",
  niceToHaves: "",
  thingsToAvoid: "",
  dietaryRestrictions: "",
  specialNeeds: "",
})

export const conceptGenerationAtom = atom<ConceptGenerationData>({
  additionalIdeas: "",
  concepts: [],
  selectedConceptId: null,
  feedbackLiked: "",
  feedbackDisliked: "",
  showFeedbackForm: false,
})

export const vendorSelectionAtom = atom<VendorSelectionData>({
  vendorFeedback: "",
  categories: [],
})

// Mock concept generation - simulates AI generation
export const generateMockConcepts = (): EventConcept[] => [
  {
    id: "1",
    title: "Elegant Rooftop Dinner",
    description: "An intimate dining experience under the stars with sophisticated décor and ambient lighting.",
    theme: "Modern Elegance",
    location: "Downtown rooftop venue with city views",
    budgetLevel: "Premium",
    tags: ["Intimate", "Modern", "Sophisticated", "Evening"],
  },
  {
    id: "2",
    title: "Garden Party Celebration",
    description: "A relaxed outdoor gathering with natural beauty, string lights, and casual dining.",
    theme: "Natural & Rustic",
    location: "Botanical garden or outdoor park",
    budgetLevel: "Balanced",
    tags: ["Casual", "Outdoor", "Natural", "Relaxed"],
  },
  {
    id: "3",
    title: "Beach Sunset Gathering",
    description: "A laid-back beachside celebration with ocean views, bonfire, and coastal vibes.",
    theme: "Coastal Casual",
    location: "Beachfront with sunset views",
    budgetLevel: "Budget-friendly",
    tags: ["Casual", "Outdoor", "Relaxed", "Scenic"],
  },
  {
    id: "4",
    title: "Industrial Chic Celebration",
    description: "A trendy urban event in a converted warehouse space with modern touches.",
    theme: "Urban Industrial",
    location: "Converted warehouse or loft space",
    budgetLevel: "Balanced",
    tags: ["Modern", "Urban", "Trendy", "Spacious"],
  },
  {
    id: "5",
    title: "Classic Ballroom Affair",
    description: "A traditional elegant celebration with formal dining and classic décor.",
    theme: "Timeless Elegance",
    location: "Hotel ballroom or event hall",
    budgetLevel: "Premium",
    tags: ["Formal", "Traditional", "Elegant", "Grand"],
  },
]

export const generateMockVendors = (): VendorCategory[] => [
  {
    id: "venue",
    name: "Venue",
    vendors: [
      {
        id: "v1",
        name: "Grand Ballroom at The Plaza",
        type: "Elegant hotel ballroom",
        reasoning:
          "Perfect for your guest count with a sophisticated atmosphere and excellent catering options within your budget range.",
      },
      {
        id: "v2",
        name: "Sunset Rooftop Terrace",
        type: "Open-air rooftop venue",
        reasoning:
          "Offers stunning city views and natural ambiance, ideal for creating memorable moments under the stars.",
      },
      {
        id: "v3",
        name: "The Garden Estate",
        type: "Outdoor garden venue",
        reasoning:
          "Beautiful natural setting with flexible layout options, great for both intimate and larger celebrations.",
      },
    ],
  },
  {
    id: "catering",
    name: "Catering",
    vendors: [
      {
        id: "c1",
        name: "Artisan Cuisine Co.",
        type: "Full-service catering with dietary accommodations",
        reasoning:
          "Specializes in customizable menus including gluten-free options, matching your must-haves perfectly.",
      },
      {
        id: "c2",
        name: "Farm-to-Table Catering",
        type: "Organic local ingredients",
        reasoning: "Fresh, seasonal menu with excellent presentation, fits well within your balanced budget approach.",
      },
      {
        id: "c3",
        name: "Classic Elegance Catering",
        type: "Traditional fine dining service",
        reasoning:
          "Proven track record with formal events, offers elegant plated dinners ideal for your celebration style.",
      },
    ],
  },
  {
    id: "entertainment",
    name: "Entertainment",
    vendors: [
      {
        id: "e1",
        name: "Jazz Quartet Ensemble",
        type: "Live jazz band",
        reasoning: "Creates sophisticated ambiance perfect for dinner events, can adjust volume for conversation.",
      },
      {
        id: "e2",
        name: "DJ Marcus Events",
        type: "Professional event DJ",
        reasoning:
          "Versatile music selection with modern sound system, keeps energy flowing throughout your celebration.",
      },
      {
        id: "e3",
        name: "Acoustic Duo",
        type: "Live acoustic musicians",
        reasoning: "Intimate live music that complements dining, perfect for creating a warm, personal atmosphere.",
      },
    ],
  },
  {
    id: "decor",
    name: "Decor",
    vendors: [
      {
        id: "d1",
        name: "Elegant Occasions Decor",
        type: "Full-service event styling",
        reasoning:
          "Specializes in sophisticated color palettes and ambient lighting, can avoid specific colors you mentioned.",
      },
      {
        id: "d2",
        name: "Bloom & Co. Florals",
        type: "Premium floral design",
        reasoning: "Creates stunning centerpieces and arrangements that elevate any venue within your budget.",
      },
      {
        id: "d3",
        name: "Modern Minimalist Design",
        type: "Contemporary event styling",
        reasoning: "Clean, elegant aesthetic with focus on quality over quantity, perfect for a refined celebration.",
      },
    ],
  },
]
