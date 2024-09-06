import { auth } from "@/app/_lib/auth"
import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-service"

import DateSelector from "./DateSelector"
import ReservationForm from "./ReservationForm"
import LoginMessage from "@/app/_components/LoginMessage"

async function Reservation({ cabin }) {
    const session = await auth()

    const [bookedDates, settings] = await Promise.all([getBookedDatesByCabinId(cabin.id), getSettings()])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-primary-800">
            <DateSelector cabin={cabin} settings={settings} bookedDates={bookedDates} />
            {session?.user ?<ReservationForm cabin={cabin} user={session.user}/>: <LoginMessage />}
        </div>
    )
}

export default Reservation
