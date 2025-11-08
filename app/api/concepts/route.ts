import { NextRequest, NextResponse } from "next/server"

const API_BASE_URL = "https://ai-event-planner-server.onrender.com"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("user_id") || "default-user"

    const response = await fetch(`${API_BASE_URL}/concepts?user_id=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[API Route] Error response:", errorText)
      
      // Check if this is a connection error
      if (errorText.includes("failed to establish a connection") || response.status === 503) {
        return NextResponse.json(
          { 
            error: "Backend server connection failed",
            message: "Unable to connect to the backend server. Please try again later.",
            details: "The API server may be temporarily unavailable"
          },
          { status: 503 } // Service Unavailable
        )
      }
      
      return NextResponse.json(
        { error: `API error: ${response.status} ${response.statusText}`, details: errorText },
        { status: response.status }
      )
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("[API Route] Error:", error)
    return NextResponse.json(
      { error: "Failed to fetch concepts", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

