import React, { useEffect, useState } from "react";
import {Router, Outlet, Link} from "react-router-dom";
import Login from "../view/public/login";
import Profile from "../view/public/profile";

const Header = () => {
    const [path, setPath] = useState('login');

    let page = <Login />;
    if(path === 'login'){
        page = <Login />
    }else{
        page = <Profile />
    }
    return (
        <>
            <div className="w-full h-auto flex bg-primary-100">
                <div className="w-full flex flex-row justify-between p-2 my-auto mx-4">
                    <h1 className="text-white font-semibold text-lg">KLEDO TEST</h1>
                    <div className="flex items-center">
                        <ul className="flex justify-between mx-auto space-x-4 text-white">
                            <li className={`hover:bg-black ${path === 'profile' ? 'bg-black' : ''}`}>
                                <button onClick={() => setPath('profile')}>profile</button>
                            </li>
                            <li className={`hover:bg-black ${path === 'login' ? 'bg-black' : ''}`}>
                                <button onClick={() => setPath('login')}>login</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {page}
            <Outlet />
        </>
    )
}

export default Header;