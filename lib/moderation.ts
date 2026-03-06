import { MESSAGES } from "@/constants"
import { containsBadWordVi } from "@/lib/bad-words-vi"

/**
 * Kiểm tra nội dung có chứa từ ngữ không phù hợp (tiếng Việt).
 * Sử dụng danh sách từ local - không cần API, không giới hạn rate limit.
 */
export function checkHarmfulContent(text: string): { flagged: boolean } {
  if (!text?.trim()) return { flagged: false }

  const flagged = containsBadWordVi(text.trim())
  return { flagged }
}

export function checkRsvpHarmful(
  name: string,
  message?: string | null
): { safe: boolean; reason?: string } {
  const combined = [name, message].filter(Boolean).join("\n")
  const { flagged } = checkHarmfulContent(combined)

  if (flagged) {
    return {
      safe: false,
      reason: MESSAGES.harmfulContentReason,
    }
  }

  return { safe: true }
}
