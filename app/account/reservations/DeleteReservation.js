"use client";

import { useTransition } from "react";

import { TrashIcon } from "@heroicons/react/24/solid";

import SpinnerMini from "@/app/_components/SpinnerMini";

function DeleteReservation({ bookingId, onDelete }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm("Are you sure you to delete this reservation?"))
      startTransition(() => onDelete(bookingId));
  }

  return (
    <button
      onClick={handleDelete}
      className="group flex flex-grow items-center gap-2 border-r border-primary-800 px-3 py-2 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-red-600 md:text-lg"
      disabled={isPending}
    >
      {!isPending ? (
        <>
          <TrashIcon className="aspect-square w-5 text-primary-600 transition-colors group-hover:text-red-50 md:w-6" />
          <span className="mt-1 group-hover:text-red-50">Delete</span>
        </>
      ) : (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;
