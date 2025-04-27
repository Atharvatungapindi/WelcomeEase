import { Button } from "@/components/ui/button";
import { MicOff, Phone, PhoneOff, Volume2 } from "lucide-react";
import React, { Dispatch } from "react";
import { AnimatePresence, motion } from "framer-motion";
const Picture = "/images/profile-pic.svg";
import Image from "next/image";

export default function VoiceInput(props: {
  isListening: boolean;
  setListening: Dispatch<boolean>;
  isMute: boolean;
  setMute: Dispatch<boolean>;
  isSpeaking: boolean;
  setSpeaking: Dispatch<boolean>;
  agentStatus: string;
}) {
  const [isCallActive, setIsCallActive] = React.useState(false);
  const toggleCall = () => {
    if (
      !props.agentStatus.toLowerCase().includes("start") &&
      !props.agentStatus.toLowerCase().includes("idle") &&
      !props.agentStatus.toLowerCase().includes("connect")
    ) {
      setIsCallActive(!isCallActive);
      props.setListening(!props.isListening);
    }
  };

  return (
    <div className="flex flex-col items-center rounded-2xl p-5 mt-4">
      <div className="relative flex flex-col items-center justify-center">
        {/* Outer Circle with Glow Effect */}
        <div
          className={`w-64 h-64 rounded-full ${
            props.isListening ? "animate-spin" : ""
          }`}
          style={{
            background: "conic-gradient(from 0deg, #FF3366, #FF6666, #FF3366)",
            animation: props.isListening ? "spin 2s linear infinite" : "none",
            boxShadow: props.isListening
              ? "0 0 20px 10px rgba(255, 51, 102, 0.7)"
              : "none",
          }}
        ></div>

        {/* Inner Circle with Image */}
        <div
          className="absolute inset-2 h-[15rem] w-[15rem] rounded-full flex items-center justify-center overflow-hidden cursor-pointer"
          style={{
            boxShadow: props.isListening
              ? "0 0 20px 10px rgba(255, 51, 102, 0.7)"
              : "none",
            transition: "box-shadow 0.3s ease-in-out",
            padding: "15px",
            background:
              "linear-gradient(134deg, #EBF4F3 0%, #FBE7E5 26.92%, #EBF4F3 75.48%, #F5F1EB 90.86%)",
          }}
        >
          <div className="text-center content-center flex flex-col justify-center items-center">
            <div className="w-full h-full rounded-full overflow-hidden">
              <Image
                src={Picture}
                alt={"Stephanie"}
                width={500}
                height={500}
                className="rounded-full object-cover"
              />
            </div>
          </div>
        </div>
        {/* Buttons for Controls */}
        {!props.isListening && (
          <Button
            size="icon"
            className={`rounded-full p-4 flex items-center justify-center mt-6 ${
              isCallActive
                ? "bg-red-600 hover:bg-red-700"
                : "bg-[#4CAF50] text-white hover:bg-[#4CAF50]"
            } w-[50px] h-[50px] transition-colors`}
            onClick={toggleCall}
          >
            <Phone className="w-5 h-5" />
          </Button>
        )}
        <AnimatePresence>
          {props.isListening && (
            <motion.div
              className="flex justify-center gap-6 mt-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Mute Button */}
              <Button
                size="icon"
                variant="secondary"
                className={`rounded-full hover:bg-red-600/80 ${
                  props.isMute ? "bg-red-600" : "bg-gray-200"
                }`}
                onClick={() => props.setMute(!props.isMute)}
              >
                <MicOff className="w-5 h-5" />
              </Button>

              {/* End Call Button */}
              <Button
                size="icon"
                variant="destructive"
                className="rounded-full bg-red-600 hover:bg-red-700"
                onClick={toggleCall}
              >
                <PhoneOff className="w-5 h-5" />
              </Button>

              {/* Volume Button */}
              <Button
                size="icon"
                variant={props.isSpeaking ? "secondary" : "destructive"}
                className={`rounded-full ${
                  props.isSpeaking
                    ? "bg-gray-200 hover:bg-gray-300"
                    : "bg-red-600 hover:bg-red-700"
                }`}
                onClick={() => props.setSpeaking(!props.isSpeaking)}
              >
                <Volume2 className="w-5 h-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
