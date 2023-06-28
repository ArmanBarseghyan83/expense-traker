import React from "react";

import NewExpense from "./components/NewExpense/NewExpense";
import ExpensesBody from "./components/Expenses/ExpensesBody";

const App = () => {
  return (
    <div>
      <NewExpense />
      <ExpensesBody />
    </div>
  );
};

export default App;
