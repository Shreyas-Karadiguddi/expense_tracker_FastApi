import axios from 'axios'
import {useMutation} from 'react-query'


export const useDeleteExpense = () => {
    return useMutation((deleteExpenseData) => 
        axios.delete(`http://localhost:8080/delete_expense/${deleteExpenseData.id}`)
            .then((res) => res.data)
    );
};