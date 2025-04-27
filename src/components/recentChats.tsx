"use client";

import { MapPin } from "lucide-react"; // using Lucide for the pin icon

export default function MapCard() {
  return (
    <div className="bg-white backdrop-blur-md p-6 rounded-2xl shadow-lg">
      {/* Map Image or Embed */}
      <div className="overflow-hidden rounded-md">
        <iframe
          className="w-full h-60"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.4914921527253!2d103.83546466957146!3d1.3165669999113455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19ba21a7b8b9%3A0x5e983b6c2c3a8a6c!2sLittle%20Splashes%20Aquatics!5e0!3m2!1sen!2ssg!4v1685412701727!5m2!1sen!2ssg"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Button */}
      <div className="mt-4">
        <a
          href="https://maps.google.com?q=Little+Splashes+Aquatics"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-md transition"
        >
          <MapPin className="w-5 h-5" />
          View on Google Maps
        </a>
      </div>
    </div>
  );
}
