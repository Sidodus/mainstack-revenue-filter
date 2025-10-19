"use client";

import { useEffect } from "react";
import useSWR from "swr";
import { useDispatch } from "@/app/redux/store";
import { setServerUser } from "@/app/reduxFeatures/app/authUser";
import { setWallet } from "@/app/reduxFeatures/app/wallet";
import { setTransactions } from "@/app/reduxFeatures/app/transactions";
import config from "@/app/config";

// Fetcher function
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const DataProvider = () => {
  const dispatch = useDispatch();

  // Fetch user data
  const { data: userData } = useSWR(`${config.serverUrl}/user`, fetcher);

  // Fetch wallet data
  const { data: walletData } = useSWR(`${config.serverUrl}/wallet`, fetcher);

  // Fetch transactions data
  const { data: transactionsData } = useSWR(
    `${config.serverUrl}/transactions`,
    fetcher
  );

  useEffect(() => {
    if (userData) {
      dispatch(setServerUser(userData));
    }
  }, [userData, dispatch]);

  useEffect(() => {
    if (walletData) {
      dispatch(setWallet(walletData));
    }
  }, [walletData, dispatch]);

  useEffect(() => {
    if (transactionsData) {
      dispatch(setTransactions(transactionsData));
    }
  }, [transactionsData, dispatch]);

  return null; // This component doesn't render anything
};

export default DataProvider;
