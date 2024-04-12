import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";
import { Transaction } from "./useAddTransactions";

export const useGetTransactions = () => {

  const [transactions, setTransactions] = useState(<Transaction[]>[]);
  const [transactionsTotals, setTransactionsTotals] = useState({balance: 0.0, income: 0.0, expenses: 0.0});

  const transactionsCollectionRef = collection(db, "transactions");
  const { userId } = useGetUserInfo();

  const getTransactions = async () => {
    let unsubscribe: any;
    try {
      const queryTransactions = query(
        transactionsCollectionRef,
        where("userId", "==", userId),
        orderBy("createdAt")
      );

      onSnapshot(queryTransactions, (snapshot) => {
        const docs: Transaction[] = [];
        let totalIcome = 0;
        let totalExpenses = 0;

        snapshot.forEach((doc) => {
          const data = doc.data() as Transaction;
          const id = doc.id;

          docs.push({ ...data, id });
          
          if(data.transactionType === "expense") {
            totalExpenses += +data.transactionAmount;
          } else {
            totalIcome += +data.transactionAmount
          }
        });

        setTransactions(docs);

        let balance = totalIcome - totalExpenses;
        setTransactionsTotals({
          balance,
          income: totalIcome,
          expenses: totalExpenses
        })
      });
    } catch (err) {
      console.error(err);
    }

    return () => unsubscribe();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions, transactionsTotals };
};
