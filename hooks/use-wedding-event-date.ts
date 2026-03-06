"use client";

import { useState, useEffect } from "react";
import { getCurrentEventDate } from "@/lib/wedding-dates";

export function useWeddingEventDate() {
  const [date, setDate] = useState(getCurrentEventDate);

  useEffect(() => {
    const update = () => setDate(getCurrentEventDate());
    update();
    const id = setInterval(update, 60_000); // Cập nhật mỗi phút (bắt mốc hết ngày)
    return () => clearInterval(id);
  }, []);

  return date;
}
