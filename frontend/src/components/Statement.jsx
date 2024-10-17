import React from "react";
import Layout from "./Layout";
import AddExpense from "./AddExpense";
import { useGetExpense } from "../actions/get_expense_api"; // Import the custom hook
import "./Statement.css"; // Import the CSS file for custom styles

const Statement = () => {
  const { data, isLoading, error, refetch } = useGetExpense(); // Fetch expenses using the hook

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Function to format date to dd-mm-yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Sort the data by date in descending order
  const sortedData = [...data].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ padding: "10px" }}>
          <h1>Statement</h1>
        </div>
        {/* Pass refetch to AddExpense */}
        <AddExpense refetch={refetch} />
      </div>

      {/* Display the expense data in a table */}
      <div style={{ marginTop: "20px" }}>
        <table className="expense-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((expense, index) => (
              <tr
                key={expense.id}
                className={index % 2 === 0 ? "even-row" : "odd-row"}
              >
                <td>{formatDate(expense.date)}</td>
                <td>{expense.category}</td>
                <td>{expense.description}</td>
                <td>{expense.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Statement;
