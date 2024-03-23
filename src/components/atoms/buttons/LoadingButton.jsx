import React from 'react'


const Loading = () => {
    return (
        <div
            style={{
                minWidth: '100vw',
                position: 'fixed',
                right: 0,
                left: 0,
                top: 0,
                bottom: 0,
                height: '100vh',
                background: '#00000008',
            }}>
            <div className='flex justify-center items-center h-screen w-screen bg-transparent'>
                <img
                    className='justify-center items-center animate-spin inline'
                    src=''
                    alt='Loading...'
                />
            </div>
        </div>
    )
}
export default Loading
