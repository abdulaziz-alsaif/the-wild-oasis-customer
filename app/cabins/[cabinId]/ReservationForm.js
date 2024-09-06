"use client";

import SubmitButton from "@/app/_components/SubmitButton";
import { useReservation } from "@/app/_context/ReservationContext";
import { createReservation } from "@/app/_lib/actions";
import { observationsMaxLength } from "@/app/constants";
import { differenceInDays, formatISO, isValid } from "date-fns";
import Image from "next/image";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();

  const { maxCapacity, regularPrice, discount, id } = cabin;

  const isValidStartDate = range?.from && isValid(new Date(range.from));
  const isValidEndDate = range?.to && isValid(new Date(range.to));

  const startDate = isValidStartDate
    ? formatISO(new Date(range.from), { representation: "date" })
    : null;
  const endDate = isValidEndDate
    ? formatISO(new Date(range.to), { representation: "date" })
    : null;
  const numNights =
    isValidStartDate && isValidEndDate
      ? differenceInDays(new Date(endDate), new Date(startDate))
      : 0;
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createReservationWithData = createReservation.bind(null, bookingData);

  return (
    <div>
      <div className="hidden items-center bg-primary-800 px-6 py-2 text-primary-300 sm:flex sm:justify-between sm:px-16">
        <p>Logged in as</p>

        <div className="mt-2 flex items-center gap-4 sm:mt-0">
          <div className="relative h-8 w-8">
            <Image
              fill
              className="rounded-full object-cover"
              referrerPolicy="no-referrer"
              src={user.image}
              alt={user.name}
            />
          </div>
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          await createReservationWithData(formData);
          resetRange();
        }}
        className="flex flex-col gap-5 bg-primary-900 px-6 py-10 text-lg sm:px-16"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            maxLength={observationsMaxLength}
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          {!(startDate && endDate) ? (
            <p className="text-base text-primary-300">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton loadingLabel="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
