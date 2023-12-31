import { differenceInCalendarDays } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../UserContext'

const BookingWidget = ({place}) => {
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [numberOfGuests, setNumberOfGuests] = useState(1)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [redirect, setRedirect] = useState('')
    const {user} = useContext(UserContext)

    useEffect(()=>{
        if(user){
            setName(user.name)
        }
    }, [user])

    let numberOfDays = 0;
    if(checkIn && checkOut){
        numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    const bookThisPlace = async()=>{
        const response = await axios.post('/bookings', {checkIn, checkOut, numberOfDays, name, phone, place: place._id, price: numberOfDays*place.price})

        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`)
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }

    return (
        <div className='bg-white shadow p-4 rounded-2xl'>
            <div className='text-2xl text-center mb-2'>
                Price: Rs {place.price}/per night
            </div>

            <div className="border rounded-2xl">
                <div className="flex">
                    <div className=' py-2 px-4 '>
                        <label htmlFor="">Check In: </label>
                        <input type="date" name="" id="" value={checkIn} onChange={(e)=>{setCheckIn(e.target.value)}}/>
                    </div>

                    <div className=' py-2 px-4 border-l'>
                        <label htmlFor="">Check Out: </label>
                        <input type="date" name="" id="" value={checkOut} onChange={(e)=>{setCheckOut(e.target.value)}} />
                    </div>
                </div>

                <div className=' py-2 px-4 border-t'>
                    <label htmlFor="">Number of guests: </label>
                    <input type="number" value={numberOfGuests} onChange={(e)=>{setNumberOfGuests(e.target.value)}} />
                </div>

                {numberOfDays>0 && (
                    <div className=' py-2 px-4 border-t'>
                    <label htmlFor="">Full name: </label>
                    <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} />

                    <label htmlFor="">Phone number: </label>
                    <input type="tel" value={phone} onChange={(e)=>{setPhone(e.target.value)}} />
                </div>   
                )}
            </div>

            <button onClick={bookThisPlace} className="primary mt-4">
                Book this place 
                {numberOfDays>0 && (
                    <span> Rs {numberOfDays*place.price}
                    </span>
                )}
            </button>
        </div>
    )
}

export default BookingWidget
