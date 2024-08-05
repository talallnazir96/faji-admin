import React from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Image from "../../assets/event.jpg"
const data = [
    { name: 'Mon', sales: 4 },
    { name: 'Tue', sales: 3 },
    { name: 'Wed', sales: 2 },
    { name: 'Thu', sales: 2 },
    { name: 'Fri', sales: 10 },
    { name: 'Sat', sales: 12 },
    { name: 'Sun', sales: 15 }
  ];

const ViewTicket = () => {
    const navigate = useNavigate();
    // const { id } = useParams();
    const handleGoBack = () => {
        navigate(-1);
    };
    return (
        <>
            <Grid container sx={{marginTop: "8%", marginBottom: "2%"}} spacing={2}>
                <Grid item xs={12} sm={12} md={8} sx={{ margin: "auto"}}>
                    <Typography variant="h4" sx={{fontFamily: 'Montserrat, sans-serif', textAlign: "center", fontWeight: "500"}}>Ticket Details</Typography>
                    <Grid container sx={{marginTop: "4%"}}>
                        <Grid item xs={12} sm={12} md={6}>
                            <Typography variant="h6" sx={{fontFamily: 'Montserrat, sans-serif', textAlign: "center"}}><span style={{fontWeight: "500"}}>Ticket ID:</span> 1234</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <Typography variant="h6" sx={{fontFamily: 'Montserrat, sans-serif', textAlign: "center"}}><span style={{fontWeight: "500"}}>Event Name:</span> Party A</Typography>
                        </Grid>
                    </Grid>
                    <Grid container sx={{marginTop: "4%"}}>
                        <Grid item xs={12} sm={12} md={6}>
                            <Typography variant="h6" sx={{fontFamily: 'Montserrat, sans-serif', textAlign: "center"}}><span style={{fontWeight: "500"}}>Ticket Owner:</span> John Doe</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <Typography variant="h6" sx={{fontFamily: 'Montserrat, sans-serif', textAlign: "center"}}><span style={{fontWeight: "500"}}>Event Organizer:</span> Philipes Goldsmith</Typography>
                        </Grid>
                    </Grid>
                    <Grid container sx={{marginTop: "4%"}}>
                        <Grid item xs={12} sm={12} md={6}>
                            <Typography variant="h6" sx={{fontFamily: 'Montserrat, sans-serif', textAlign: "center"}}><span style={{fontWeight: "500"}}>Purchase Date:</span> 10-07-2024</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <Typography variant="h6" sx={{fontFamily: 'Montserrat, sans-serif', textAlign: "center"}}><span style={{fontWeight: "500"}}>Ticket Price:</span> $50</Typography>
                        </Grid>
                    </Grid>
                    <Grid container sx={{marginTop: "4%"}}>
                        <Grid item xs={12} sm={12} md={6}>
                            <Typography variant="h6" sx={{fontFamily: 'Montserrat, sans-serif', textAlign: "center"}}><span style={{fontWeight: "500"}}>Applied PromoCode:</span> None</Typography>
                        </Grid>
                    </Grid>
                </Grid>   
            </Grid>
            <Button variant="contained" onClick={handleGoBack} sx={{ mt: 2 }}>
        Go Back
        </Button>

        </>
    );
}
export default ViewTicket;