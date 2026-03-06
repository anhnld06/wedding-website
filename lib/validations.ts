import { z } from "zod";

export const rsvpSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  attending: z.boolean(),
  guests: z
    .number()
    .int()
    .min(1, "At least 1 guest")
    .max(10, "Maximum 10 guests"),
  message: z
    .string()
    .max(500, "Message must be less than 500 characters")
    .optional()
    .or(z.literal("")),
});

export const PHOTO_CATEGORIES = ["pre-wedding", "wedding", "honeymoon", "forever"] as const;

export const photoSchema = z.object({
  url: z.string().url("Invalid image URL"),
  publicId: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  caption: z.string().max(200).optional(),
  category: z.enum(PHOTO_CATEGORIES),
});

export type RSVPInput = z.infer<typeof rsvpSchema>;
export type PhotoInput = z.infer<typeof photoSchema>;
