import { NextRequest, NextResponse } from "next/server"

const API_BASE_URL = "https://vicissitudinous-alexis-chivalrously.ngrok-free.dev"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("user_id") || "default-user"

    const response = await fetch(`${API_BASE_URL}/concepts?user_id=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[API Route] Error response:", errorText)
      
      // Check if this is an ngrok connection error
      if (errorText.includes("ERR_NGROK_8012") || errorText.includes("failed to establish a connection")) {
        return NextResponse.json(
          { 
            error: "Backend server connection failed",
            message: "The ngrok tunnel is working, but cannot connect to the backend server at localhost:8000. Please ensure your FastAPI server is running.",
            details: "Make sure your backend API server is running on port 8000"
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

