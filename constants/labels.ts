/** Nhãn hiển thị cho từng category ảnh */
export const CATEGORY_LABELS: Record<string, string> = {
  all: "All",
  "pre-wedding": "Pre-wedding",
  wedding: "Wedding",
  honeymoon: "Honeymoon",
  forever: "Forever",
};

/** Nhãn album */
export const ALBUM_LABELS = {
  viewAllImages: "Tất cả hình ảnh",
} as const;

/** Nhãn tab Admin */
export const ADMIN_TAB_LABELS = {
  upload: "Upload Photos",
  photos: (count: number) => `Photos (${count})`,
  rsvps: (count: number) => `RSVPs (${count})`,
} as const;

/** Nhãn form wish */
export const WISH_FORM_LABELS = {
  yourName: "Tên của bạn",
  yourMessage: "Lời chúc của bạn",
  sendWishes: "Gửi lời chúc",
  suggestionTitle: "Lời chúc gợi ý",
  emojiTitle: "Chèn emoji",
} as const;

/** Aria labels cho accessibility */
export const ARIA_LABELS = {
  musicPlay: "Bật nhạc",
  musicPause: "Tắt nhạc",
  weddingGift: "Mừng cưới",
  close: "Close",
  previous: "Previous",
  next: "Next",
  remove: "Remove",
  deletePhoto: "Xóa ảnh",
  deleteRsvp: "Xóa RSVP",
} as const;
