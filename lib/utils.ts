import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Gets or generates a unique session ID for the current user session
 * Uses sessionStorage so each browser tab/window gets a unique ID
 */
export function getSessionId(): string {
  if (typeof window === 'undefined') {
    // Server-side: generate a temporary ID (shouldn't happen in API routes)
    return `session-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
  }

  const storageKey = 'event-planner-session-id'
  let sessionId = sessionStorage.getItem(storageKey)

  if (!sessionId) {
    // Generate a unique session ID
    sessionId = `session-${Date.now()}-${Math.random().toString(36).slice(2, 11)}-${Math.random().toString(36).slice(2, 11)}`
    sessionStorage.setItem(storageKey, sessionId)
  }

  return sessionId
}
