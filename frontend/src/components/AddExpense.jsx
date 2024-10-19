import React, { useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  Box,
} from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAddExpense } from "../actions/add_expense_api";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";

// Custom button and close button styling
const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: "30px",
  padding: "10px 20px",
  backgroundColor: "#6499ea",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#3700b3",
  },
  textTransform: "none",
  fontWeight: "bold",
  fontSize: "16px",
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(1),
  top: theme.spacing(1),
  color: theme.palette.grey[900],
}));

// Custom PaperComponent to prevent closing on backdrop click
const PaperComponent = (props) => (
  <Paper
    {...props}
    sx={{
      borderRadius: "15px",
      padding: "20px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    }}
  />
);

const AddExpense = ({ refetch }) => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState();
  const [date, setDate] = useState(dayjs());
  const { enqueueSnackbar } = useSnackbar();
  const { mutate: sendAddExpenseData } = useAddExpense();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDialogClose = (event, reason) => {
    if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
      handleClose();
    }
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(parseFloat(e.target.value));
  };

  const handleDate = (newDate) => {
    setDate(newDate); // Handle the date directly
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedDate = dayjs(date).format("YYYY-MM-DD");

    sendAddExpenseData(
      { category, description, amount, date: formattedDate },
      {
        onSuccess: (data) => {
          console.log("Added Expense successfully:", data);
          setCategory("");
          setDescription("");
          setAmount();
          setDate(dayjs());
          handleClose();
          refetch();
          enqueueSnackbar("Expense added successfully!", {
            variant: "success",
          });
        },
      }
    );
  };

  return (
    <div style={{ padding: "10px", marginBottom: "0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "0",
        }}
      >
        <CustomButton
          variant="contained"
          startIcon={<AddCircleOutlinedIcon />}
          onClick={handleClickOpen}
        >
          Add Expense
        </CustomButton>
      </div>

      <Dialog
        open={open}
        onClose={handleDialogClose}
        maxWidth="xs"
        fullWidth
        PaperComponent={PaperComponent}
      >
        <DialogTitle
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Add New Expense
          <CloseButton onClick={handleClose}>
            <CloseIcon />
          </CloseButton>
        </DialogTitle>
        <DialogContent
          sx={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="dense"
              label="Category"
              value={category}
              type="text"
              onChange={handleCategory}
              fullWidth
              variant="outlined"
              required
              sx={{ backgroundColor: "#f9f9f9", borderRadius: "5px" }}
            />
            <TextField
              margin="dense"
              label="Description"
              value={description}
              type="text"
              onChange={handleDescription}
              fullWidth
              variant="outlined"
              required
              sx={{ backgroundColor: "#f9f9f9", borderRadius: "5px" }}
            />
            <TextField
              margin="dense"
              label="Amount"
              value={amount}
              type="number"
              onChange={handleAmount}
              InputProps={{
                inputProps: {
                  min: 1, // Ensures only positive numbers
                },
              }}
              fullWidth
              variant="outlined"
              required
              sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: "5px",
                marginBottom: "15px",
              }}
            />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  label="Date"
                  value={date}
                  onChange={handleDate}
                  sx={{ backgroundColor: "#f9f9f9", borderRadius: "5px" }}
                />
              </LocalizationProvider>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="submit"
                variant="contained"
                required
                sx={{ mt: 2, mb: 2, width: 100, marginTop: 5 }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddExpense;





