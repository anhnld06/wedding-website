"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Upload, X, Loader2, CheckCircle } from "lucide-react";
import imageCompression from "browser-image-compression";
import { cn } from "@/lib/utils";
import { PHOTO_CATEGORIES } from "@/lib/validations";
import { CATEGORY_LABELS, MESSAGES, PLACEHOLDERS, ARIA_LABELS } from "@/constants";

const MAX_SELECT_SIZE = 25 * 1024 * 1024; // 25MB - allow selecting large originals
const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; // 5MB - after compression, must be under this

interface UploadFormProps {
  onUploadComplete?: () => void;
}

export default function UploadForm({ onUploadComplete }: UploadFormProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState<(typeof PHOTO_CATEGORIES)[number]>("wedding");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      toast.error(MESSAGES.selectImageFile);
      return;
    }

    if (selected.size > MAX_SELECT_SIZE) {
      toast.error(MESSAGES.imageSizeLimit);
      return;
    }

    setFile(selected);
    setSuccess(false);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(selected);
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setCaption("");
    setSuccess(false);
  };

  const handleUpload = useCallback(async () => {
    if (!file) return;

    try {
      setUploading(true);

      // 1. Compress on frontend before upload (target under 5MB)
      const compressed = await imageCompression(file, {
        maxSizeMB: 5,
        maxWidthOrHeight: 2048,
        useWebWorker: true,
        fileType: file.type.startsWith("image/png") ? "image/png" : "image/jpeg",
      });

      if (compressed.size > MAX_UPLOAD_SIZE) {
        throw new Error(MESSAGES.imageCompressFailed);
      }

      // 2. Upload to server (resize with sharp, then upload to Cloudinary)
      const formData = new FormData();
      formData.append("file", compressed);
      formData.append("caption", caption);
      formData.append("category", category);

      const res = await fetch("/api/photos/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || MESSAGES.failedUploadImage);
      }

      setSuccess(true);
      setFile(null);
      setPreview(null);
      setCaption("");
      onUploadComplete?.();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : MESSAGES.uploadFailed);
    } finally {
      setUploading(false);
    }
  }, [file, caption, category, onUploadComplete]);

  return (
    <div className="space-y-4">
      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-rose-700 mb-2">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as (typeof PHOTO_CATEGORIES)[number])}
          className="w-full px-4 py-3 rounded-xl border border-rose-200 bg-white text-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all"
        >
          {PHOTO_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABELS[c]}
            </option>
          ))}
        </select>
      </div>

      {/* Dropzone */}
      {!preview && (
        <label
          className={cn(
            "flex flex-col items-center justify-center py-12 px-6",
            "border-2 border-dashed border-rose-200 rounded-2xl",
            "bg-rose-50/50 hover:bg-rose-50 cursor-pointer transition-colors"
          )}
        >
          <Upload className="w-10 h-10 text-rose-300 mb-3" />
          <p className="text-rose-600 font-medium mb-1">Click to upload</p>
          <p className="text-rose-400 text-sm">JPG, PNG, WebP up to 25MB (sẽ nén tự động)</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="sr-only"
          />
        </label>
      )}

      {/* Preview */}
      {preview && (
        <div className="relative">
          <Image
            src={preview}
            alt="Preview"
            width={400}
            height={300}
            className="w-full h-64 object-cover rounded-2xl border border-rose-100"
          />
          <button
            onClick={clearFile}
            className="absolute top-3 right-3 p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors"
            aria-label={ARIA_LABELS.remove}
          >
            <X className="w-4 h-4 text-rose-600" />
          </button>
        </div>
      )}

      {/* Caption */}
      {preview && (
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder={PLACEHOLDERS.captionOptional}
          className="w-full px-4 py-3 rounded-xl border border-rose-200 bg-white/80 text-rose-900 placeholder:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all"
        />
      )}

      {/* Success */}
      {success && (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg border border-green-100">
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm">{MESSAGES.uploadSuccess}</span>
        </div>
      )}

      {/* Upload button */}
      {preview && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-3 rounded-xl",
            "bg-rose-500 text-white font-medium",
            "hover:bg-rose-600 transition-colors",
            "disabled:opacity-60 disabled:cursor-not-allowed"
          )}
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              Upload Photo
            </>
          )}
        </button>
      )}
    </div>
  );
}
