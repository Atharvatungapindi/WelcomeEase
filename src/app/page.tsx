"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import VoiceInput from "@/components/voice-input";
import OrderDetails from "@/components/recentChats";
import { Menu } from "@/components/visualGuide";
import {
  CallConfig,
  MenuItem,
  foodistaanConfig,
  InactivityMessage,
} from "@/lib/types";
import { getSystemPrompt, selectedTools } from "@/lib/agent-config";
import {
  Role,
  Transcript,
  UltravoxExperimentalMessageEvent,
  UltravoxSessionStatus,
} from "ultravox-client";
import { endCall, startCall, toggleMute } from "@/lib/callFuncs";
import { ChatMessages } from "@/components/chat-bubble";
import { Button } from "@/components/ui/button";

const menuItems: MenuItem[] = [
  {
    title: "Coffee",
    // category_avatar: "coffee.jpeg",
    description: "Freshly brewed coffee",
    // items: [
    //   { id: "1", name: "Espresso", price: 2.5, image: "/images/espresso.jpg" },
    //   { id: "2", name: "Latte", price: 3.5, image: "/images/latte.jpg" },
    // ],
  },
  {
    title: "Smart Lock",
    // category_avatar: "snacks.jpeg",
    description: "Smart lock for your door",
    // items: [
    //   { id: "3", name: "Chips", price: 1.5, image: "/images/chips.jpg" },
    //   { id: "4", name: "Cookies", price: 2.0, image: "/images/cookies.jpg" },
    // ],
  },
];

const inactivityMessages: InactivityMessage[] = [
  {
    message: "Are you still there?",
    duration: "30s",
  },
  {
    message: "If there's nothing else, may I end the call?",
    duration: "15s",
  },
  {
    message: "Thank you for calling. Have a great day. Goodbye.",
    duration: "10s",
    endBehavior: "END_BEHAVIOR_HANG_UP_SOFT",
  },
];

export default function OrderPage() {
  const config: foodistaanConfig = {
    title: "welcomeease",
    overview: "Welcome to welcomeease How can I help you today?",
    callConfig: {
      systemPrompt: getSystemPrompt(menuItems),
      model: "fixie-ai/ultravox-70B",
      languageHint: "en",
      selectedTools: selectedTools,
      voice: "44504e63-59c5-4f69-9340-423231c79a03",
      temperature: 0.1,
      maxDuration: "240s",
      timeExceededMessage: "This session will expire soon.",
      inactivityMessages: inactivityMessages,
    },
  };

  const [isListening, setIsListening] = useState(false);
  const [agentStatus, setAgentStatus] = useState<string>("");
  const [callTranscript, setCallTranscript] = useState<Transcript[] | null>([]);
  const [_callDebugMessage, setCallDebugMessage] = useState<
    UltravoxExperimentalMessageEvent[]
  >([]);
  const [_customerProfileKey, setCustomerProfileKey] = useState<string | null>(
    null
  );

  const [isMute, setIsMute] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const conversationRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  const handleStateChange = useCallback(
    (status: UltravoxSessionStatus | string | undefined) => {
      if (status) {
        setAgentStatus(status);
        console.log(status);
      } else {
        setAgentStatus("");
      }
    },
    []
  );

  const handleCallDebugMessages = useCallback(
    (messages: UltravoxExperimentalMessageEvent) => {
      setCallDebugMessage((prevMsg) => [messages, ...prevMsg]);
      console.log(messages);
    },
    []
  );

  const clearCustomerProfile = useCallback(() => {
    // This will trigger a re-render of CustomerProfileForm with a new empty profile
    setCustomerProfileKey((prev) => (prev ? `${prev}-cleared` : "cleared"));
  }, []);

  const handleTranscriptChange = useCallback(
    (transcripts: Transcript[] | undefined) => {
      if (transcripts && transcripts.length > 0) {
        setCallTranscript([...transcripts.reverse()]);
      }
    },
    []
  );

  const handleStartCall = async () => {
    try {
      handleStateChange("Starting Call...");
      setCallTranscript(null);
      setCallDebugMessage([]);
      clearCustomerProfile();

      const newKey = `call-${Date.now()}`;
      setCustomerProfileKey(newKey);

      let callConfig: CallConfig = {
        systemPrompt: config.callConfig.systemPrompt,
        model: config.callConfig.model,
        languageHint: config.callConfig.languageHint,
        voice: config.callConfig.voice,
        temperature: config.callConfig.temperature,
        maxDuration: config.callConfig.maxDuration,
        timeExceededMessage: config.callConfig.timeExceededMessage,
        inactivityMessages: config.callConfig.inactivityMessages,
        selectedTools: config.callConfig.selectedTools,
      };
      const paramOverride = {
        callId: newKey,
      };

      let cpTools = config?.callConfig?.selectedTools?.find(
        (tool) => tool.toolName === "createProfile"
      );
      if (cpTools) {
        cpTools.parameterOverrides = paramOverride;
      }
      callConfig.selectedTools = config.callConfig.selectedTools;
      callConfig.systemPrompt = getSystemPrompt(menuItems);

      await startCall(
        {
          onStatusChange: handleStateChange,
          onTranscriptChange: handleTranscriptChange,
          onDebugMessage: handleCallDebugMessages,
        },
        callConfig,
        true
      );
    } catch (e) {
      console.log(e);
    }
  };
  const handleEndCallButtonClick = async () => {
    try {
      handleStateChange("Ending Call...");
      await endCall();
      setIsListening(false);

      clearCustomerProfile();
      setCustomerProfileKey(null);
      handleStateChange("Call ended successfully");
    } catch (error) {
      handleStateChange(
        `Error ending call: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  };

  useEffect(() => {
    if (conversationRef.current)
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
  }, [callTranscript]);
  useEffect(() => {
    if (isListening) handleStartCall();
    else handleEndCallButtonClick();
  }, [isListening]);

  useEffect(() => {
    toggleMute(Role.USER);
  }, [isMute]);
  useEffect(() => {
    toggleMute(Role.USER);
  }, [isSpeaking]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      console.log("Is mobile:" + isMobile);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="mt-24 text-white p-6"
      style={{
        // height: "100vh",
        background:
          "linear-gradient(134deg, #EBF4F3 0%, #FBE7E5 26.92%, #EBF4F3 75.48%, #F5F1EB 90.86%)",
      }}
    >
      {isMobile ? (
        <div className="grid grid-cols-1 gap-6 max-w-7xl mx-auto">
          {/* Voice Assistant Section */}
          <Button
            variant="default"
            className="bg-primary hover:bg-primary/90"
            onClick={() => {
              window.open("https://forms.gle/EEmE88wesyDubc3s6", "_blank");
            }}
          >
            Join Our Waitlist
          </Button>
          <VoiceInput
            isListening={isListening}
            setListening={setIsListening}
            isMute={isMute}
            setMute={setIsMute}
            isSpeaking={isSpeaking}
            setSpeaking={setIsSpeaking}
            agentStatus={agentStatus}
          />
          {/* Menu Section */}
          <Menu />

          {/* Current Order Section */}
          <OrderDetails />
          <ChatMessages messages={callTranscript} />
        </div>
      ) : (
        <div
          className="grid grid-cols-12 gap-6 max-w-7xl mx-auto h-full min-h-0"
          id="main-grid-xl"
        >
          {/* Voice Assistant Section (Left Side, 5/7 Width, Top) */}
          <div className="col-span-5 flex flex-col">
            <VoiceInput
              isListening={isListening}
              setListening={setIsListening}
              isMute={isMute}
              setMute={setIsMute}
              isSpeaking={isSpeaking}
              setSpeaking={setIsSpeaking}
              agentStatus={agentStatus}
            />
            <ChatMessages messages={callTranscript} />
          </div>

          {/* Menu Section and Current Order Section (Right Side, 2/7 Width) */}
          <div className="col-span-7 flex flex-col min-h-0 gap-6">
            <Menu />
            <OrderDetails />
          </div>
        </div>
      )}

      {/* Conversation Section */}
      {/* <ChatMessages messages={callTranscript} /> */}
    </div>
  );
}
