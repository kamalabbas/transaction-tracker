import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export interface Transaction {
    description: string;
    transactionAmount: number;
    transactionType: string;
    id?: string;
}

export const useAddTransactions = () => {
  const transactionsCollectionRef = collection(db, "transactions");
  const { userId } = useGetUserInfo();

  const addTransaction = async ({
    description,
    transactionAmount,
    transactionType,
  }: Transaction) => {
    await addDoc(transactionsCollectionRef, {
      userId,
      description,
      transactionAmount,
      transactionType,
      createdAt: serverTimestamp(),
    });
  };

  return { addTransaction };
};
