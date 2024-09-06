"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

import SignOutButton from "../_components/SignOutButton";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SidebarLinks({ closeMenu }) {
  const currentPathname = usePathname();
  const router = useRouter();

  function handleClick(e, href) {
    e.preventDefault();
    closeMenu?.();
    router.push(href)
  }

  return (
    <ul className="flex h-full flex-col gap-2 lg:text-lg">
      {navLinks.map((link) => (
        <li key={link.name}>
          <Link
            className={`flex gap-4 px-2.5 py-1.5 sm:px-5 sm:py-3 font-semibold text-primary-200 transition-colors hover:bg-primary-900 hover:text-primary-100 ${currentPathname === link.href ? "bg-primary-900" : ""}`}
            href={link.href}
            onClick={(e) => handleClick(e, link.href)}
          >
            {link.icon}
            <span className="md:hidden lg:inline">{link.name}</span>
          </Link>
        </li>
      ))}

      <li className="sticky top-[calc(100dvh-52px)]">
        <SignOutButton />
      </li>
    </ul>
  );
}

export default SidebarLinks;
