"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";
import { getBookedDatesByCabinId } from "./data-service";
import { isAlreadyBooked } from "./helpers";
import { nationalIDRegex, observationsMaxLength } from "../constants";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function createReservation(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  const { cabinId, startDate, endDate } = bookingData;

  const {
    data: { maxCapacity },
    error: cabinError,
  } = await supabase.from("cabins").select("*").eq("id", cabinId).single();

  if (cabinError) throw new Error("cabin could not get loaded");

  if (numGuests > maxCapacity)
    throw new Error("number of guests is more than max capacity of cabins");

  if (observations.length > observationsMaxLength)
    throw new Error(
      `Observations can accept only maximum length of ${observationsMaxLength} characters`,
    );

  const bookedDates = await getBookedDatesByCabinId(cabinId);
  const isBooked = isAlreadyBooked(
    { from: startDate, to: endDate },
    bookedDates,
  );

  if (isBooked)
    throw new Error("Cabin has already been booked in dates that you selected");

  const newBookingData = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests,
    observations,
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: false,
  };

  const { error } = await supabase.from("bookings").insert([newBookingData]);

  if (error) throw new Error("Booking could not be created");

  console.log(newBookingData);

  revalidatePath(`/cabins/${cabinId}`);
  redirect("/cabins/thankyou");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId)
    .eq("guestId", session.user.guestId); // to make sure only guest of that booking can update it

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const bookingId = formData.get("bookingId");
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");

  console.log(observations.length);

  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", bookingId)
    .eq("guestId", session.user.guestId)
    .single();

  if (bookingError) throw new Error("Booking could not get loaded");

  const {
    data: { maxCapacity },
    error: cabinError,
  } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", booking.cabinId)
    .single();

  if (cabinError) throw new Error("cabin could not get loaded");

  if (numGuests > maxCapacity)
    throw new Error("number of guests is more than max capacity of cabins");
  if (observations.length > observationsMaxLength)
    throw new Error(
      `Observations can accept only maximum length of ${observationsMaxLength} characters`,
    );

  const updatedFields = { numGuests, observations };

  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Reservation could not be updated");
  }

  revalidatePath("/account/reservations", "layout");
  redirect("/account/reservations");
}

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality")?.split("%");
  if (!nationalIDRegex.test(nationalID))
    throw new Error("Please provide a valid national id");

  const newGuestData = { nationalID, nationality, countryFlag };

  const { error } = await supabase
    .from("guests")
    .update(newGuestData)
    .eq("id", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}
