import React from "react";
import { Transaction } from "@/app/reduxFeatures/app/transactions";
import styles from "@/app/styles/transactions/transaction.module.scss";
import { MdOutlineArrowOutward } from "react-icons/md";
import { GoArrowDownLeft } from "react-icons/go";

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const { amount, metadata, status, date } = transaction;

  const isSuccessful = status === "successful";
  const isPending = status === "pending";

  // Capitalize first letter of status for display
  const statusText = status
    ? status.charAt(0).toUpperCase() + status.slice(1)
    : undefined;

  const getCircleColor = () => {
    if (isSuccessful) return "#F9E3E0";
    if (isPending) return "#F9E3E0";
    return "#E3FCF2"; // Fallback for other statuses
  };

  const getArrowColor = () => {
    if (isSuccessful) return "#961100";
    if (isPending) return "#961100";
    return "#075132"; // Fallback
  };

  const formatDate = (input?: string | Date) => {
    if (!input) return "No date";
    const d = typeof input === "string" ? new Date(input) : input;
    if (Number.isNaN(d.getTime())) return String(input);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${months[d.getMonth()]} ${day},${year}`;
  };

  return (
    <div className={styles.transactionItem}>
      <div className={styles.left}>
        <div
          className={styles.circle}
          style={{ backgroundColor: getCircleColor() }}
        >
          {status === "successful" || status === "pending" ? (
            <MdOutlineArrowOutward style={{ color: getArrowColor() }} />
          ) : (
            <GoArrowDownLeft style={{ color: getArrowColor() }} />
          )}
        </div>
        <div>
          <p className={styles.productName}>
            {metadata?.product_name || "No product name"}
          </p>
          <p className={`${styles.name} ${styles[status]}`}>
            {statusText || metadata?.name || "No name"}
          </p>
        </div>
      </div>
      <div className={styles.right}>
        <p className={styles.amount}>USD {amount.toFixed(2)}</p>
        <p className={styles.date}>{formatDate(date)}</p>
      </div>
    </div>
  );
};

export default TransactionItem;
