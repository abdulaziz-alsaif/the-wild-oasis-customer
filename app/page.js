import Image from "next/image";
import Link from "next/link";

import bg from "@/public/bg.png";

export default function Home() {
  return (
    <main className="flex h-full items-center justify-center">
      <Image src={bg} fill placeholder="blur" className="object-cover object-top"
      quality={80}
      alt="Mountains and forests with two cabins" />

      <div className="relative text-center flex-1">
        <h1 className="mb-10 text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight text-primary-50">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-6 py-4 sm:px-8 sm:py-6 text-md sm:text-lg lg:text-xl font-semibold text-primary-800 transition-all hover:bg-accent-600 block w-fit mx-auto"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
