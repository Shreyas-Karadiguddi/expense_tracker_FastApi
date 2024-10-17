import React from "react";
import Layout from "./Layout";
import AddExpense from "./AddExpense";
import { useGetExpense } from "../actions/get_expense_api"; // Import the custom hook
import "./Statement.css"; // Import the CSS file for custom styles
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

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
      <div style={{ marginTop: "10px",padding:"15px" }}>
        <table className="expense-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th style={{ width: "75px" }}>Actions</th> {/* Add width to the Actions column */}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((expense, index) => (
              <tr
              key={expense.id}
              className={index % 2 === 0 ? "even-row" : "odd-row"}
            >
              <td>{formatDate(expense.date)}</td>
              <td className="category">{expense.category}</td> {/* Apply class for category */}
              <td className="description">{expense.description}</td> {/* Apply class for description */}
              <td>{expense.amount}</td>
              <td style={{ width: "50px", textAlign: "center" }}>
                <CreateTwoToneIcon
                  style={{
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                  onClick={() => handleEdit(expense.id)}
                />
                <DeleteTwoToneIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(expense.id)}
                />
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

// Placeholder functions for handling edit and delete
const handleEdit = (id) => {
  console.log("Edit expense with ID:", id);
  // Add your edit logic here
};

const handleDelete = (id) => {
  console.log("Delete expense with ID:", id);
  // Add your delete logic here
};

export default Statement;
