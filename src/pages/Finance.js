import React from 'react';
import { Grid, Typography, Card, CardContent, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import CountUp from 'react-countup';
const data = [
    { day: '1', sales: 1250 },
    { day: '2', sales: 1080 },
    { day: '3', sales: 1120 },
    { day: '4', sales: 2220 },
    { day: '5', sales: 2150 },
    { day: '6', sales: 3045 },
    { day: '7', sales: 1045 },
    { day: '8', sales: 45 },
    { day: '9', sales: 2045 },
    { day: '10', sales: 5045 },
    { day: '11', sales: 545 },
    { day: '12', sales: 3225 },
    { day: '13', sales: 1220 },
    { day: '14', sales: 1478 },
    { day: '15', sales: 1580 },
    { day: '16', sales: 1236 },
    { day: '17', sales: 1447 },
    { day: '18', sales: 5588 },
    { day: '19', sales: 8855 },
    { day: '20', sales: 6644 },
    { day: '21', sales: 2277 },
    { day: '22', sales: 9922 },
    { day: '23', sales: 3366 },
    { day: '24', sales: 5578 },
    { day: '25', sales: 6547 },
    { day: '26', sales: 7894 },
    { day: '27', sales: 4102 },
    { day: '28', sales: 1235 },
    { day: '29', sales: 2350 },
    { day: '30', sales: 6321 }
  ];
const Finance = () => {
  return (
    <>
      <Typography variant='h4' style={{fontFamily: 'Montserrat, sans-serif', marginTop: "8%", marginBottom: "2%", textAlign: "left", fontWeight: "500"}}>Financial Overview</Typography>
      <Grid container spacing={3} sx={{marginTop: "4%"}} >
        <Grid item xs={12} sm={12} md={4}>
            <Card sx={{ fontFamily: 'Montserrat, sans-serif', padding: "2%" }}>
                <CardContent>
                    <Typography variant="h6" align="left">Total Revenue</Typography>
                    <Typography variant="h4" align="left" sx={{ marginTop: "5%"}}>
                        $<CountUp start={0} end={250000} duration={2.5} />
                    </Typography>
                    <Typography variant="h6" sx={{fontSize: "13px", textAlign: "left", fontWeight: "300", marginTop: "5%"}}>Total revenue generated so far by the company</Typography>
                </CardContent>
            </Card>
            <Card sx={{marginTop: "5%"}}>
                <CardContent>
                    <Typography variant="h6" align="left">Profit Earned</Typography>
                    <Typography variant="h4" align="left" sx={{ marginTop: "5%"}}>
                        $<CountUp start={0} end={50000} duration={2.5} />
                    </Typography>
                    <Typography variant="h6" sx={{fontSize: "13px", textAlign: "left", fontWeight: "300", marginTop: "5%"}}>Total fees collected so far by the company</Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
            <Card sx={{ minWidth: 275, fontFamily: 'Montserrat, sans-serif' }}>
                <CardContent>
                    <Typography variant="h6" component="div">
                    Revenue
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Last Month
                    </Typography>
                    <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                        data={data}
                        margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="sales" stroke="#FD99C9" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
            <Card sx={{ minWidth: "100%" }}>
                <CardContent>
                    <Typography variant="h6" component="div">
                    Host Payouts
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Last Month
                    </Typography>
                    <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="sales" fill="#FD99C9" />
                        </BarChart>
                    </ResponsiveContainer>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
            <Card sx={{ fontFamily: 'Montserrat, sans-serif', padding: "2%" }}>
                <CardContent>
                    <Typography variant="h6" align="left">Total Hosts Payments</Typography>
                    <Typography variant="h4" align="left" sx={{ marginTop: "5%"}}>
                        $<CountUp start={0} end={200000} duration={2.5} />
                    </Typography>
                    <Typography variant="h6" sx={{fontSize: "13px", textAlign: "left", fontWeight: "300", marginTop: "5%"}}>Total payouts to hosts so far by the company</Typography>
                </CardContent>
            </Card>
            <Card sx={{marginTop: "5%"}}>
                <CardContent>
                    <Typography variant="h6" align="left">Organized Parties</Typography>
                    <Typography variant="h4" align="left" sx={{ marginTop: "5%"}}>
                        <CountUp start={0} end={500} duration={2.5} />
                    </Typography>
                    <Typography variant="h6" sx={{fontSize: "13px", textAlign: "left", fontWeight: "300", marginTop: "5%"}}>Total parties organized so far by the company</Typography>
                </CardContent>
            </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Finance;
