import Image from "next/image";
import Link from "next/link";

import image1 from "@/public/about-1.jpg";
import image2 from "@/public/about-2.jpg";

import { getCabins } from "@/app/_lib/data-service";

// revalidate cache once per day  
export const revalidate = 86400

export const metadata = {
  title: "About",
};

async function Page() {
  const numOfCabins = (await getCabins()).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-x-8 sm:gap-x-12 lg:gap-x-24 gap-y-12 sm:gap-y-16 lg:gap-y-32 text-base sm:text-lg mt-8">
      <div className="md:col-span-3">
        <h1 className="mb-6 sm:mb-8 lg:mb-10 text-3xl sm:text-4xl font-medium text-accent-400">
          Welcome to The Wild Oasis
        </h1>
        <div className="space-y-6 sm:space-y-8">
          <p>
            Where nature&apos;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it&apos;s not just about the luxury
            cabins. It&apos;s about the experience of reconnecting with nature
            and enjoying simple pleasures with family.
          </p>
          <p>
            Our {numOfCabins} luxury cabins provide a cozy base, but the real freedom and
            peace you&apos;ll find in the surrounding mountains. Wander through
            lush forests, breathe in the fresh air, and watch the stars twinkle
            above from the warmth of a campfire or your hot tub.
          </p>
          <p>
            This is where memorable moments are made, surrounded by
            nature&apos;s splendor. It&apos;s a place to slow down, relax, and
            feel the joy of being together in a beautiful setting.
          </p>
        </div>
      </div>

      <div className="md:col-span-2">
        <Image
          src={image1}
          alt="Family sitting around a fire pit in front of cabin"
          placeholder="blur"
          quality={80}
        />
      </div>

      <div className="md:col-span-2">
        <Image
          src={image2}
          alt="Family that manages The Wild Oasis"
          placeholder="blur"
          quality={80}
        />
      </div>

      <div className="md:col-span-3">
        <h1 className="mb-6 sm:mb-8 lg:mb-10 text-3xl sm:text-4xl font-medium text-accent-400">
          Managed by our family since 1962
        </h1>

        <div className="space-y-6 sm:space-y-8">
          <p>
            Since 1962, The Wild Oasis has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>
          <p>
            Over the years, we&apos;ve maintained the essence of The Wild Oasis,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest; you&apos;re part of our extended family. So join us at The
            Wild Oasis soon, where tradition meets tranquility, and every visit
            is like coming home.
          </p>

          <div>
            <Link
              href="/cabins"
              className="mt-4 inline-block bg-accent-500 px-6 sm:px-8 py-4 sm:py-5 text-md sm:text-lg font-semibold text-primary-800 transition-all hover:bg-accent-600"
            >
              Explore our luxury cabins
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
