"use client";

import { useState } from "react";
import HeroSection from "@/components/sections/HeroSection";
import CoupleSection from "@/components/sections/CoupleSection";
import StorySection from "@/components/sections/StorySection";
import AlbumSection from "@/components/sections/AlbumSection";
import CountdownSection from "@/components/sections/CountdownSection";
import VenueSection from "@/components/sections/VenueSection";
import EnvelopeSection from "@/components/sections/EnvelopeSection";
import RevealSection from "@/components/sections/RevealSection";
import WishSection from "@/components/sections/WishSection";
import FooterSection from "@/components/sections/FooterSection";
import QRCodeFloat from "@/components/QRCodeFloat";
import MusicPlayer from "@/components/MusicPlayer";

export default function HomePage() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  return (
    <>
      <MusicPlayer />
      <QRCodeFloat />

      <div className="snap-y snap-proximity h-screen overflow-y-auto scroll-smooth">
        <HeroSection />
        <StorySection />
        <CoupleSection />
        <AlbumSection />
        <CountdownSection />
        <VenueSection />
        <EnvelopeSection onOpen={() => setEnvelopeOpened(true)} />
        {envelopeOpened && <RevealSection />}
        <WishSection />
        <FooterSection />
      </div>
    </>
  );
}
