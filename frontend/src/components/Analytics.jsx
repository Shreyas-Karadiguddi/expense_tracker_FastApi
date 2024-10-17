import React from 'react';
import Layout from './Layout';
import AddExpense from './AddExpense';
const Analytics = () => {
  return (
        <Layout>

<div style={{ display: 'flex', justifyContent: 'space-between' }}>

<div>
  <h1>Analytics Page</h1>


</div>
<AddExpense />
  </div>
        </Layout>
  );
};

export default Analytics;
