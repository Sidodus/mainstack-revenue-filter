"use client";

import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import styles from "@/app/styles/layout/maincontent.module.scss";
import { RiErrorWarningLine } from "react-icons/ri";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
} from "chart.js";
import { useSelector } from "@/app/redux/store";
import { selectWallet } from "@/app/reduxFeatures/app/wallet";
import { selectTransactions } from "@/app/reduxFeatures/app/transactions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend
);

// Define types for fetched data
interface Transaction {
  date: string;
  amount: number;
}

// Chart component with data prop
interface TransactionChartProps {
  data: { date: string; amount: number }[];
}

const TransactionChart: React.FC<TransactionChartProps> = ({ data }) => {
  const chartData = {
    type: "line",
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Amount",
        data: data.map((item) => item.amount),
        borderWidth: 1,
        borderColor: "#FF5403",
        backgroundColor: "#FF5403",
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "nearest" as const,
      intersect: false,
      axis: "x" as const,
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          callback: function (value: unknown, index: number) {
            if (index === 0 || index === data.length - 1) {
              const date = new Date(data[index].date);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });
            }
            return "";
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <Line options={options} data={chartData} />
    </div>
  );
};

const MainContent: React.FC = () => {
  const wallet = useSelector(selectWallet);
  const transactions = useSelector(selectTransactions);

  // Handle loading states
  if (!wallet || !transactions) return <div>Loading...</div>;

  // Extracting data for display and chart
  const balance = wallet?.balance?.toFixed(2)?.toLocaleString() ?? "0.00";
  const currency = "USD";

  const chartData =
    transactions?.map((transaction: Transaction) => ({
      date: new Date(transaction.date).toLocaleDateString(),
      amount: transaction.amount,
    })) || [];

  // Ledger balances from wallet
  const ledgerBalance =
    wallet?.ledger_balance?.toFixed(2)?.toLocaleString() ?? "0.00";
  const totalPayout =
    wallet?.total_payout?.toFixed(2)?.toLocaleString() ?? "0.00";
  const totalRevenue =
    wallet?.total_revenue?.toFixed(2)?.toLocaleString() ?? "0.00";
  const pendingPayout =
    wallet?.pending_payout?.toFixed(2)?.toLocaleString() ?? "0.00";

  return (
    <Container fluid className={styles.mainContentContainer}>
      <Row className={styles.contentRow}>
        {/* Main content area */}
        <Col lg={8} md={7} sm={12} className={styles.mainArea}>
          <div className={styles.mainContentWrapper}>
            {/* Top section with balance and withdraw button */}
            <div className={styles.topSection}>
              <div className={styles.balanceInfo}>
                <p className={styles.balanceLabel}>Available Balance</p>
                <div className={styles.balanceRow}>
                  <div className={styles.balanceAmount}>
                    <span className={styles.balanceCurrency}>{currency}</span>
                    <span className={styles.balanceValue}>
                      {balance.toLocaleString()}
                    </span>
                  </div>
                  <Button className={styles.withdrawButton}>Withdraw</Button>
                </div>
              </div>
            </div>

            {/* Chart Section */}
            <Card className={styles.chartCard}>
              <Card.Body>
                <TransactionChart data={chartData} />
              </Card.Body>
            </Card>
          </div>
        </Col>

        <Col lg={2} md={3} sm={12} className={`${styles.mainArea}`}>
          {/* Ledger Balances Section */}
          <div className={styles.ledgerSection}>
            <div className={styles.ledgerItem}>
              <div className={styles.ledgerLabel}>
                Ledger Balance
                <RiErrorWarningLine
                  size={15.83}
                  color="#888F95"
                  style={{ float: "right" }}
                />
              </div>
              <p
                className={styles.ledgerValue}
              >{`${currency} ${ledgerBalance}`}</p>
            </div>
            <div className={styles.ledgerItem}>
              <div className={styles.ledgerLabel}>
                Total Payout
                <RiErrorWarningLine
                  size={15.83}
                  color="#888F95"
                  style={{ float: "right" }}
                />
              </div>
              <p
                className={styles.ledgerValue}
              >{`${currency} ${totalPayout}`}</p>
            </div>
            <div className={styles.ledgerItem}>
              <div className={styles.ledgerLabel}>
                Total Revenue
                <RiErrorWarningLine
                  size={15.83}
                  color="#888F95"
                  style={{ float: "right" }}
                />
              </div>
              <p
                className={styles.ledgerValue}
              >{`${currency} ${totalRevenue}`}</p>
            </div>
            <div className={styles.ledgerItem}>
              <div className={styles.ledgerLabel}>
                Pending Payout
                <RiErrorWarningLine
                  size={15.83}
                  color="#888F95"
                  style={{ float: "right" }}
                />
              </div>
              <p
                className={styles.ledgerValue}
              >{`${currency} ${pendingPayout}`}</p>
            </div>
          </div>
        </Col>
        <Col lg={1} md={1} sm={0}></Col>
      </Row>
    </Container>
  );
};

export default MainContent;
