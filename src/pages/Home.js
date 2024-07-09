import React from 'react';
import { Grid, Typography} from '@mui/material';
import ChartCard from '../components/Chart';
import UsersChart from '../components/UsersChart';
import HomeTable from '../components/HomeTable'
const Dashboard = () => {
  return (
    <>
      <Typography variant='h4' style={{fontFamily: 'Montserrat, sans-serif', marginTop: "8%", marginBottom: "2%", textAlign: "left", fontWeight: "500"}}>Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <ChartCard />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <UsersChart />
          
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <HomeTable />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
