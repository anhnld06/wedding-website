/** Ngày giờ các sự kiện (ISO 8601) — giờ địa phương (không hậu tố Z) */
export const VU_QUY_DATE = "2026-03-29T08:30:00";
/** Ngày cưới chính (lễ thành hôn) — mốc kỷ niệm & hiển thị mặc định sau khi kết thúc mọi sự kiện */
export const THANH_HON_DATE = "2026-04-04T11:00:00";
/** Alias: cùng mốc với {@link THANH_HON_DATE} */
export const MAIN_WEDDING_DATE = THANH_HON_DATE;
export const BAO_HY_DATE = "2026-04-18T17:00:00";

/** Nhãn ngày hiển thị cho venue (định dạng đầy đủ) */
export const VU_QUY_DATE_LABEL = "Chủ nhật, 29 tháng 03, 2026";
export const THANH_HON_DATE_LABEL = "Thứ Bảy, 04 tháng 04, 2026";
export const BAO_HY_DATE_LABEL = "Thứ Bảy, 18 tháng 04, 2026";

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

/** Lịch tháng 4 — highlight ngày lễ báo hỷ */
export const APRIL_2026_BAO_HY = {
  firstDay: 2,
  daysInMonth: 30,
  monthName: "Tháng 4",
  highlightDay: 18,
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
  thanhHon: "Lễ thành hôn",
  baoHy: "Lễ báo hỷ",
} as const;
