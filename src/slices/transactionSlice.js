import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    invoiceNumber: null,
    error: null,
  },
  reducers: {
    setInvoiceNumber: (state, action) => {
      state.invoiceNumber = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetTransaction: (state) => {
      state.invoiceNumber = null;
      state.error = null;
    },
  },
});

export const { setInvoiceNumber, setError, resetTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;

export const selectInvoiceNumber = (state) => state.transaction.invoiceNumber;
export const selectTransactionError = (state) => state.transaction.error;
