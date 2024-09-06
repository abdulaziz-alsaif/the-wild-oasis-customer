import Link from "next/link";

import { auth } from "@/app/_lib/auth";
import Image from "next/image";

async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-lg sm:text-xl">
      <ul className="flex items-center gap-3 sm:gap-4 md:gap-8">
        <li>
          <Link
            href="/cabins"
            className="transition-colors hover:text-accent-400"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="transition-colors hover:text-accent-400"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user ? (
            <Link
              href="/account"
              className="flex items-center gap-4 transition-colors hover:text-accent-400"
            >
              <div className="relative hidden h-8 w-8 md:block">
                <Image
                  fill
                  className="rounded-full object-cover"
                  src={session.user.image}
                  alt={session.user.name}
                  referrerPolicy="no-referrer"
                />
              </div>
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="transition-colors hover:text-accent-400"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
