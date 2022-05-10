import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = () => {
 const request = axios.get(baseUrl)
 return request .then(res=>res.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl,newObject)
    return request.then(res=>res.data)
}
export default {getAll,create}