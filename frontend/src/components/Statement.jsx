import React, { useState } from "react";
import Layout from "./Layout";
import AddExpense from "./AddExpense";
import { useGetExpense } from "../actions/get_expense_api"; // Import the custom hook
import "./Statement.css"; // Import the CSS file for custom styles
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useDeleteExpense } from "../actions/delete_expense_api";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const Statement = () => {
  const { data, isLoading, error, refetch } = useGetExpense(); // Fetch expenses using the hook
  const { mutate: sendDeleteExpenseData } = useDeleteExpense();

  // State for handling the delete confirmation dialog
  const [open, setOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

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

  // Function to open the confirmation dialog
  const handleClickOpen = (id) => {
    setSelectedExpenseId(id); // Set the expense to be deleted
    setOpen(true); // Open the confirmation dialog
  };

  // Function to close the confirmation dialog
  const handleClose = () => {
    setOpen(false);
    setSelectedExpenseId(null);
  };

  // Placeholder functions for handling edit and delete
  const handleEdit = (id) => {
    console.log("Edit expense with ID:", id);
    // Add your edit logic here
  };

  // Function to handle deleting the expense
  const handleDelete = () => {
    sendDeleteExpenseData(
      { id: selectedExpenseId },
      {
        onSuccess: () => {
          console.log("Deleted expense with ID:", selectedExpenseId);
          refetch(); // Refetch the data after successful deletion
          handleClose(); // Close the dialog after deletion
        },
        onError: (error) => {
          console.error("Error deleting expense:", error);
        },
      }
    );
  };

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
      <div style={{ marginTop: "10px", padding: "15px" }}>
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
                    onClick={() => handleClickOpen(expense.id)} // Open the delete confirmation
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: '#fff', // Background color
            borderRadius: '8px', // Rounded corners
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{"Delete Expense?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this expense? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{
              color: '#2196F3', // Blue color for 'No' button
              fontWeight: 'bold',
            }}
          >
            No
          </Button>
          <Button
            onClick={handleDelete}
            style={{
              backgroundColor: '#F44336', // Red color for 'Yes' button
              color: '#fff',
              fontWeight: 'bold',
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Statement;
