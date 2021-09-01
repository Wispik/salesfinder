import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

const api = {
    getCategories: (id) => axios.get(`getcategories/${id}/`)
}

export default api