import React from 'react';
import Layout from "./Layout"; // Adjust import if needed
import AddExpense from './AddExpense';

const Dashboard = () => {
  return (
    <Layout>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>

      <div style={{marginTop:"15px",marginLeft:"10px"}} >
        <h1>Dashboard Page</h1>
  

      </div  >
      <AddExpense style={{marginTop:"10px"}}/>
        </div>
    </Layout>
  );
};

export default Dashboard;
