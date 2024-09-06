import Image from "next/image";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";

import TextExpander from "@/app/_components/TextExpander";

function Cabin({ cabin }) {
  const { name, image, description, maxCapacity } = cabin;

  return (
    <div className="mb-24 grid grid-cols-1 gap-10 border border-primary-800 py-3 lg:grid-cols-[3fr_4fr] lg:gap-20 lg:px-10">
      <div className="relative h-64 sm:h-[30rem] lg:h-auto lg:-translate-x-3 lg:scale-[1.15]">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className="object-cover"
        />
      </div>

      <div className="px-6 md:px-8 lg:px-0">
        <h3 className="mb-5 bg-primary-950 p-6 pb-1 text-5xl font-black text-accent-100 md:text-7xl lg:translate-x-[-254px]">
          Cabin {name}
        </h3>

        <div className="scrollbar mb-10 h-36 overflow-y-auto pr-2 text-lg text-primary-300">
          <TextExpander>{description}</TextExpander>
        </div>

        <ul className="mb-7 flex flex-col gap-4">
          <li className="flex items-center gap-3">
            <UsersIcon className="mb-1.5 h-5 w-5 text-primary-600" />
            <span className="text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex items-center gap-3">
            <MapPinIcon className="mb-1.5 h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex items-center gap-3">
            <EyeSlashIcon className="mb-1.5 h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Cabin;
