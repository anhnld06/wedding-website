import { THANH_HON_DATE } from "@/constants/dates";

/**
 * So sánh theo ngày (00:00), chuyển mốc khi hết ngày.
 * Vu quy → thành hôn → báo hỷ → sau 19/4: mặc định ngày cưới chính (4/4)
 */
const DAY_AFTER_VU_QUY = new Date(2026, 2, 30).getTime(); // 30/3 00:00
const DAY_AFTER_THANH_HON = new Date(2026, 3, 5).getTime(); // 5/4 00:00
const DAY_AFTER_BAO_HY = new Date(2026, 3, 19).getTime(); // 19/4 00:00

const VENUE_LINE_MAIN = "TanMy Palace, QuangTri";
const VENUE_LINE_BAO_HY = "GiaHan Wedding Restaurant, DaNang";

const THANH_HON_DISPLAY = {
  short: "04 . 04 . 2026",
  long: "04 tháng 04, 2026",
  metadata: "April 04, 2026",
} as const;

const BAO_HY_DISPLAY = {
  short: "18 . 04 . 2026",
  long: "18 tháng 04, 2026",
  metadata: "April 18, 2026",
} as const;

function getTodayStart(): number {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

export function isVuQuyPhase(): boolean {
  return getTodayStart() < DAY_AFTER_VU_QUY;
}

export function isThanhHonPhase(): boolean {
  const today = getTodayStart();
  return today >= DAY_AFTER_VU_QUY && today < DAY_AFTER_THANH_HON;
}

export function isBaoHyPhase(): boolean {
  const today = getTodayStart();
  return today >= DAY_AFTER_THANH_HON && today < DAY_AFTER_BAO_HY;
}

/** Đã qua hết vu quy, thành hôn và báo hỷ (từ 00:00 19/4/2026). */
export function isAllWeddingEventsPast(): boolean {
  return getTodayStart() >= DAY_AFTER_BAO_HY;
}

export function getCurrentEventDate(): {
  short: string;
  long: string;
  metadata: string;
  venueLine: string;
} {
  if (isVuQuyPhase()) {
    return {
      short: "29 . 03 . 2026",
      long: "29 tháng 03, 2026",
      metadata: "March 29, 2026",
      venueLine: VENUE_LINE_MAIN,
    };
  }
  if (isThanhHonPhase()) {
    return {
      ...THANH_HON_DISPLAY,
      venueLine: VENUE_LINE_MAIN,
    };
  }
  if (isBaoHyPhase()) {
    return {
      ...BAO_HY_DISPLAY,
      venueLine: VENUE_LINE_BAO_HY,
    };
  }
  /* Sau mọi sự kiện: neo vào ngày cưới chính (lễ thành hôn) */
  return {
    ...THANH_HON_DISPLAY,
    venueLine: VENUE_LINE_MAIN,
  };
}

/** Mốc ngày cưới chính — dùng cho kỷ niệm (cùng giá trị với THANH_HON_DATE). */
export function getWeddingAnniversaryAnchor(): Date {
  return new Date(THANH_HON_DATE);
}

/**
 * Số năm kỷ niệm đã tròn (0 trước mốc đầu tiên, 1 sau đúng một năm, …).
 */
export function getCompletedAnniversaryYears(reference: Date = new Date()): number {
  const anchor = getWeddingAnniversaryAnchor();
  let years = reference.getFullYear() - anchor.getFullYear();
  const monthDiff = reference.getMonth() - anchor.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && reference.getDate() < anchor.getDate())) {
    years -= 1;
  }
  return Math.max(0, years);
}
