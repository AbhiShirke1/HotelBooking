import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const IndexPage = () => {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    axios.get('/places').then(res => {
      setPlaces(res.data)
    })
  }, [])

  return (
    <div className='mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {places.length > 0 && places.map(place => (
        <Link to={'/place/' + place._id}>
          <div>
            <div className='bg-gray-500 mb-2 rounded-2xl flex'>
              {place.photos?.[0] && (
                <img className='rounded-2xl object-cover aspect-sqaure' src={'http://localhost:4000/uploads/' + place.photos[0]} alt="img" />
              )}
            </div>
            <h2 className='font-bold'>{place.address}</h2>
            <h3 className='text-sm text-gray-500'>{place.title}</h3>

            <div className='mt-2'>
              Rs <span className='font-bold'>{place.price}</span> per night
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default IndexPage
