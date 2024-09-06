import { ReservationProvider } from "./_context/ReservationContext";
import Header from "./_components/Header";

import "@/app/_styles/globals.css";

import { Josefin_Sans } from "next/font/google";

export const metadata = {
  title: {
    template: "%s - The Wild Oasis",
    default: "Welcome to The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

const josefinFont = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefinFont.className} relative flex min-h-screen flex-col bg-primary-950 text-primary-50 antialiased`}
      >
        <Header />

        <div className="grid flex-1 px-4 py-2 sm:px-8">
          <main className="mx-auto w-full max-w-7xl">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
