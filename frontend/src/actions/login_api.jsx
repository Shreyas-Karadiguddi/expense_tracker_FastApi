import axios from 'axios'
import {useMutation} from 'react-query'


export const useUserSignUp = () => {
    return useMutation((signUpData) => axios.post("http://localhost:8080/signup",signUpData).then((res) => res.data))
}

export const useUserLogin = () => {
    return useMutation((loginData) => axios.post("http://localhost:8080/login",loginData).then((res) => res.data))
}