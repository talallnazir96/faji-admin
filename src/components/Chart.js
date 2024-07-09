import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', sales: 50 },
  { name: 'Tue', sales: 80 },
  { name: 'Wed', sales: 120 },
  { name: 'Thu', sales: 20 },
  { name: 'Fri', sales: 150 },
  { name: 'Sat', sales: 45 },
  { name: 'Sun', sales: 87 },
];

const ChartCard = () => {
  return (
    <Card sx={{ minWidth: 275, fontFamily: 'Montserrat, sans-serif' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Parties Requests
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Last Week
        </Typography>
        <Box sx={{ height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#FD99C9" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ChartCard;
