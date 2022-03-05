import axios from "../view/api/axios";
import Swal from "sweetalert2";

export const getLogin = async (email , password) => {

    try{
        const data = {
        email: email,
        password: password
        }
        
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.post("/authentication/login", data, config);
        return response
    }
    catch(error){
       console.log('error', error)
    }
}

export const postShippingComps = async (token, name) => {

    try{
        const data = {
            name: name,
            token: token,
        }
        
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const response = await axios.post("/finance/shippingComps", data, config);
        return response
    }
    catch(error){
       Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Nama Sudah Ada',
            showConfirmButton: false,
            timer: 1500
        })
    }
}

export const getShippingComps = async (token) => {

    try{
        // const data = {
        // token: token,
        // }
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const response = await axios.get("/finance/shippingComps", config);
        return response
    }
    catch(error){
       console.log('error', error)
    }
}

export const getLogout = async (token) => {

    try{
        const params = {
        token: token,
        }
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer "+ token,
            }
        }
        const response = await axios.post("/authentication/logout", null, config);
        return response
    }
    catch(error){
       console.log('error', error)
    }
}
