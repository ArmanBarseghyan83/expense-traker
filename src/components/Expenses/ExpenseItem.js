import React from "react";
import { expenseActions } from "../../store/slice";

import Card from "../UI/Card";
import "./ExpenseItem.css";
import { useDispatch } from "react-redux";
import { useState } from "react";

const ExpenseItem = (props) => {
  const dispatch = useDispatch();

  const month = props.date.toLocaleString("en-US", { month: "long" });
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  const year = props.date.getFullYear();
  const [error, setError] = useState();

  const deleteHandler = (id) => {
    const confirm = window.confirm("Are you sure?");

    if (confirm) {
      fetch(`https://expenses-ce77c-default-rtdb.firebaseio.com/expenses/${id}.json`, {
        method: "DELETE",
      }
      )
        .then((res) => res.json())
        .then(() => dispatch(expenseActions.reload()))
        .catch(() => setError("Could not delete!"));
    }
  };

  return (
    <li>
      <Card className="expense-item">
        <div className="expense-item-description">
          <div className="expense-date">
            <div>{month}</div>
            <div>{day}</div>
            <div>{year}</div>
          </div>
          <h2>{props.title}</h2>
        </div>
        <div>{error && error}</div>
        <div>
          <div className="expense-item-price">${props.amount}</div>
          <button className="expense-item-delete" onClick={deleteHandler.bind(null, props.id)} >
            Delete
          </button>
        </div>
      </Card>
    </li>
  );
};

export default ExpenseItem;
