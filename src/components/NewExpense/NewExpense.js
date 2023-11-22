import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";
import { expenseActions } from "./../../store/slice";

const NewExpense = () => {
  const dispatch = useDispatch();
  const isAdding = useSelector((state) => state.expense.isAdding);
  const [error, setError] = useState();

  // Save a new expense to the database.
  const saveExpenseDataHandler = (enteredExpenseData) => {
    fetch("https://expenses-ce77c-default-rtdb.firebaseio.com/expenses.json", {
      method: "POST",
      body: JSON.stringify(enteredExpenseData),
    })
      .then((res) => res.json())
      .then(() => dispatch(expenseActions.reload()))
      .catch((e) => {
        setError("Could not save!");
      });

    dispatch(expenseActions.isAdding());
  };

  const startAddingHandler = () => {
    dispatch(expenseActions.isAdding());
  };

  const stopAddingHandler = () => {
    dispatch(expenseActions.isAdding());
  };

  return (
    <div className="new-expense">
      {!isAdding && (
        <>
          <button onClick={startAddingHandler}>Add New Expense</button>
          {error && <p>{error}</p>}
        </>
      )}
      {isAdding && (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onCancel={stopAddingHandler}
        />
      )}
    </div>
  );
};

export default NewExpense;
