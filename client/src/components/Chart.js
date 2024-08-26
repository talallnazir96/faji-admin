import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import constant from "../constant";


const ChartCard = () => {
  const [data, setData] = useState([]);
  const daysOfWeek = [];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const graphSales = [
    { sales: 50},
    { sales: 80 },
    { sales: 120 },
    { sales: 20 },
    { sales: 150 },
    { sales: 45 },
    { sales: 87 },
  ];
  
  useEffect(() => {
    axios
      .get(`${constant.apiUrl}/events/lastWeekEvents`)
      .then((response) => {
        console.log(response.data);

        const formattedData = response.data.map((item,index) => ({
          day: new Date(item.date).toLocaleDateString("en-US", {
            weekday: "short",
          }),
          sales: graphSales[index]?.sales || 0, 
        }));
        setData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching data");
        setLoading(false);
      });
  }, []);
  return (
    <Card sx={{ Width: "100%", fontFamily: "Montserrat, sans-serif" }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Parties Requests
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Last Week
        </Typography>
        <Box sx={{ height: 200 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey='sales'
                stroke="#FD99C9"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
