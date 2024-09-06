"use client";

import SubmitButton from "@/app/_components/SubmitButton";
import { updateGuest } from "@/app/_lib/actions";
import { nationalIDRegex } from "@/app/constants";

function UpdateProfileForm({ guest, children }) {
  const { fullName, email, countryFlag, nationalID } = guest;

  return (
    <form
      action={updateGuest}
      className="flex flex-col gap-4 bg-primary-900 px-8 py-6 sm:gap-6 sm:px-12 sm:py-8 sm:text-lg"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          name="fullName"
          defaultValue={fullName}
          className="w-full rounded-sm bg-primary-200 px-2.5 py-1.5 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 sm:px-5 sm:py-3"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          name="email"
          defaultValue={email}
          className="w-full rounded-sm bg-primary-200 px-2.5 py-1.5 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 sm:px-5 sm:py-3"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          {countryFlag && (
            <img
              src={countryFlag}
              alt="Country flag"
              className="hidden h-5 rounded-sm sm:block"
            />
          )}
        </div>
        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          pattern={nationalIDRegex.source}
          title="national id should only contain characters and number with minimum length of 6 and maximum 14"
          defaultValue={nationalID}
          className="w-full rounded-sm bg-primary-200 px-2.5 py-1.5 text-primary-800 shadow-sm sm:px-5 sm:py-3"
        />
      </div>

      <div className="flex items-center sm:justify-end">
        <SubmitButton loadingLabel="Updating...">Update profile</SubmitButton>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
