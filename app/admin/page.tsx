"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import UploadForm from "@/components/UploadForm";
import SectionHeading from "@/components/SectionHeading";
import { LogOut, Trash2, Loader2 } from "lucide-react";
import { PHOTO_CATEGORIES } from "@/lib/validations";
import { CATEGORY_LABELS, ADMIN_TAB_LABELS, MESSAGES, ARIA_LABELS } from "@/constants";

type PhotoCategoryFilter = "all" | (typeof PHOTO_CATEGORIES)[number];

interface Photo {
  id: string;
  url: string;
  caption?: string | null;
  category?: string;
  createdAt: string;
}

interface RSVPEntry {
  id: string;
  name: string;
  attending: boolean;
  guests: number;
  message?: string | null;
  createdAt: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [rsvps, setRsvps] = useState<RSVPEntry[]>([]);
  const [tab, setTab] = useState<"upload" | "photos" | "rsvps">("upload");
  const [photoCategory, setPhotoCategory] = useState<PhotoCategoryFilter>("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingRsvpId, setDeletingRsvpId] = useState<string | null>(null);

  const handleDeleteRsvp = async (id: string) => {
    if (!confirm(MESSAGES.confirmDeleteRsvp)) return;
    setDeletingRsvpId(id);
    try {
      const res = await fetch(`/api/rsvp/${id}`, { method: "DELETE" });
      if (res.ok) {
        setRsvps((r) => r.filter((x) => x.id !== id));
      } else {
        alert(MESSAGES.cannotDeleteRsvp);
      }
    } catch {
      alert(MESSAGES.errorDeleteRsvp);
    } finally {
      setDeletingRsvpId(null);
    }
  };

  const handleDeletePhoto = async (id: string) => {
    if (!confirm(MESSAGES.confirmDeletePhoto)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/photos/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPhotos((p) => p.filter((x) => x.id !== id));
      } else {
        alert(MESSAGES.cannotDeletePhoto);
      }
    } catch {
      alert(MESSAGES.errorDeletePhoto);
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const fetchPhotos = useCallback(async () => {
    try {
      const res = await fetch("/api/photos");
      if (res.ok) {
        const data = await res.json();
        setPhotos(data);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const fetchRsvps = useCallback(async () => {
    try {
      const res = await fetch("/api/rsvp");
      if (res.ok) {
        const data = await res.json();
        setRsvps(data);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    fetchPhotos();
    fetchRsvps();
  }, [fetchPhotos, fetchRsvps]);

  const tabs = [
    { key: "upload" as const, label: ADMIN_TAB_LABELS.upload },
    { key: "photos" as const, label: ADMIN_TAB_LABELS.photos(photos.length) },
    { key: "rsvps" as const, label: ADMIN_TAB_LABELS.rsvps(rsvps.length) },
  ];

  return (
    <section className="min-h-screen pt-12 pb-14 bg-gradient-to-b from-cream-50 to-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative mb-4">
          <SectionHeading subtitle="Dashboard" title="Admin Panel" />
          <button
            onClick={handleLogout}
            className="absolute top-0 right-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-rose-600 border border-rose-200 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 justify-center">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                tab === t.key
                  ? "bg-rose-500 text-white shadow-lg shadow-rose-200"
                  : "bg-white text-rose-600 border border-rose-200 hover:border-rose-300"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Upload Tab */}
        {tab === "upload" && (
          <div className="max-w-md mx-auto bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-rose-100 shadow-sm">
            <h3 className="text-lg font-serif text-rose-800 mb-6 text-center">
              Upload New Photo
            </h3>
            <UploadForm
              onUploadComplete={() => {
                fetchPhotos();
              }}
            />
          </div>
        )}

        {/* Photos Tab */}
        {tab === "photos" && (
          <div>
            {photos.length === 0 ? (
              <p className="text-center text-rose-400 py-12">
                No photos uploaded yet
              </p>
            ) : (
              <>
                {/* Category filter */}
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {(["all", ...PHOTO_CATEGORIES] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => setPhotoCategory(c)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        photoCategory === c
                          ? "bg-rose-500 text-white shadow-md"
                          : "bg-white text-rose-600 border border-rose-200 hover:border-rose-300"
                      }`}
                    >
                      {CATEGORY_LABELS[c]} ({c === "all" ? photos.length : photos.filter((p) => (p.category || "wedding") === c).length})
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {(photoCategory === "all"
                    ? photos
                    : photos.filter((p) => (p.category || "wedding") === photoCategory)
                  ).map((photo) => (
                    <div
                      key={photo.id}
                      className="relative group rounded-xl overflow-hidden border border-rose-100"
                    >
                      <Image
                        src={photo.url}
                        alt={photo.caption || "Photo"}
                        width={300}
                        height={200}
                        className="w-full h-40 object-cover"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-medium bg-white/90 text-rose-600">
                        {CATEGORY_LABELS[photo.category || "wedding"]}
                      </span>
                      {photo.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                          <p className="text-white text-xs truncate">
                            {photo.caption}
                          </p>
                        </div>
                      )}
                      <button
                        onClick={() => handleDeletePhoto(photo.id)}
                        disabled={deletingId === photo.id}
                        className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-red-50 rounded-full text-rose-500 hover:text-red-600 transition-colors disabled:opacity-60"
                        aria-label={ARIA_LABELS.deletePhoto}
                      >
                        {deletingId === photo.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* RSVPs Tab */}
        {tab === "rsvps" && (
          <div className="max-w-2xl mx-auto">
            {rsvps.length === 0 ? (
              <p className="text-center text-rose-400 py-12">
                No RSVPs yet
              </p>
            ) : (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-rose-100 shadow-sm overflow-hidden">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 p-4 border-b border-rose-100">
                  <div className="text-center">
                    <p className="text-2xl font-serif text-rose-800">
                      {rsvps.length}
                    </p>
                    <p className="text-xs text-rose-500">Total</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-serif text-green-700">
                      {rsvps.filter((r) => r.attending).length}
                    </p>
                    <p className="text-xs text-green-500">Attending</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-serif text-red-700">
                      {rsvps.filter((r) => !r.attending).length}
                    </p>
                    <p className="text-xs text-red-500">Declined</p>
                  </div>
                </div>

                {/* List */}
                <div className="max-h-[55vh] overflow-y-auto px-4 pt-4 pb-20 pr-2 space-y-3">
                {rsvps.map((rsvp) => (
                  <div
                    key={rsvp.id}
                    className="bg-white rounded-xl p-4 border border-rose-100 relative"
                  >
                    <button
                      onClick={() => handleDeleteRsvp(rsvp.id)}
                      disabled={deletingRsvpId === rsvp.id}
                      className="absolute bottom-4 right-4 p-2 bg-white/90 hover:bg-red-50 rounded-full text-rose-500 hover:text-red-600 transition-colors disabled:opacity-60"
                      aria-label={ARIA_LABELS.deleteRsvp}
                    >
                      {deletingRsvpId === rsvp.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                    <div className="flex items-start justify-between pr-10">
                      <div>
                        <p className="font-medium text-rose-800">{rsvp.name}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              rsvp.attending
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {rsvp.attending ? "Attending" : "Declined"}
                          </span>
                          {rsvp.attending && (
                            <span className="text-xs text-rose-500">
                              {rsvp.guests}{" "}
                              {rsvp.guests === 1 ? "guest" : "guests"}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-rose-400">
                        {new Date(rsvp.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {rsvp.message && (
                      <p className="text-sm text-rose-600/60 mt-2 italic">
                        &ldquo;{rsvp.message}&rdquo;
                      </p>
                    )}
                  </div>
                ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="fixed bottom-0 left-0 right-0 z-10 py-3 border-t border-rose-200 bg-white/95 backdrop-blur-sm text-center">
          <p className="text-xs text-rose-400">
            © {new Date().getFullYear()} Anh & Châu Wedding. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  );
}
