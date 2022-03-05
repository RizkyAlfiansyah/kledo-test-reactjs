import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux"
import { logout, selectUser } from '../../features/userSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Dashboard = () => {

    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const [data, setData] = useState('')

    useEffect(() => {
        if(user){
            setData(user.data)
        } else {
            navigate('/')
        }
    }, [user])

    return (
        <>
            <div className='w-9/12 h-5/6 bg-white rounded-xl m-auto p-10'>
                <div className='flex flex-col w-full h-full'>
                    <h3 className='text font-bold'> Dashboard </h3>
                    <div className='flex flex-col w-10/12 h-4/6 bg-gray-200 m-auto'>
                    <h3 className='mx-auto mt-40 text-gray-500 font-bold text-2xl text-center'> Selamat Datang </h3>
                    <h3 className='mx-auto mt-4 text-gray-400 font-bold text-xl text-center'> {data.name}</h3>
                    </div>
                </div>
            </div>
        </>
    );
} 

export default Dashboard;