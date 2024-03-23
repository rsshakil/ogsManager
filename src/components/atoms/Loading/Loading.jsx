import React from 'react'
import LoadingImg from '../../img/loading.svg'

const Loading = ({className}) => {
    console.log("Loading 💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦");
    return (
        <div className={`fixed top-0 right-0 left-0 bottom-0 ${className || 'z-[9999]'}`}>
            <div className='flex top-0 right-0 left-0 bottom-0 justify-center items-center h-screen w-screen bg-transparent'>
                <img
                    className='justify-center items-center animate-spin inline'
                    src={LoadingImg}
                    alt='Loading...'
                />
            </div>
        </div>
    )
}
export default Loading
