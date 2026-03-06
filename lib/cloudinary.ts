import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export function generateSignature(timestamp: number) {
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: "wedding",
    },
    process.env.CLOUDINARY_API_SECRET!
  );
  return signature;
}
