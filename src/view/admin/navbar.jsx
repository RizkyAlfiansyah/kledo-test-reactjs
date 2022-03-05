import { useEffect, useState } from 'react'
import Logo from '../../assets/img/avatar.JPG'
import Dashboard from './dashboard'
import Shipping from './shipping'
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux"
import { logout, selectUser } from '../../features/userSlice'
import { useNavigate } from 'react-router-dom'
import * as Service from '../../service'
import Swal from 'sweetalert2'

const Navbar = () => {
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const [data, setData] = useState('')
    const [token, setToken] = useState('')

    useEffect(() => {
        if(user){
            setData(user.data)
            setToken(user.token)
        } else {
            navigate('/')
        }
    }, [user])

    const [path, setPath] = useState('dashboard');
    const dispatch = useDispatch();

    let page = '';
    if(path === 'dashboard'){
        page = <Dashboard />
    }else{
        page = <Shipping />
    } 

    const handleLogout = () => {
        var authKey = token;
        Service.getLogout(authKey).then(res => {
            if(res.status === 200){
                dispatch(logout())
                 Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Logout Sukses !',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    navigate('/');
                }
                );
            }
        })
        navigate('/')
    }

    return (
        <>
            <div className="flex flex-col w-screen h-screen bg-gray-400">
                <div className="w-full h-auto flex bg-primary-100">
                    <div className="w-full flex flex-row justify-between p-2 my-auto mx-4">
                        <h1 className="text-white font-semibold text-lg">KLEDO TEST ADMIN</h1>
                        <div className="flex items-center">
                            <div className="flex flex-row justify-between mx-2">
                                <ul className="flex justify-between mx-auto space-x-4 text-white">
                                    <li className="rounded-full">
                                    <img src={Logo} width={24} height={24} alt="logo" className='rounded-full' />
                                    </li>
                                    <li>
                                        <span> {data.name}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='flex flex-row w-screen h-screen'>
                    <div className='flex flex-col justify-between w-48 h-full bg-white'>
                        <div className='flex flex-col p-2 m-2 font-thin'>
                            <button className='my-2' onClick={() => setPath('dashboard')}> Dashboard </button>
                            <hr />
                            <button className='my-2' onClick={() => setPath('ship')}> Shipping Comps </button>
                            <hr />
                        </div>
                        <button className='w-full h-auto p-2 bg-primary-100 text-white' onClick={handleLogout}> Logout </button>
                    </div>
                    {page}
                </div>
            </div>
        </>
    )
}

export default Navbar;