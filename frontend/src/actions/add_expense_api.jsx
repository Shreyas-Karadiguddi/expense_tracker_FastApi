import axios from 'axios'
import {useMutation} from 'react-query'


export const useAddExpense = () => {
    return useMutation((addExpenseData) => axios.post("http://localhost:8080/add_expense",addExpenseData).then((res) => res.data))
}
