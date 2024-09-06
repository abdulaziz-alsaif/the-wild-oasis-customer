import Link from "next/link";

function Page() {
    return (
        <div className="text-center space-y-6 h-full flex flex-col items-center justify-center">
          <h1 className="text-3xl font-semibold">
            Thank you for your reservation!
          </h1>
          <Link
            href="/account/reservations"
            className="underline text-xl text-accent-500 inline-block"
          >
            Manage your reservations &rarr;
          </Link>
        </div>
      );
}

export default Page;