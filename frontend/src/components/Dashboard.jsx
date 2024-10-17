import React from 'react';
import Layout from "./Layout"; // Adjust import if needed
import AddExpense from './AddExpense';

const Dashboard = () => {
  return (
    <Layout>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>

      <div>
        <h1>Dashboard Page</h1>
  

      </div>
      <AddExpense />
        </div>
    </Layout>
  );
};

export default Dashboard;
