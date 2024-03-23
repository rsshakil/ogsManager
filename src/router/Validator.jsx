import React from 'react'
import { useLocation } from 'react-router-dom'
import Loading from '../components/atoms/buttons/LoadingButton'
import useSession from '../hooks/useSession'

const Validator = ({ children }) => {
    const location = useLocation()
    const { loading } = useSession(location.pathname)

    if (loading) return <Loading />

    return children
}

export default Validator
