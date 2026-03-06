/**
 * So sánh theo ngày (00:00), chuyển mốc khi hết ngày.
 * Trước 30/3: vu quy | Từ 30/3 đến trước 5/4: thành hôn | Từ 5/4: đã qua
 */
const DAY_AFTER_VU_QUY = new Date(2026, 2, 30).getTime(); // 30/3 00:00
const DAY_AFTER_THANH_HON = new Date(2026, 3, 5).getTime(); // 5/4 00:00

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

export function getCurrentEventDate(): {
  short: string;
  long: string;
  metadata: string;
} {
  if (isVuQuyPhase()) {
    return {
      short: "29 . 03 . 2026",
      long: "29 tháng 03, 2026",
      metadata: "March 29, 2026",
    };
  }
  return {
    short: "04 . 04 . 2026",
    long: "04 tháng 04, 2026",
    metadata: "April 04, 2026",
  };
}
