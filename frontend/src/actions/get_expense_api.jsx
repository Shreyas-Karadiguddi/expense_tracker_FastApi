import axios from 'axios';
import { useQuery } from 'react-query';

// Define the hook to fetch expenses
export const useGetExpense = () => {
  return useQuery(
    'getExpenses', // Unique query key
    () => axios.get("http://localhost:8080/get_expense").then(res => res.data) // Query function
  );
};
