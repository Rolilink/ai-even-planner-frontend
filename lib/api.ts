import { EventFormData, EventConcept, VendorCategory, Vendor } from "@/store/event-planner"

// API Types based on OpenAPI schema
interface ApiConcept {
  name: string
  description: string
}

interface ApiIdea {
  name: string
  explanation: string
}

interface ApiVendor {
  category: string
  description: string
  ideas: ApiIdea[]
}

interface VendorPayload {
  event_profile: EventProfile
  user_feedback?: string | null
}

interface EventProfile {
  description: string
  min_budget: number
  max_budget: number
  min_guests: number
  max_guests: number
  event_datetime: string
  must_haves: string[]
  nice_to_haves: string[]
  things_to_avoid: string[]
  special_needs: string
  restrictions: string
  concept?: string | null
}

interface ConceptsPayload {
  event_ideas: string
  event_profile: EventProfile
  user_feedback?: string | null
}

/**
 * Transforms frontend EventFormData to API EventProfile format
 */
function transformEventDataToProfile(eventData: EventFormData): EventProfile {
  // Parse must_haves, nice_to_haves, and things_to_avoid from strings to arrays
  const parseList = (str: string): string[] => {
    if (!str.trim()) return []
    return str
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
  }

  // Format datetime string from date and time
  const formatDateTime = (): string => {
    if (!eventData.eventDate) {
      return ""
    }
    const date = new Date(eventData.eventDate)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    
    // Combine date with start time if available
    const timePart = eventData.eventTimeStart || "00:00"
    return `${year}-${month}-${day}T${timePart}:00`
  }

  return {
    description: eventData.overview || "",
    min_budget: eventData.budgetMin,
    max_budget: eventData.budgetMax,
    min_guests: eventData.guestsMin,
    max_guests: eventData.guestsMax,
    event_datetime: formatDateTime(),
    must_haves: parseList(eventData.mustHaves),
    nice_to_haves: parseList(eventData.niceToHaves),
    things_to_avoid: parseList(eventData.thingsToAvoid),
    special_needs: eventData.specialNeeds || "",
    restrictions: eventData.dietaryRestrictions || "",
    concept: null,
  }
}

/**
 * Transforms API Concept response to frontend EventConcept format
 */
function transformApiConceptToEventConcept(apiConcept: ApiConcept, index: number): EventConcept {
  return {
    id: `concept-${index + 1}-${Date.now()}`,
    title: apiConcept.name,
    description: apiConcept.description,
    theme: "", // Not provided by API, will be empty
    location: "", // Not provided by API, will be empty
    budgetLevel: "Balanced" as const, // Default value, not provided by API
    tags: [], // Not provided by API, will be empty
  }
}

export async function generateConcepts(
  eventData: EventFormData,
  additionalIdeas: string,
  userFeedback?: string | null,
  userId?: string
): Promise<EventConcept[]> {
  // Use Next.js API route as proxy to avoid CORS issues
  // The API route will forward the request to the ngrok URL
  const apiUrl = "/api/concepts"
  
  // Build query parameters
  const userIdParam = userId || "default-user" // Default user ID if not provided
  const urlWithParams = `${apiUrl}?user_id=${encodeURIComponent(userIdParam)}`
  
  // Transform data to match API schema
  const eventProfile = transformEventDataToProfile(eventData)
  
  const requestBody: ConceptsPayload = {
    event_ideas: additionalIdeas || "",
    event_profile: eventProfile,
    user_feedback: userFeedback || null,
  }

  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }
    
    const response = await fetch(urlWithParams, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      } catch {
        const errorText = await response.text()
        errorData = { error: `API error: ${response.status} ${response.statusText}`, details: errorText }
      }
      
      console.error("[API] Error response:", errorData)
      
      // Provide user-friendly error messages
      if (errorData.message) {
        throw new Error(errorData.message)
      } else if (errorData.error === "Backend server connection failed") {
        throw new Error("Backend server is not running. Please start your FastAPI server on port 8000.")
      } else {
        throw new Error(errorData.error || `API error: ${response.status} ${response.statusText}`)
      }
    }

    const apiConcepts: ApiConcept[] = await response.json()
    
    // Transform API response to frontend format
    return apiConcepts.map((concept, index) => transformApiConceptToEventConcept(concept, index))
  } catch (error) {
    console.error("[API] Error generating concepts:", error)
    throw error
  }
}

/**
 * Transforms API Vendor response to frontend VendorCategory format
 */
function transformApiVendorsToVendorCategories(apiVendors: ApiVendor[]): VendorCategory[] {
  // Group vendors by category
  const categoryMap = new Map<string, Vendor[]>()
  
  apiVendors.forEach((apiVendor, vendorIndex) => {
    const categoryName = apiVendor.category
    
    // Each idea becomes a vendor in the frontend
    apiVendor.ideas.forEach((idea, ideaIndex) => {
      if (!categoryMap.has(categoryName)) {
        categoryMap.set(categoryName, [])
      }
      
      const vendors = categoryMap.get(categoryName)!
      vendors.push({
        id: `vendor-${vendorIndex}-${ideaIndex}-${Date.now()}`,
        name: idea.name,
        type: idea.name, // Use the vendor name from ideas array, not the category description
        reasoning: idea.explanation,
      })
    })
  })
  
  // Convert map to VendorCategory array
  return Array.from(categoryMap.entries()).map(([categoryName, vendors], index) => ({
    id: `category-${index}-${Date.now()}`,
    name: categoryName,
    vendors,
  }))
}

export async function generateVendors(
  eventData: EventFormData,
  userFeedback?: string | null,
  userId?: string
): Promise<VendorCategory[]> {
  console.log("[API] generateVendors called with eventData:", eventData, "userFeedback:", userFeedback)
  
  // Use Next.js API route as proxy to avoid CORS issues
  const apiUrl = "/api/vendors"
  
  // Build query parameters
  const userIdParam = userId || "default-user"
  const urlWithParams = `${apiUrl}?user_id=${encodeURIComponent(userIdParam)}`
  
  // Transform data to match API schema
  const eventProfile = transformEventDataToProfile(eventData)
  
  const requestBody: VendorPayload = {
    event_profile: eventProfile,
    user_feedback: userFeedback || null,
  }

  console.log("[API] Making vendors request to:", urlWithParams)
  console.log("[API] Request body:", JSON.stringify(requestBody, null, 2))

  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }
    
    const response = await fetch(urlWithParams, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      } catch {
        const errorText = await response.text()
        errorData = { error: `API error: ${response.status} ${response.statusText}`, details: errorText }
      }
      
      console.error("[API] Error response:", errorData)
      
      // Provide user-friendly error messages
      if (errorData.message) {
        throw new Error(errorData.message)
      } else if (errorData.error === "Backend server connection failed") {
        throw new Error("Backend server is not running. Please start your FastAPI server on port 8000.")
      } else {
        throw new Error(errorData.error || `API error: ${response.status} ${response.statusText}`)
      }
    }

    const apiVendors: ApiVendor[] = await response.json()
    console.log("[API] Received vendors from API:", apiVendors)
    
    // Transform API response to frontend format
    const transformed = transformApiVendorsToVendorCategories(apiVendors)
    console.log("[API] Transformed vendors:", transformed)
    return transformed
  } catch (error) {
    console.error("[API] Error generating vendors:", error)
    throw error
  }
}

