import React, { useEffect, useState } from 'react'
import AccountNav from '../AccountNav'
import axios from 'axios'
import PlaceImg from '../PlaceImg'
import format from 'date-fns/format'
import { differenceInCalendarDays } from 'date-fns'
import { Link } from 'react-router-dom'

const BookingsPage = () => {
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        axios.get('/bookings').then((response) => {
            setBookings(response.data)
        })
    }, [])


    return (
        <div>
            <AccountNav />

            <div>
                {bookings?.length > 0 && bookings.map(booking => (
                    <Link to={`/account/bookings/${booking._id}`} className='flex gap-4 bg-gray-200 rounded-2xl overflow-hidden'>
                        <div className='w-48'>
                            <PlaceImg place={booking.place} />
                        </div>

                        <div className='py-3 pr-3 grow'>
                            <h2 className='text-xl'>{booking.place.title}</h2>
                            <div className='border-t border-gray-300'>
                                {format(new Date(booking.checkIn), 'yyyy-MM-dd')} &rarr; {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
                            </div>

                            <div>
                                Total Price: Rs {booking.price}
                            </div>

                            <div className='text-xl'>
                                Number of days: {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} <br />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default BookingsPage
