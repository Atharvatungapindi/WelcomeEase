// "use client";

// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Clock3 } from "lucide-react";

// export default function OrderDetails() {
//   const conversations = [
//     { time: "2 mins ago", question: "Where’s the AC remote?" },
//     { time: "15 mins ago", question: "How do I turn on the heater?" },
//     { time: "1 hour ago", question: "Where’s the extra blanket?" },
//   ];

//   const quickQuestions = [
//     "Wi-Fi Password?",
//     "Check-out time?",
//     "Nearest supermarket",
//     "Parking Info",
//     "Extra Amenities",
//   ];

//   return (
//     <Card className="bg-white backdrop-blur-md p-6 rounded-2xl shadow-lg">
//       <h2 className="text-2xl font-bold mb-6 text-[#2D2D2D] font-inter">
//         Recent Conversation
//       </h2>

//       <div className="space-y-4 mb-6">
//         {conversations.map((item, index) => (
//           <div
//             key={index}
//             className="border-[1px] border-[#6B7280] rounded-xl p-4 flex flex-col gap-2"
//           >
//             {/* Time + Icon */}
//             <div className="flex items-center gap-2 mt-1">
//               <Clock3 size={16} className="text-[#6B7280]" />
//               <span className="text-[#6B7280] text-[15px] font-normal leading-none tracking-[0.038px] font-inter">
//                 {item.time}
//               </span>
//             </div>

//             {/* Question */}
//             <div className="text-[#2D2D2D] text-[17px] font-medium leading-none tracking-[0.085px] font-inter">
//               {item.question}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div>
//         <h3 className="text-[#6B7280] text-[17px] font-normal leading-none tracking-[0.038px] font-inter mb-3">
//           Quick Questions
//         </h3>
//         <div className="flex flex-wrap gap-2">
//           {quickQuestions.map((item, i) => (
//             <Button
//               key={i}
//               className="text-[#2D2D2D] text-[15px] font-medium leading-none tracking-[0.085px] font-inter px-2 py-1 bg-[#F3F4F6] rounded-lg hover:bg-[#E5E7EB] transition duration-200"
//             >
//               {item}
//             </Button>
//           ))}
//         </div>
//       </div>
//     </Card>
//   );
// }

// app/components/LocationMap.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Fix default marker icon issue in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

export default function LocationMap() {
  const position: [number, number] = [1.33453, 103.92031]; // Little Splashes Aquatics

  return (
    <div className="bg-white backdrop-blur-md p-6 rounded-2xl shadow-lg">
      <div className="h-[250px] w-full rounded-xl overflow-hidden">
        <MapContainer
          center={position}
          zoom={16}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
      </div>

      <div className="mt-4">
        <a
          href="https://www.google.com/maps/place/Little+Splashes+Aquatics/@1.3345294,103.9181237,17z"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="w-full bg-[#FF3B61] hover:bg-[#e13255] text-white text-[15px] font-semibold py-3 rounded-xl transition duration-200 flex items-center justify-center gap-2">
            <MapPin size={18} />
            View on Google Maps
          </Button>
        </a>
      </div>
    </div>
  );
}
// components/MapCard.tsx
// import { MapPin } from "lucide-react"; // using Lucide for the pin icon

// export default function MapCard() {
//   return (
//     <div className="bg-white backdrop-blur-md p-6 rounded-2xl shadow-lg">
//       {/* Map Image or Embed */}
//       <div className="overflow-hidden rounded-md">
//         <iframe
//           className="w-full h-60"
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.4914921527253!2d103.83546466957146!3d1.3165669999113455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19ba21a7b8b9%3A0x5e983b6c2c3a8a6c!2sLittle%20Splashes%20Aquatics!5e0!3m2!1sen!2ssg!4v1685412701727!5m2!1sen!2ssg"
//           allowFullScreen
//           loading="lazy"
//           referrerPolicy="no-referrer-when-downgrade"
//         ></iframe>
//       </div>

//       {/* Button */}
//       <div className="mt-4">
//         <a
//           href="https://maps.google.com?q=Little+Splashes+Aquatics"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-md transition"
//         >
//           <MapPin className="w-5 h-5" />
//           View on Google Maps
//         </a>
//       </div>
//     </div>
//   );
// }
