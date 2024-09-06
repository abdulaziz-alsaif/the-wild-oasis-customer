"use client";

import { createContext, useContext, useState } from "react";

const initialState = { from: undefined, to: undefined };

const ReservationContext = createContext({
  range: initialState,
  setRange: () => {},
  resetRange: () => {},
});

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);

  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);

  if (context === undefined)
    throw new Error("Reservation Context was used outside of provider");

  return context;
}

export { ReservationProvider, useReservation };
