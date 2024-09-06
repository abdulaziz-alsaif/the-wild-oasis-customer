import { Suspense } from "react";

import { getCabin, getCabins } from "@/app/_lib/data-service";
import Spinner from "@/app/_components/Spinner";
import Cabin from "./Cabin";
import Reservation from "./Reservation";

// next will wait for this data fetching here inside the generateMetadata function to complete before streaming the UI to the client
// Also next extends the fetch API to automatically memoize requests
export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);

  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="mb-10 text-center text-3xl sm:text-5xl font-semibold text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
