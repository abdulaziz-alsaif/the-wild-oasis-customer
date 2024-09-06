import Image from "next/image";
import Link from "next/link";

import logo from "@/public/logo.png"; // statically served

function Logo() {
  return (
    <Link href="/" className="z-10 flex items-center gap-2 sm:gap-4 md:gap-6">
      <div className="relative aspect-square h-10 sm:h-16">
        <Image
          src={logo}
          fill
          alt="The Wild Oasis logo"
          quality={100}
          className="rounded-full object-cover"
        />
      </div>
      <span className="hidden text-lg font-semibold text-primary-100 sm:inline sm:text-xl md:text-2xl">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
