"use client";

export function VideoBanner() {
  return (
    <div className="relative w-full h-64">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://i.imgur.com/VYP34gA.mp4"
          type="video/mp4"
        />
      </video>
      <div className="banner-content">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
          Welcome HLSiTecH
        </h1>
      </div>
    </div>
  );
}