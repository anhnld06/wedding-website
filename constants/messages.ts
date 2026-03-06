/** Thông báo lỗi / thành công chung */
export const MESSAGES = {
  // Wish / RSVP
  wishSubmitError: "Không gửi được. Vui lòng thử lại.",
  rsvpSuccess: "RSVP submitted successfully",
  rsvpSubmitError: "Failed to submit RSVP",
  rsvpFetchError: "Failed to fetch RSVPs",
  contentNotAppropriate: "Nội dung không phù hợp",
  invalidInput: "Invalid input",

  // Upload
  uploadFailed: "Upload failed",
  uploadSuccess: "Photo uploaded successfully!",
  selectImageFile: "Please select an image file",
  imageSizeLimit: "Ảnh phải nhỏ hơn 25MB",
  imageCompressFailed: "Không thể nén ảnh. Thử ảnh khác hoặc ảnh nhỏ hơn.",
  failedGetSignature: "Failed to get upload signature",
  failedUploadImage: "Failed to upload image",

  // Auth / Admin
  loginFailed: "Login failed",
  somethingWentWrong: "Something went wrong",
  invalidPassword: "Invalid password",
  passwordRequired: "Password is required",

  // Photos
  fetchPhotosError: "Failed to fetch photos",
  invalidPhotoInput: "Invalid input",
  failedSavePhoto: "Failed to save photo",
  photoNotFound: "Photo not found",
  failedDeletePhoto: "Failed to delete photo",

  // RSVP
  unauthorized: "Unauthorized",
  rsvpNotFound: "RSVP not found",
  failedDeleteRsvp: "Failed to delete RSVP",

  // Moderation
  harmfulContentReason:
    "Nội dung chứa từ ngữ không phù hợp. Vui lòng chỉnh sửa và gửi lại.",

  // Admin confirms
  confirmDeleteRsvp: "Xóa RSVP này?",
  confirmDeletePhoto: "Xóa ảnh này?",
  cannotDeleteRsvp: "Không thể xóa RSVP",
  cannotDeletePhoto: "Không thể xóa ảnh",
  errorDeleteRsvp: "Lỗi khi xóa RSVP",
  errorDeletePhoto: "Lỗi khi xóa ảnh",

  // Gallery
  noPhotosYet: "No photos yet. Check back soon!",

  // General
  failedGenerateSignature: "Failed to generate signature",
} as const;

/** Placeholder cho form */
export const PLACEHOLDERS = {
  enterYourName: "Nhập tên của bạn",
  wishMessage: "Nhập lời chúc của bạn",
  captionOptional: "Thêm ghi chú (không bắt buộc)",
  adminPassword: "Nhập mật khẩu admin",
} as const;
