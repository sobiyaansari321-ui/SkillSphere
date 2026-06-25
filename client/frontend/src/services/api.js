import axios from 'axios'

const api = axios.create({
    baseURL:"https://skillsphere-1-70jc.onrender.com/api"
})

export default api