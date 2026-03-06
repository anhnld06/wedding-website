/** Thông tin tài khoản ngân hàng cho mừng cưới */
export const BANK_ACCOUNTS = [
  {
    role: "Chú Rể",
    name: "NGUYEN LE DUY ANH",
    bank: "Tpbank",
    account: "668 0606 2000",
    avatar: "/images/chu-re.jpg",
    color: "from-blue-500 to-blue-600",
    qr: "/images/qr-duyanh.jpg",
    qr_api: "https://img.vietqr.io/image/tpb-66806062000-compact.png?amount=0&addInfo=Mung%20cuoi%20Duy%20Anh%20Bao%20Chau"
  },
  {
    role: "Cô Dâu",
    name: "NGUYEN HA BAO CHAU",
    bank: "Tpbank",
    account: "068 7350 2801",
    avatar: "/images/co-dau.jpg",
    color: "from-rose-400 to-rose-500",
    qr: "/images/qr-baochau.jpg",
    qr_api: "https://img.vietqr.io/image/tpb-06873502801-compact.png?amount=0&addInfo=Mung%20cuoi%20Duy%20Anh%20Bao%20Chau"
  },
] as const;
