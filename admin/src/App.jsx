import React from 'react';
import { Button, Grid, Paper } from '@mui/material';

function App() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <h1>EV Rental - Admin Dashboard</h1>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" color="primary">Generate Report</Button>
      </Grid>
    </Grid>
  );
}

export default App;
