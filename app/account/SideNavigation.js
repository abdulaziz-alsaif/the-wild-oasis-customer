"use client";

import { useState, useLayoutEffect } from "react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import SidebarLinks from "./SidebarLinks";

const SideNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  console.log(isMobile, isOpen);

  useLayoutEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => isMobile && setIsOpen(false);

  return (
    <>
      {isMobile ? (
        <>
          <button onClick={toggleMenu} className="flex items-center justify-center p-2 rounded-md text-primary-600 hover:text-primary-800 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 transition-colors duration-200 ease-in-out">
            <Bars3Icon className="h-6 w-6" />
          </button>

          <aside
            className={`fixed left-0 top-0 h-screen w-64 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} z-10 space-y-4 bg-primary-900 px-4 py-8 shadow-lg transition-transform`}
          >
            <button onClick={closeMenu} className="ml-auto block">
              <XMarkIcon className="h-6 w-6" />
            </button>
            <SidebarLinks closeMenu={closeMenu}/>
          </aside>
        </>
      ) : (
        <aside className="border-r border-primary-900">
          <SidebarLinks />
        </aside>
      )}
    </>
  );
};

export default SideNavigation;
