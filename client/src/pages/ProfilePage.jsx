import React, { useContext, useState } from 'react'
import { UserContext } from '../../UserContext'
import { Navigate, Link, useParams } from 'react-router-dom'
import axios from 'axios'
import PlacesPage from './PlacesPage'
import AccountNav from '../AccountNav'

const Account = () => {
  const [toHomePage, setToHomePgae] = useState(null);
  const { ready, user, setUser } = useContext(UserContext)
  let { subpage } = useParams()

  const logout = async () => {
    try {
      const a = await axios.get('/logout') 
      setToHomePgae('/')
      setUser(null)

      // console.log(a.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (subpage === undefined) {
    subpage = 'profile'
  }

  if (!ready) {
    return 'Loading...'
  }

  if (ready && !user && !toHomePage) {
    return <Navigate to={'/login'} />
  }

  if (toHomePage) {
    return <Navigate to={toHomePage} />
  }




  return (
    <div>

      <AccountNav />
      {
        subpage === 'profile' && (
          <div className='text-center max-w-lg mx-auto'>
            Logged in as {user.name} ({user.email}) <br />
            <button onClick={logout} className='primary max-w-sm mt-2'>Logout</button>
          </div>
        )
      }

      {
        subpage === 'places' &&
        <PlacesPage />
      }
    </div>
  )
}

export default Account
