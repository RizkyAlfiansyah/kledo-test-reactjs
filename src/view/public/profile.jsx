
import Logo from '../../assets/img/avatar.JPG'

const Profile = () => {
    return (
        <>
           <div className="flex flex-col w-screen h-screen">
               <h1 className="text text-4xl font-bold mx-auto mt-40">Profile</h1>
               <div className="w-6/12 rounded-xl border-2 shadow-md h-auto mx-auto mt-4 bg-primary-200 p-10">
                   <div className="flex flex-row justify-between">
                       <div className="w-auto flex flex-col">
                           <label className="flex-col my-2">
                                <span className="text-gray-400 font-bold">Nama</span>
                                <br/>
                                <span className="text-black font-bold">Rizky Alfiansyah</span>
                            </label>
                           <label className="flex-col my-2">
                                <span className="text-gray-400 font-bold">Alamat</span>
                                <br/>
                                <span className="text-black font-bold">Makassar, Sulawesi Selatan</span>
                            </label>
                           <label className="flex-col my-2">
                                <span className="text-gray-400 font-bold">No. Hp</span>
                                <br/>
                                <span className="text-black font-bold">082290139151</span>
                            </label>
                           <label className="flex-col my-2">
                                <span className="text-gray-400 font-bold">Email</span>
                                <br/>
                                <span className="text-black font-bold">rizkkyaf@gmail.com</span>
                            </label>
                           <label className="flex-col my-2">
                                <span className="text-gray-400 font-bold">Motto</span>
                                <br/>
                                <span className="text-black font-bold"> - </span>
                            </label>
                       </div>
                       <div>
                           <img src={Logo} width={128} height={128} alt="default" className='rounded-full'/>
                       </div>
                   </div>
               </div>
           </div>
        </>
    )
}

export default Profile