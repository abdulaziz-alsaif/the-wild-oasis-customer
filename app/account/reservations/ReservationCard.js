import Image from "next/image";
import Link from "next/link";

import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";

import DeleteReservation from "./DeleteReservation";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({ booking }) {
  const {
    id,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <div className="flex flex-wrap border border-primary-800">
      <div className="relative aspect-[245/96] w-full">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className="border-r border-primary-800 object-cover"
        />
      </div>

      <div className="flex flex-grow flex-col gap-4 px-4 py-3 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-y-2 sm:flex-nowrap">
          <h3 className="font-semibold md:text-lg lg:text-xl">
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="flex h-7 items-center rounded-sm bg-yellow-800 px-2 text-xs font-bold uppercase text-yellow-200 md:px-3">
              past
            </span>
          ) : (
            <span className="flex h-7 items-center rounded-sm bg-green-800 px-3 text-xs font-bold uppercase text-green-200">
              upcoming
            </span>
          )}
        </div>

        <p className="text-primary-300 md:text-lg">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="mt-auto flex flex-wrap items-baseline gap-2.5 md:gap-5">
          <p className="text-lg font-semibold text-accent-400 md:text-xl">
            ${totalPrice}
          </p>
          <p className="hidden text-primary-300 md:block">&bull;</p>
          <p className="text-primary-300 md:text-lg">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="text-xs text-primary-400 md:ml-auto md:text-sm">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      {!isPast(new Date(startDate)) && (
        <div className="flex w-full border-t border-primary-800">
          <Link
            href={`/account/reservations/edit/${id}`}
            className="group flex flex-grow items-center gap-2 border-r border-primary-800 px-3 py-2 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900 md:text-lg"
          >
            <PencilSquareIcon className="aspect-square w-5 text-primary-600 transition-colors group-hover:text-primary-800 md:w-6" />
            <span className="mt-1 group-hover:text-primary-800">Edit</span>
          </Link>
          <DeleteReservation bookingId={id} />
        </div>
      )}
    </div>
  );
}

export default ReservationCard;
