import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";

import SelectCountry from "./SelectCountry";
import UpdateProfileForm from "./UpdateProfileForm";

export const metadata = {
  title: "Update profile",
};

async function Page() {
  const session = await auth();
  const guest = await getGuest(session.user.email)

  return (
    <div>
      <h2 className="mb-4 text-xl sm:text-2xl font-semibold text-accent-400">
        Update your guest profile
      </h2>

      <p className="mb-8 sm:text-lg text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm guest={guest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="w-full rounded-sm bg-primary-200 px-2.5 py-1.5 sm:px-5 sm:py-3 text-primary-800 shadow-sm"
          defaultCountry={guest.nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}

export default Page;
