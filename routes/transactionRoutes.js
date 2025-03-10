const express = require("express");
const { addTransaction, getAllTransaction, editTransaction, deleteTransaction } = require("../controllers/transactionController");

const router = express.Router();

//Adding Transaction
router.post("/add-transaction", addTransaction)

//Edit Transaction
router.post("/edit-transaction", editTransaction)

//Delete Transaction
router.post("/delete-transaction", deleteTransaction)

// Get Transactions
router.post("/get-transaction", getAllTransaction)

module.exports = router;