"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Coffee, Lock, Play, Thermometer, Wifi, X } from "lucide-react";
import Image from "next/image";
import CoffeeMachine from "../../public/images/coffee.jpeg";
import SmartLock from "../../public/images/smart-lock.jpeg";
import WifiSetup from "../../public/images/wifisetup.png";
import Thermostat from "../../public/images/thermostat.png";

export function Menu() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visualGuide = [
    {
      image: CoffeeMachine,
      icon: <Coffee size={14} />,
      title: "Coffee machine",
      time: "2:15",
      videoUrl: "https://www.youtube.com/shorts/JmLOaDZJfpg?feature=share",
    },
    {
      image: SmartLock,
      icon: <Lock size={14} />,
      title: "Smart Lock",
      time: "1:25",
      videoUrl: "https://youtube.com/shorts/vSONB2yoo5k?si=d5h73zNXeee7A7Zm",
    },
    {
      image: WifiSetup,
      icon: <Wifi size={14} />,
      title: "WiFi Setup",
      time: "1:40",
      videoUrl: "https://www.youtube.com/shorts/airIHEGPY-I?feature=share",
    },
    {
      image: Thermostat,
      icon: <Thermometer size={14} />,
      title: "Thermostat",
      time: "2:00",
      videoUrl: "https://www.youtube.com/shorts/5O6rHbUJRrM?feature=share",
    },
  ];

  const handlePlay = (index: number) => {
    setActiveIndex(index);
  };

  const handleClose = () => {
    setActiveIndex(null);
  };

  // Function to extract YouTube video ID
  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(
      /(?:youtube\.com\/(?:shorts\/|watch\?v=)|youtu\.be\/)([^&?/]+)/
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1`;
    }
    return null;
  };

  return (
    <Card
      className="bg-[#FEF7E5] p-6 rounded-2xl shadow-lg flex flex-col"
      id="menu-card"
    >
      <div id="heading" className="flex-shrink-0">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Visual Guide</h2>

        {/* Show Full Video if Playing */}
        {activeIndex !== null ? (
          <div className="relative w-full aspect-video">
            {visualGuide[activeIndex].videoUrl.includes("youtube") ? (
              <iframe
                src={
                  getYouTubeEmbedUrl(visualGuide[activeIndex].videoUrl) || ""
                }
                title={visualGuide[activeIndex].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-xl"
                frameBorder="0"
              />
            ) : (
              <video
                src={visualGuide[activeIndex].videoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover rounded-xl"
              />
            )}
            <button
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 p-2 rounded-full"
              onClick={handleClose}
            >
              <X className="text-white w-5 h-5" />
            </button>
          </div>
        ) : (
          // Show Grid if No Video Active
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visualGuide.map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-xl overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover aspect-[4/3]"
                    width={500}
                    height={1000}
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    onClick={() => handlePlay(index)}
                  >
                    <div className="bg-black/30 rounded-full p-2 cursor-pointer hover:bg-black/50 transition-colors">
                      <Play className="h-6 w-6 text-white fill-white" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">{item.icon}</span>
                    <span className="text-gray-700 font-medium">
                      {item.title}
                    </span>
                  </div>
                  <div className="text-gray-500 text-sm mt-1">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
