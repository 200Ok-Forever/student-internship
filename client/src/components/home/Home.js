import React from "react";
import { Grid, Box, Typography } from '@mui/material';
import Card from '../UI/Card';
import ScrollableRow from '../UI/ScrollableRow'
import EventsSidebar from './Sidebar'

const Home = () => {
  return (
    <Box>
      <Box>
        Search
      </Box>
      <Grid container >
        <Grid item xs={9}>
          <Typography variant="h5" component="div" gutterBottom>
            Recommended for You
          </Typography>          
          <ContentRow />
          <Typography variant="h5" component="div" gutterBottom>
            Recently Posted
          </Typography>           
          <ContentRow />
          <Typography variant="h5" component="div" gutterBottom>
            Closing Soon
          </Typography> 
          <ContentRow />
        </Grid>
        <EventsSidebar />      
      </Grid>
    </Box>
  );
};

const ContentRow = () => (
  <ScrollableRow>
    <Card
      title="Software Engineering Internship"
      itemId={1}
      subheading="Google"
      media='https://picsum.photos/300/200'
      to='/forum'
    >
      "some text omg asdjoas idasiudh asiduh asiduhas diuahsd iasuhd aiushdiau sdhsaiudh"
    </Card>,
    <Card
      title="Software Engineering Internship"
      itemId={2}
      subheading="Google"
      media='https://picsum.photos/300/200'
      to='/forum'
    >
      "some text omg asdjoas idasiudh asiduh asiduhas diuahsd iasuhd aiushdiau sdhsaiudh"
    </Card>,
    <Card
      title="Software Engineering Internship"
      itemId={3}
      subheading="Google"
      media='https://picsum.photos/300/200'
      to='/forum'
    >
      "some text omg asdjoas idasiudh asiduh asiduhas diuahsd iasuhd aiushdiau sdhsaiudh"
    </Card>,
    <Card
      title="Software Engineering Internship"
      itemId={4}
      subheading="Google"
      media='https://picsum.photos/300/200'
      to='/forum'
    >
      "some text omg asdjoas idasiudh asiduh asiduhas diuahsd iasuhd aiushdiau sdhsaiudh"
    </Card>,
    <Card
      title="Software Engineering Internship"
      itemId={5}
      subheading="Google"
      media='https://picsum.photos/300/200'
      to='/forum'
    >
      "some text omg asdjoas idasiudh asiduh asiduhas diuahsd iasuhd aiushdiau sdhsaiudh"
    </Card>,
    <Card
      title="Software Engineering Internship"
      itemId={6}
      subheading="Google"
      media='https://picsum.photos/300/200'
      to='/forum'
    >
      "some text omg asdjoas idasiudh asiduh asiduhas diuahsd iasuhd aiushdiau sdhsaiudh"
    </Card>  
  </ScrollableRow>
)
export default Home;