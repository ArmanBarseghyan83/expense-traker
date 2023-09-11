import React from "react";
import { useSelector } from "react-redux";
import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";

const Expenses = () => {
  const expensesList = useSelector((state) => state.expense.expensesList);
  if (expensesList.length === 0) {
    return <h2 className="expenses-list-fallback">Found no expenses.</h2>;
  }

  return (
    <ul className="expenses-list">
      {expensesList.map((expense) => (
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
          id={expense.id}
        />
      ))}
    </ul>
  );
};

export default Expenses;
