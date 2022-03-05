import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.jokolodang.com/api/v1/'
});