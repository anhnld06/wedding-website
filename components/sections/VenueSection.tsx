"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Clock, CalendarDays, Navigation, Heart } from "lucide-react";
import {
  VU_QUY_DATE_LABEL,
  THANH_HON_DATE_LABEL,
} from "@/constants/dates";

const TAN_MY_PALACE = {
  name: "Tân Mỹ Palace",
  address: "Ngã 3 Đông Thành, Nguyễn Tất Thành, Xã Lệ Thủy, Tỉnh Quảng Trị",
  mapQuery: "FANS+LION+GYM+L%E1%BB%87+Thu%E1%BB%B7+N%C3%A2ng+T%E1%BA%A7m+V%C3%B3c+Vi%E1%BB%87t",
  lat: 21.0285,
  lng: 105.8542,
};

const VU_QUY = {
  title: "Lễ vu quy",
  subtitle: "Nhà gái",
  location: "Nhà gái",
  address: "Địa chỉ nhà gái",
  date: VU_QUY_DATE_LABEL,
  ceremonyTime: "08:30 — Lễ vu quy",
  partyTime: "10:30 — Tiệc cưới tại Tân Mỹ Palace",
};

const THANH_HON = {
  title: "Lễ thành hôn",
  subtitle: "Nhà trai",
  location: "Nhà trai",
  address: "Địa chỉ nhà trai",
  date: THANH_HON_DATE_LABEL,
  ceremonyTime: "11:00 — Lễ thành hôn",
  partyTime: "16:00 — Tiệc cưới tại Tân Mỹ Palace",
};

export default function VenueSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const directionsUrl = `https://www.google.com/maps/dir/81+Quang+Trung,+Th%E1%BA%A1ch+Thang,+H%E1%BA%A3i+Ch%C3%A2u,+%C4%90%C3%A0+N%E1%BA%B5ng+550000,+Vi%E1%BB%87t+Nam/V%C4%83n+Ph%C3%B2ng+B%C4%90S+T%C3%ADn+Ph%C3%A1t+Land,+%C4%90%C6%B0%E1%BB%9Dng+Nguy%E1%BB%85n+T%E1%BA%A5t+Th%C3%A0nh,+Li%C3%AAn+Thu%E1%BB%B7,+L%E1%BB%87+Th%E1%BB%A7y,+Qu%E1%BA%A3ng+B%C3%ACnh,+Vi%E1%BB%87t+Nam/@17.2276699,106.7971141,19.25z/data=!4m13!4m12!1m5!1m1!1s0x314218373f7b209d:0x6733c0f4bc3181a2!2m2!1d108.2187079!2d16.0740691!1m5!1m1!1s0x3140b1004d764e01:0x66561c2038ad004!2m2!1d106.7978801!2d17.2274914?entry=ttu&g_ep=EgoyMDI2MDMwMi4wIKXMDSoASAFQAw%3D%3D`;
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${TAN_MY_PALACE.mapQuery}&zoom=15`;

  const VenueCard = ({
    title,
    subtitle,
    date,
    ceremonyTime,
    partyTime,
    delay,
  }: {
    title: string;
    subtitle: string;
    date: string;
    ceremonyTime: string;
    partyTime: string;
    delay: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-rose-100 shadow-sm"
    >
      <div className="mb-4">
        <p className="text-gold-500 tracking-wide text-xs uppercase font-medium">{subtitle}</p>
        <h3 className="text-xl font-serif text-rose-800">{title}</h3>
      </div>
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0">
            <CalendarDays className="w-4 h-4 text-rose-500" />
          </div>
          <div>
            <p className="text-xs font-medium text-rose-600/80">Ngày</p>
            <p className="text-sm text-rose-800">{date}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0">
            <Clock className="w-4 h-4 text-rose-500" />
          </div>
          <div>
            <p className="text-xs font-medium text-rose-600/80">Thời gian</p>
            <p className="text-sm text-rose-800">{ceremonyTime}</p>
            <p className="text-sm text-rose-800">{partyTime}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section
      id="venue"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center snap-start overflow-hidden py-16"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-cream-50 via-rose-50/20 to-cream-100" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <p className="text-gold-500 tracking-[0.3em] uppercase text-xs mb-3 font-medium">
            Địa Điểm
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-rose-800 mb-4">
            Sự Kiện Cưới
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gold-400/40" />
            <Heart className="w-4 h-4 text-rose-400 fill-rose-300" />
            <div className="h-px w-12 bg-gold-400/40" />
          </div>
        </motion.div>

        {/* Two venue cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <VenueCard
            title={VU_QUY.title}
            subtitle={VU_QUY.subtitle}
            date={VU_QUY.date}
            ceremonyTime={VU_QUY.ceremonyTime}
            partyTime={VU_QUY.partyTime}
            delay={0.2}
          />
          <VenueCard
            title={THANH_HON.title}
            subtitle={THANH_HON.subtitle}
            date={THANH_HON.date}
            ceremonyTime={THANH_HON.ceremonyTime}
            partyTime={THANH_HON.partyTime}
            delay={0.4}
          />
        </div>

        {/* Tân Mỹ Palace info + Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-rose-100 shadow-sm">
            <h3 className="text-xl font-serif text-rose-800 mb-4">{TAN_MY_PALACE.name}</h3>
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-rose-600/80">{TAN_MY_PALACE.address}</p>
            </div>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-500 text-white rounded-full text-sm font-medium hover:bg-rose-600 transition-colors"
            >
              <Navigation className="w-4 h-4" />
              Chỉ đường
            </a>
          </div>
          <div className="rounded-3xl overflow-hidden border border-rose-100 shadow-sm h-[260px] md:h-[200px]">
            <iframe
              src={googleMapsUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Tân Mỹ Palace"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
