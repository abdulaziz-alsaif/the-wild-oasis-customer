"use client";

import { useLayoutEffect, useState } from "react";

import { differenceInDays, isPast, isSameDay } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { useReservation } from "@/app/_context/ReservationContext";
import { isAlreadyBooked } from "@/app/_lib/helpers";

function DateSelector({ cabin, settings, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();
  const [numberOfMonths, setNumberOfMonths] = useState(1);

  const displayedRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  const { regularPrice, discount } = cabin;
  const numNights = differenceInDays(displayedRange.to, displayedRange.from);
  const cabinPrice = numNights * (regularPrice - discount);

  const { minBookingLength, maxBookingLength } = settings;

  // On mobile devices show only one month
  useLayoutEffect(() => {
    if(window.innerWidth > 640) {
      setNumberOfMonths(2)
    }
  }, [])

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="self-center py-6 lg:pb-0 lg:pt-12"
        mode="range"
        onSelect={(selectedRange) => selectedRange && setRange(selectedRange)}
        selected={displayedRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        toYear={new Date().getFullYear() + 2}
        captionLayout="dropdown"
        numberOfMonths={numberOfMonths}
        disabled={(day) =>
          isPast(day) || bookedDates.some((date) => isSameDay(date, day))
        }
      />

      <div className="flex flex-col sm:flex-row items-center justify-between bg-accent-500 px-4 sm:px-8 py-2 text-primary-800">
        <div className="flex items-center gap-3 sm:gap-6">
          <p className="flex items-baseline gap-2">
            {discount > 0 ? (
              <>
                <span className="text-xl sm:text-2xl">${regularPrice - discount}</span>
                <span className="font-semibold text-primary-700 line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-xl sm:text-2xl">${regularPrice}</span>
            )}
            <span>/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-xl sm:text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-base sm:text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-xl sm:text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="mt-3 sm:mt-0 border border-primary-800 px-4 py-2 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
