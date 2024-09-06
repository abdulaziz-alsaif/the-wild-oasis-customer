import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";

import { signOutAction } from "@/app/_lib/actions";

function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button className="flex w-full items-center gap-4 px-2.5 py-1.5 sm:px-5 sm:py-3 font-semibold text-primary-200 transition-colors hover:bg-primary-900 hover:text-primary-100">
        <ArrowRightStartOnRectangleIcon className="h-5 w-5 text-primary-600" />
        <span className="md:hidden lg:inline">Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
