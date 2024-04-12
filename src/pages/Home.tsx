import { useState, ChangeEvent } from "react";
import { useAddTransactions } from "../hooks/useAddTransactions";
import { useGetTransactions } from "../hooks/useGetTransactions";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { addTransaction } = useAddTransactions();
  const { transactions, transactionsTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  // const totalExpenses = transactions.filter((transaction) => transaction.transactionType == 'expense').reduce((acc, transaction) => acc + transaction.transactionAmount, 0);
  // const totalIncome = transactions.filter((transaction) => transaction.transactionType == 'income').reduce((acc, transaction) => acc + transaction.transactionAmount, 0);

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const {balance, income, expenses} = transactionsTotals;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTransaction({ description, transactionAmount, transactionType });
    setDescription("");
    setTransactionAmount(0);
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate('/login')
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div>
        <h1>{name}'s Expense Tracker</h1>
        <div>
          <h2>Your Balance</h2>
          {balance >= 0 ? <h3>${balance}</h3> :  <h3>- ${balance * -1}</h3>}
          <h3>$ </h3>
        </div>

        <div>
          <div>
            <h2>Income</h2>
            <h3>${income}</h3>
          </div>
          <div>
            <h2>expenses</h2>
            <h3>${expenses}</h3>
          </div>
        </div>

        <form action="" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Description"
            value={description}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setDescription(e.target.value);
            }}
          />
          <input type="number" placeholder="Amount" value={transactionAmount} required onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTransactionAmount(Number(e.target.value));
          }} />

          <input
            type="radio"
            id="expense"
            name="transactionType"
            value="expense"
            checked= { transactionType === "expense" }
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTransactionType(e.target.value)}
          />
          <label htmlFor="expense">Expense</label>

          <input
            type="radio"
            id="income"
            name="transactionType"
            value="income"
            checked= { transactionType === "income" }
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTransactionType(e.target.value)}
          />
          <label htmlFor="income">Income</label>

          <button type="submit">Add Transaction</button>
        </form>
      </div>
          {profilePhoto && (
            <div>
              <img src={profilePhoto} alt="" />
            </div>
          )}
          <button onClick={signUserOut}>Sign Out</button>
      <div>
        <h2>Transactions</h2>
        <ul>
          {transactions.map((transaction) => {
            const {description, transactionAmount, transactionType } = transaction;
            return (
              <li key={transaction.id}>
                <h4>{description}</h4>
                <p>${transactionAmount} . <label>{transactionType}</label> </p>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  );
};
