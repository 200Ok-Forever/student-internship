import React from "react";
import Card from '../UI/Card';
import ScrollableRow from '../UI/ScrollableRow'

const Home = () => {
  return (
    <>
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
    </>
  );
};

export default Home;