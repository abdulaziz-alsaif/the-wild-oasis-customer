import Image from "next/image";
import Link from "next/link";

import { UsersIcon } from "@heroicons/react/24/solid";

function CabinCard({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="flex flex-col border border-primary-800 sm:flex-row">
      <div className="relative h-56 w-full sm:h-auto sm:w-1/2">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="border-b border-primary-800 object-cover sm:border-b-0 sm:border-r"
        />
      </div>

      <div className="flex-grow">
        <div className="px-5 py-4 sm:px-7 sm:py-5">
          <h3 className="mb-3 text-xl font-semibold text-accent-500 sm:text-2xl">
            Cabin {name}
          </h3>

          <div className="mb-2 flex items-center gap-2 sm:gap-3">
            <UsersIcon className="mb-1.5 h-5 w-5 text-primary-600" />
            <p className="text-base text-primary-200 sm:text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex items-baseline gap-3 md:justify-end">
            {discount > 0 ? (
              <>
                <span className="text-2xl font-[350] sm:text-3xl">
                  ${regularPrice - discount}
                </span>
                <span className="font-semibold text-primary-600 line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl font-[350] sm:text-3xl">
                ${regularPrice}
              </span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="border-t border-t-primary-800 text-right">
          <Link
            href={`/cabins/${id}`}
            className="inline-block w-full border-l border-primary-800 px-6 py-4 text-center transition-all hover:bg-accent-600 hover:text-primary-900 sm:w-auto sm:border-l-0 sm:text-right"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
