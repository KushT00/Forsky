// import * as React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import mockvid from '../../public/mock.mp4';

export default function ResponsiveContainer() {
  return (
    <div style={{ backgroundColor: 'rgba(135, 206, 235, 0.2)', minHeight: '100vh', padding: '20px' }}>
      <Box
        sx={{
          flexGrow: 1,
          p: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.5)', // Transparent background for glass effect
          backdropFilter: 'blur(10px)', // Blur effect
          borderRadius: '12px', // Rounded corners
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', // Subtle shadow
          border: '1px solid rgba(255, 255, 255, 0.3)', // Border with transparency
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Box
              component="video"
              autoPlay
              loop
              muted
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: 3,
              }}
            >
              <source src={mockvid} type="video/mp4" />
              Your browser does not support the video tag.
            </Box>
          </Grid>
          <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h4" component="div" align="center" sx={{ fontWeight: 'bold' }}>
              Wear Your Wins
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
