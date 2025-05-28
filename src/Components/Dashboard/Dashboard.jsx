
import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";
import History from "../../History/History";
import { InnerLayout } from "../../styles/Layouts";
import { dollar } from "../../utils/Icons";
import Chart from "../Chart/Chart";

function Dashboard() {
  const {
    totalExpenses = 0,
    incomes = [],
    expenses = [],
    totalIncome = 0,
    totalBalance = 0,
    getIncomes,
    getExpenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes?.();
    getExpenses?.();
  }, [getIncomes, getExpenses]);

  // Currency Formatter
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);

  const minIncome = incomes.length
    ? Math.min(...incomes.map((item) => Number(item.amount) || 0))
    : 0;

  const maxIncome = incomes.length
    ? Math.max(...incomes.map((item) => Number(item.amount) || 0))
    : 0;

  const minExpense = expenses.length
    ? Math.min(...expenses.map((item) => Number(item.amount) || 0))
    : 0;

  const maxExpense = expenses.length
    ? Math.max(...expenses.map((item) => Number(item.amount) || 0))
    : 0;

  return (
    <DashboardStyled>
      <InnerLayout>
        <h1 className="dashboard-title">Dashboard</h1>

        <div className="amount-summary">
          <div className="summary-card">
            <h2>Total Income</h2>
            <p className="amount" style={{ color: "#42AD00" }}>
              {dollar} {formatCurrency(totalIncome)}
            </p>
          </div>
          <div className="summary-card">
            <h2>Total Expense</h2>
            <p className="amount" style={{ color: "#D12C2C" }}>
              {dollar} {formatCurrency(totalExpenses)}
            </p>
          </div>
          <div className="summary-card highlight">
            <h2>Total Balance</h2>
            <p className="amount" style={{ color: "#2c7ad1" }}>
              {dollar} {formatCurrency(totalBalance)}
            </p>
          </div>
        </div>

        <div className="stats-container">
          <div className="left-section">
            <div className="history-section">
              <h2 className="section-title">Recent History</h2>
              <History />
            </div>
          </div>
          <div className="right-section">
            <div className="chart-container">
              <Chart />
            </div>
          </div>
        </div>

        <div className="min-max-section">
          <div className="min-max-card">
            <h2 className="salary-title">
              <span className="min-label">Min</span>
              <span className="title-label">Income</span>
              <span className="max-label">Max</span>
            </h2>
            <div className="salary-item">
              <p className="min-value">{formatCurrency(minIncome)}</p>
              <p className="max-value">{formatCurrency(maxIncome)}</p>
            </div>
          </div>

          <div className="min-max-card">
            <h2 className="salary-title">
              <span className="min-label">Min</span>
              <span className="title-label">Expense</span>
              <span className="max-label">Max</span>
            </h2>
            <div className="salary-item">
              <p className="min-value">{formatCurrency(minExpense)}</p>
              <p className="max-value">{formatCurrency(maxExpense)}</p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  background-color: rgba(252, 246, 249, 0.78);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-right: 1rem;

  .dashboard-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
    text-align: center;
    color: #2c3e50;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  .amount-summary {
    display: flex;
    justify-content: space-evenly;
    gap: 1.5rem;
    // background-color: white;
    width: 100%;
    margin-bottom: 2rem;
    border-radius: 15px;
    padding: 1rem;
    // box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.05);
    // background-color: blue;
  }

  .summary-card { 
    flex: 1;
    background: white;
    border-radius: 20px;
    padding: 1.5rem;
    text-align: center;
    min-width: 200px;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.1);
    }

    h2 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      color: rgba(34, 34, 96, 1);
    }

    .amount {
      font-size: 2.5rem;
      font-weight: 700;
    }
  }

  .stats-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 2rem;

    @media screen and (min-width: 768px) {
      flex-direction: row;
      gap: 2rem;
    }
  }

  .left-section {
    width: 100%;
    margin-bottom: 2rem;

    @media screen and (min-width: 768px) {
      width: 40%;
      margin-bottom: 0;
    }

    .history-section {
      background: white;
      border-radius: 20px;
      padding: 1.5rem;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);

      .section-title {
        font-size: 1.5rem;
        margin-bottom: 2rem;
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .right-section {
    width: 100%;

    @media screen and (min-width: 768px) {
      width: 60%;
    }

    .chart-container {
      background: white;
      border-radius: 20px;
      padding: 1.5rem;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    }
  }

  .min-max-section {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-top: 2rem;

    @media screen and (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .min-max-card {
    margin: 4rem 1rem;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.06);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.15);
    }
  }

  .salary-title {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    gap: 1rem;

    span {
      flex: 1;
      text-align: center;
    }

    .min-label {
      text-align: left;
      color: red;
    }

    .title-label {
      font-weight: bold;
      color: #2c3e50;
    }

    .max-label {
      text-align: right;
      color: red;
    }
  }

  .salary-item {
    background: white;
    border-radius: 20px;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.15);
    }

    p {
      font-weight: 600;
      font-size: 1.3rem;
      color: #2c3e50;
    }
  }
`;

export default Dashboard;
