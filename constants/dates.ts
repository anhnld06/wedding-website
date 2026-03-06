/** Ngày giờ các sự kiện (ISO 8601) */
export const VU_QUY_DATE = "2026-03-29T08:30:00";
export const THANH_HON_DATE = "2026-04-04T11:00:00";

/** Nhãn ngày hiển thị cho venue (định dạng đầy đủ) */
export const VU_QUY_DATE_LABEL = "Chủ nhật, 29 tháng 03, 2026";
export const THANH_HON_DATE_LABEL = "Thứ Bảy, 04 tháng 04, 2026";

/** Cấu hình lịch tháng 3/2026 - ngày 1 là Chủ nhật, tuần bắt đầu T2 → firstDay=6 */
export const MARCH_2026 = {
  firstDay: 6,
  daysInMonth: 31,
  monthName: "Tháng 3",
  highlightDay: 29,
} as const;

/** Cấu hình lịch tháng 4/2026 - ngày 1 là Thứ tư, tuần bắt đầu T2 → firstDay=2 */
export const APRIL_2026 = {
  firstDay: 2,
  daysInMonth: 30,
  monthName: "Tháng 4",
  highlightDay: 4,
} as const;

/** Nhãn các ngày trong tuần */
export const DAY_LABELS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

/** Nhãn đơn vị đếm ngược */
export const COUNTDOWN_UNIT_LABELS = {
  days: "Ngày",
  hours: "Giờ",
  minutes: "Phút",
  seconds: "Giây",
} as const;

/** Nhãn sự kiện */
export const EVENT_LABELS = {
  vuQuy: "Lễ vu quy",
  vuQuyFull: "Lễ vu quy (nhà gái)",
  thanhHon: "Lễ thành hôn",
} as const;
