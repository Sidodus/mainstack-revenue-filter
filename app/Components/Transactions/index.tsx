"use client";

import React, { useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import TransactionItem from "./TransactionItem";
import styles from "@/app/styles/transactions/transaction.module.scss";
import Papa from "papaparse";
import { selectFilters } from "@/app/reduxFeatures/app/filters";
import {
  MdOutlineFileDownload,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";

const Transactions = () => {
  const { transactions } = useSelector(
    (state: RootState) => state.transactions
  );
  const filters = useSelector(selectFilters);

  // Filter transactions based on selected filters
  const filteredTransactions = useMemo(() => {
    // If no filters are applied, show all transactions
    if (
      !filters.dateRange &&
      !filters.startDate &&
      !filters.endDate &&
      !filters.transactionType &&
      !filters.transactionStatus
    ) {
      return transactions;
    }

    let filtered = [...transactions];

    // Filter by date range (preset options)
    if (filters.dateRange && filters.dateRange !== "All") {
      const now = new Date();
      let startDate: Date;

      switch (filters.dateRange) {
        case "Today":
          startDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
          );
          break;
        case "Last 7 days":
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "This month":
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case "Last 3 months":
          startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
          break;
        default:
          startDate = new Date(0);
      }

      filtered = filtered.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= startDate && transactionDate <= now;
      });
    }

    // Filter by custom date range
    if (filters.startDate && filters.endDate) {
      filtered = filtered.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return (
          transactionDate >= filters.startDate! &&
          transactionDate <= filters.endDate!
        );
      });
    }

    // Filter by transaction type
    if (filters.transactionType && filters.transactionType !== "All Types") {
      filtered = filtered.filter((transaction) =>
        transaction.type
          .toLowerCase()
          .includes(filters.transactionType.toLowerCase())
      );
    }

    // Filter by transaction status
    if (
      filters.transactionStatus &&
      filters.transactionStatus !== "All Statuses"
    ) {
      filtered = filtered.filter((transaction) =>
        transaction.status
          .toLowerCase()
          .includes(filters.transactionStatus.toLowerCase())
      );
    }

    return filtered;
  }, [transactions, filters]);

  const handleExport = () => {
    // Prepare data for CSV export
    const csvData = filteredTransactions.map((transaction) => ({
      "Product Name": transaction.metadata?.product_name || "N/A",
      "Customer Name": transaction.metadata?.name || "N/A",
      Amount: `USD ${transaction.amount.toFixed(2)}`,
      Status: transaction.status,
      Type: transaction.type,
      Date: transaction.date,
    }));

    // Convert to CSV
    const csv = Papa.unparse(csvData);

    // Create and trigger download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "transactions.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.dateRange) count++;
    if (filters.startDate && filters.endDate) count++;
    if (filters.transactionType && filters.transactionType !== "All Types")
      count++;
    if (
      filters.transactionStatus &&
      filters.transactionStatus !== "All Statuses"
    )
      count++;
    return count;
  };

  return (
    <Container fluid className={styles.transactionsContainer}>
      <Row>
        <Col lg={10} md={9} sm={12} className={styles.contentCol}>
          <div className={styles.transactionsWrapper}>
            <div className={styles.header}>
              <div>
                <h2 className={styles.title}>
                  {filteredTransactions.length} Transactions
                </h2>
                <p className={styles.subtitle}>
                  Your transactions for the last 7 days
                </p>
              </div>
              <div className={styles.actions}>
                <button className={styles.filterButton}>
                  <span>Filter</span>
                  {getActiveFilterCount() > 0 && (
                    <span className={styles.filterBadge}>
                      {getActiveFilterCount()}
                    </span>
                  )}
                  <MdOutlineKeyboardArrowDown />
                </button>
                <button className={styles.exportButton} onClick={handleExport}>
                  <span>Export list</span>
                  <MdOutlineFileDownload />
                </button>
              </div>
            </div>

            <div className={styles.transactionList}>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction, index) => (
                  <TransactionItem
                    key={transaction.payment_reference || index}
                    transaction={transaction}
                  />
                ))
              ) : (
                <div className={styles.noTransactions}>
                  <p>No transactions found for the selected filters.</p>
                </div>
              )}
            </div>
          </div>
        </Col>
        <Col lg={1} md={1} sm={0}></Col>
      </Row>
    </Container>
  );
};

export default Transactions;
