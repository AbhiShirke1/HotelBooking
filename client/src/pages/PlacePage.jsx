import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import BookingWidget from '../BookingWidget'
import PageGallery from './PageGallery'

const PlacePage = () => {
    const { id } = useParams()
    const [place, setPlace] = useState(null)

    useEffect(() => {
        if (!id) {
            return;
        }

        axios.get(`/places/${id}`).then((res) => {
            setPlace(res.data)
        })
    }, [id])

    if (!place) return ""

    


    return (
        <div className='mt-4 bg-gray-100 -mx-8 px-8 py-8'>
            <h1 className='text-3xl'>{place.title}</h1>
            <a href={'https://maps.google.com/?q=' + place.address} target='_balk' className='my-2 block font-semibold underline'>{place.address}</a>

            <PageGallery place={place}/>



            <div className='mt-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]'>
                <div>
                    <div className='my-4'>
                        <h2 className='font-semibold text-2xl'>Description</h2>
                        {place.description}
                    </div>
                    <b>Check In: </b> {place.checkIn} <br />
                    <b>Check Out: </b> {place.checkOut} <br />
                    <b>Max number of guests: </b> {place.maxGuests}
                    <div className='text-sm gray-700 leading-4 mt-2'><b>Extra Features: </b>{place.extraInfo}</div>
                </div>

                <div>
                    <BookingWidget place={place}/>
                </div>
            </div>

        </div>
    )
}

export default PlacePage
