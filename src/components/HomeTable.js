import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Button
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/HourglassEmpty';
import VisibilityIcon from '@mui/icons-material/Visibility';

const createData = (title, date, time, seats, location, price, status) => {
  return { title, date, time, seats, location, price, status };
};

const rows = [
  createData('Party A', '2024-07-10', '18:00', 100, 'Location A', '$50', 'active'),
  createData('Party B', '2024-07-15', '20:00', 200, 'Location B', '$75', 'pending'),
  createData('Party C', '2024-07-20', '19:00', 150, 'Location C', '$60', 'active'),
  createData('Party D', '2024-07-25', '21:00', 80, 'Location D', '$40', 'pending'),
  createData('Party E', '2024-07-30', '22:00', 120, 'Location E', '$55', 'active'),
];

const DataTable = () => {
  return (
    <TableContainer component={Paper}>
        <Typography variant="h5" component="div" sx={{marginTop: "4%", marginBottom: "2%"}}>Latest Parties</Typography>
      <Table sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Time</TableCell>
            <TableCell align="left">Seats</TableCell>
            <TableCell align="left">Location</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="left">{row.date}</TableCell>
              <TableCell align="left">{row.time}</TableCell>
              <TableCell align="left">{row.seats}</TableCell>
              <TableCell align="left">{row.location}</TableCell>
              <TableCell align="left">{row.price}</TableCell>
              <TableCell align="left">
                {row.status === 'active' ? (
                  <CheckCircleIcon style={{ color: 'green' }} />
                ) : (
                  <PendingIcon style={{ color: 'orange' }} />
                )}
              </TableCell>
              <TableCell align='left'><Button variant="text" size='small'><VisibilityIcon /></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
