import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as Service from '../../service';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { login } from '../../features/userSlice';
import Swal from 'sweetalert2';

const Login = () => {

    const {register,formState: { errors }, handleSubmit} = useForm();

    const history = useNavigate();
     const [errMsg, setErrMsg] = useState('');

    const dispatch = useDispatch();

    const handleLogin = async (data) => {

        Service.getLogin(data.user, data.pwd).then(res => {
            
            if(res?.status === 200){
                dispatch(
                    login({
                        data: res.data.data.user,
                        token: res.data.data.data.access_token,
                        loggedIn: true
                    })
                );
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Login Sukses !',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    history('/dashboard');
                }
                );
            }else{
                setErrMsg(res.data.message);
            }
        }).catch(err => {
            setErrMsg(err.message);
            console.log(errMsg);
        })
    }

    return (
        <>
           <div className="flex flex-col w-screen h-screen">
               <h1 className="text text-4xl font-bold mx-auto mt-40">Login</h1>
               <div className="w-6/12 rounded-xl border-2 shadow-md h-80 mx-auto mt-4 bg-primary-200 p-10">
                   <form className="flex flex-col" onSubmit={handleSubmit(handleLogin)}>
                        <label className="block">
                            <span className="text-gray-400 font-bold">Email</span>
                            <input type="email" className="w-full mt-2 form-input border-gray-300 rounded-lg" {...register("user", {required : true})}/>
                            {errors?.user && <span className="text-red-500">This field is required</span>}
                        </label>   
                        <label className="block mt-4">
                            <span className="text-gray-400 font-bold">Password</span>
                            <input type="password" className="w-full mt-2 mb-4 form-input border-gray-300 rounded-lg" {...register("pwd", {required: true})}/>
                            {errors?.pwd && <span className="text-red-500">This field is required</span>}
                        </label>
                        <button className="w-10/12 mx-auto my-4 rounded-3xl bg-primary-100 p-2.5 text-white font-bold"> Login </button>
                   </form>
               </div>
           </div>
        </>
    )
}

export default Login