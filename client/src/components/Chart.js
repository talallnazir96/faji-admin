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

const data = [
  { sales: 50 },
  { sales: 80 },
  { sales: 120 },
  { sales: 20 },
  { sales: 150 },
  { sales: 45 },
  { sales: 87 },
];

const ChartCard = () => {
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   // Replace the URL with your actual API endpoint
  //   axios
  //     .get(`${constant.apiUrl}/events/lastWeekEvents`)
  //     .then((response) => {
  //       console.log(response.data);
  //       // Assume the API returns an array of objects with `requestDate` and `count` fields
  //       const formattedData = response.data.map((item) => ({
  //         day: new Date(item.date), // Convert date to weekday
  //         sales: item.count,// or however your API returns the count of requests
  //       }));
  //       setData(formattedData);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError("Error fetching data");
  //       setLoading(false);
  //     });
  // }, []);
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
                dataKey="sales"
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
