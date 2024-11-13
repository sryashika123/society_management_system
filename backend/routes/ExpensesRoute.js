const express = require('express');

const router = express.Router();

const Expenses = require("../models/ExpensesModel");

const ExpensesController = require("../controllers/ExpensesController");


router.post("/createExpenses", Expenses.uploadedAvatar, ExpensesController.createExpenses);

router.get("/ViewExpenses", ExpensesController.ViewExpenses);

router.delete("/deleteExpenses/:id", ExpensesController.deleteExpenses);

router.put("/updateExpenses/:id", Expenses.uploadedAvatar, ExpensesController.updateExpenses)



module.exports = router;