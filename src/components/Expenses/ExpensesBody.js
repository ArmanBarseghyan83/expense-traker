import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/slice";
import Card from "../UI/Card";
import Expenses from "./Expenses";
import Chart from "../Chart/Chart";
import "./ExpensesBody.css";

const ExpensesBody = () => {
  const reload = useSelector((state) => state.expense.reload);
  const selectedYear = useSelector((state) => state.expense.selectedYear);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://expenses-ce77c-default-rtdb.firebaseio.com/expenses.json")
      .then((res) => res.json())
      .then((data) => {
        let list = [];
        for (let key in data) {
          list.push({
            id: key,
            amount: data[key].amount,
            date: new Date(data[key].date),
            title: data[key].title,
          });
        }
        dispatch(expenseActions.showExpenses({ list }));
      })
      .catch((e) => {
        setError("Something went wrong!");
      });
  }, [reload, dispatch, selectedYear]);

  const filterChangeHandler = (event) => {
    dispatch(expenseActions.setYear(event.target.value));
  };

  return (
    <div>
      <Card className="expenses">
        <div className="expenses-filter">
          <div className="expenses-filter-control">
            <label>Filter by year</label>
            <select value={selectedYear} onChange={filterChangeHandler}>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>
        </div>
        <Chart />
        {!error ? <Expenses /> : <p>{error}</p>}
      </Card>
    </div>
  );
};

export default ExpensesBody;
