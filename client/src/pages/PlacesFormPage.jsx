import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Perks from '../Perks'
import axios from 'axios'
import PhotosUploader from '../PhotosUploader'
import AccountNav from '../AccountNav'

const PlacesFormPage = () => {
    const { action } = useParams()
    const {id} = useParams()
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [perks, setPerks] = useState('')
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)
    const [redirect, setRedirect] = useState(false);
    const [price, setPrice] = useState(100);
    
    useEffect(()=>{
        if(!id) return

        axios.get('/places/'+id).then((res)=>{
            const {data} = res
            setTitle(data.title)
            setAddress(data.address)
            setAddedPhotos(data.photos)
            setDescription(data.description)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxGuests(data.maxGuests)
            setPrice(data.price)
        })
    }, [id])

    const inputHeader = (text) => {
        return (
            <h2 className='text-2xl mt-4'>{text}</h2>
        )
    }

    const inputDescription = (text) => {
        return (
            <p className='text-gray-500 text-sm'>{text}</p>
        )
    }

    const preInput = (header, description) => {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }


    const savePlace = async (e) => {
        e.preventDefault();
        const placeData = {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price}

        if(id){
            await axios.put('/places', { id, ...placeData });

            setRedirect(true)
        }

        else{
        await axios.post('/places', { placeData });

        setRedirect(true)
        }
    }

    if(redirect){
        return <Navigate to={'/account/places'}/>
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                {preInput('Title', 'Title for your place')}
                <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder='title' />

                {preInput('Address', 'Address of this place')}
                <input type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} placeholder='address' />

                {preInput('Photos', 'Add various pics')}


                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                {preInput('Description', 'Description of the place')}
                <textarea value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>


                {preInput('Perks', 'Select all the perks of your place')}
                <div className='grid gap-2 mt-2 grid-cols-2 md: grid-cols-3 lg: grid-cols-6'>
                    <Perks selected={perks} onChange={setPerks} />
                </div>

                {preInput('Extra Info', 'Add some more information')}
                <textarea value={extraInfo} onChange={(e) => { setExtraInfo(e.target.value) }}></textarea>

                {preInput('Check in & out time', 'Add Check in & out times')}

                <div className='grid gap-2 grid-cols-2 md:grid-cols-4'>
                    <div className=''>
                        <h3 className='mt-2 -mb-1'>Check in time</h3>
                        <input type="text" value={checkIn} onChange={(e) => { setCheckIn(e.target.value) }} placeholder='12:00' />
                        {/* {preInput('Check in time', 'Add Check intimes')} */}

                    </div>

                    <div>
                        <h3 className='mt-2 -mb-1'>Check out time</h3>
                        <input type="text" value={checkOut} onChange={(e) => { setCheckOut(e.target.value) }} placeholder='11:00' />
                    </div>

                    <div>
                        <h3 className='mt-2 -mb-1'>Max guests allowed</h3>
                        <input type="number" value={maxGuests} onChange={(e) => { setMaxGuests(e.target.value) }} placeholder='2' />
                    </div>

                    <div>
                        <h3 className='mt-2 -mb-1'>Price per night</h3>
                        <input type="number" value={price} onChange={(e) => { setPrice(e.target.value) }} placeholder='2' />
                    </div>
                </div>

                <button className='primary my-4'>Save</button>
            </form>
        </div>
    )
}

export default PlacesFormPage
