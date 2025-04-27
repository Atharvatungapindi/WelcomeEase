"use client";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Hamburger from "hamburger-react";
import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useLayoutEffect, useRef } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const updateMargin = () => {
      const mainGrid = document.getElementById("main-grid-xl");
      if (!mainGrid || !navbarRef.current) return;

      const computedStyle = getComputedStyle(mainGrid);
      requestAnimationFrame(() => {
        if (navbarRef.current) {
          navbarRef.current.style.marginLeft = computedStyle.marginLeft;
          navbarRef.current.style.marginRight = computedStyle.marginRight;
        }
      });
    };

    updateMargin();
    window.addEventListener("resize", updateMargin);

    return () => window.removeEventListener("resize", updateMargin);
  }, []);

  return (
    <nav
      className="fixed top-0 w-full z-50 shadow-md px-[24px]"
      style={{
        background:
          "linear-gradient(134deg, #EBF4F3 0%, #FBE7E5 26.92%, #EBF4F3 75.48%, #F5F1EB 90.86%)",
      }}
    >
      <div className=" h-24 flex items-center justify-between" ref={navbarRef}>
        <Link
          href="/"
          className="flex flex-col items-center transition-all duration-200 hover:scale-105"
        >
          <Home
            color="#FF385C"
            className="w-6 h-6 md:w-8 md:h-8 transition-all duration-200 hover:text-[#f30833]"
          />
          <h4
            className="text-[#FF385C] text-center font-montserrat text-[18px] md:text-[24px] font-bold leading-normal transition-all duration-200 hover:text-[#f30833]"
            style={{
              fontStyle: "normal",
            }}
          >
            WelcomeEase
          </h4>
        </Link>

        <div className="hidden md:flex items-center space-x-6 text-white">
            <Link
            href="mailto:contact@pannalabs.ai"
            className="text-[#FF385C] hover:text-[#f30833] text-center font-lato text-[17px] font-bold leading-normal tracking-[0.085px] transition-all duration-200 hover:scale-105"
            >
            Contact Us
            </Link>

          <Button
            variant="default"
            className="bg-transparent border border-[#FF385C] text-[#FF385C] font-bold px-6 py-2 
             rounded-[10px] transition-all hover:border-[#FFB347] hover:text-[#FFB347]"
            onClick={() => {
              window.open("https://forms.gle/EEmE88wesyDubc3s6", "_blank");
            }}
          >
            Join Waitlist
          </Button>
        </div>
        <div className="md:hidden flex items-center space-x-6">
          <Hamburger toggled={isOpen} toggle={setIsOpen} color="#E31B23" />
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="z-10 absolute w-fit h-fit mt-1 top-16 right-0 pr-2 flex flex-col justify-center items-center space-y-3 bg-white shadow-lg rounded-lg p-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href="mailto:contact@pannalabs.ai"
                  className="text-[#FF385C] hover:text-[#f30833] text-center font-lato text-[14px] font-normal leading-normal tracking-[0.085px] transition-all duration-200 hover:underline hover:scale-105
 font-medium p-2"
                >
                  Contact Us
                </Link>
                <Button
                  variant="default"
                  className="bg-[#FF385C] hover:bg-[#C41017] font-bold w-full"
                  onClick={() => {
                    window.open(
                      "https://forms.gle/EEmE88wesyDubc3s6",
                      "_blank"
                    );
                  }}
                >
                  Join our Waitlist
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
