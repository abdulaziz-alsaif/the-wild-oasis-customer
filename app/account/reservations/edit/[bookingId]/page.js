import { auth } from "@/app/_lib/auth";
import { getBooking, getCabin } from "@/app/_lib/data-service";

import SubmitButton from "@/app/_components/SubmitButton";
import { updateReservation } from "@/app/_lib/actions";
import { observationsMaxLength } from "@/app/constants";

async function Page({ params }) {
  const session = await auth();
  const booking = await getBooking(params.bookingId);
  const cabin = await getCabin(booking.cabinId);

  // to make sure only guest of that booking can see this form
  if (session.user.guestId !== booking.guestId)
    throw new Error("You are not allowed to access this booking");

  const { id, numGuests, observations } = booking;
  const { maxCapacity } = cabin;

  return (
    <div>
      <h2 className="mb-7 text-xl font-semibold text-accent-400 sm:text-2xl">
        Edit Reservation #{id}
      </h2>

      <form
        action={updateReservation}
        className="flex flex-col gap-4 bg-primary-900 px-8 py-6 sm:gap-6 sm:px-12 sm:py-8 sm:text-lg"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
            className="w-full rounded-sm bg-primary-200 px-2.5 py-1.5 text-primary-800 shadow-sm sm:px-5 sm:py-3"
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
            maxLength={observationsMaxLength}
            defaultValue={observations}
            className="w-full rounded-sm bg-primary-200 px-2.5 py-1.5 text-primary-800 shadow-sm sm:px-5 sm:py-3"
          />
        </div>

        <input type="hidden" name="bookingId" value={id} />

        <div className="flex items-center justify-end">
          <SubmitButton
            className="bg-accent-500 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
            loadingLabel="Updating..."
          >
            Update reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default Page;
