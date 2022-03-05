import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux"
import { selectUser } from '../../features/userSlice'
import * as Service from '../../service'
import Swal from 'sweetalert2'

const Shipping = () => {

    const user = useSelector(selectUser)

    // const [path, setPath] = useState('ship');
    const {register, formState: { errors }, handleSubmit} = useForm();
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const [filteredName, setFilteredName] = useState([]);

    useEffect(() => {
        if (user) {
            Service.getShippingComps(user.token).then(res => {
                // console.log('res data shipping', res.data.data)
                if (res.status === 200) {
                    setData(res.data.data)
                }
            })
        } else {
            navigate("/");
        }

    }, [user,data]);

    useEffect(() => {
        setFilteredName(
            data.filter((item => {
                return item.name.toLowerCase().includes(input.toLowerCase())
            }))
        )
    }, [input,data]);

    // console.log('data', data)
    const clickHandler = (data) => {
        var authKey = user.token;
        Service.postShippingComps(authKey, data.name).then(res => {
            // console.log('res', res)
            if (res?.status === 200) {
                setShowModal(false);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Sukses menambah data !',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    navigate('/dashboard');
                }
                );
            } else if (res?.status === 400) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: res?.message,
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    navigate('/dashboard');
                }
                );
            }
        })
    }

    return (
        <>
            <div className='w-9/12 h-5/6 bg-white rounded-xl m-auto p-10'>
                <div className='flex flex-col w-full h-auto'>
                    <div className="flex flex-row justify-between mx-2">
                        <div className="flex flex-row space-x-3">
                            <h3 className='text font-bold'> Shipping Comps </h3>
                            <button className="w-6 h-6 rounded-full bg-primary-100 text-white text-lg" onClick={() => setShowModal(true)}> + </button>
                        </div>
                        <input 
                            type="text" 
                            className="form-input rounded-md px-2 mx-0" 
                            placeholder="cari"
                            onChange={e => setInput(e.target.value)} 
                            value={input}
                            />
                    </div>
                    <div className='flex flex-col w-full h-auto bg-gray-200 mx-2 my-4 rounded-md'>
                        <h3 className='mx-4 my-2 text-black font-bold text-xl'> Nama </h3>
                    </div>
                    <div className="h-96 overflow-auto">
                        {filteredName.map((item, index) => {
                            return (
                                <div key={item.id} className='overflow-auto'>
                                    <h3 className='flex mx-4 my-2 text-gray-400 font-semibold text-sm'> {item.name}</h3>
                                    <hr className="mx-4" />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            {showModal ? (
                <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                            Tambah Shipping Comps
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModal(false)}
                        >
                            <span className="bg-slate-500 text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                            </span>
                        </button>
                        </div>
                        <form className="flex flex-col" onSubmit={handleSubmit(clickHandler)}>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                                <label className="block">
                                    <span className="text-gray-400 font-bold">Nama</span>
                                    <input type="text" className="w-full mt-2 form-input border-gray-300 rounded-lg" {...register("name", {required : true})}/>
                                    {errors?.name && <span className="text-red-500">This field is required</span>}
                                </label> 
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                            >
                            Close
                        </button>
                        <button
                            className="bg-primary-100 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="submit"
                        >
                            Simpan
                        </button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
                </>
    )
}

export default Shipping;