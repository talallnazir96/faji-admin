import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', sales: 40 },
  { name: 'Feb', sales: 30 },
  { name: 'Mar', sales: 20 },
  { name: 'Apr', sales: 27 },
  { name: 'May', sales: 18 },
  { name: 'Jun', sales: 23 },
  { name: 'Jul', sales: 34 },
  { name: 'Aug', sales: 40 },
  { name: 'Sep', sales: 30 },
  { name: 'Oct', sales: 20 },
  { name: 'Nov', sales: 27 },
  { name: 'Dec', sales: 18 },
];

const TotalSalesCard = () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Users Registered
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Last Year
        </Typography>
        <Box sx={{ height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#FD99C9" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TotalSalesCard;
