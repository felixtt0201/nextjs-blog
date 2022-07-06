// 入口點 url:domain.com/
import { Fragment, useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';
const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A Fitst Meetup',
    image:
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    address: '台北市信義區松江路二段',
    description: 'This is a description1',
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image:
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    address: '台北市信義區松江路三段',
    description: 'This is a description2',
  },
];

// pre-render
export const getStaticProps = async () => {
  // fetch data form API
  const client = await MongoClient.connect(
    'mongodb+srv://ben2:g5Yck3hLCa879jsl@nextjstest.fpklhsm.mongodb.net/meetups?retryWrites=true&w=majority',
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    // 數字代表幾秒判斷一次資料有沒有改變
    revalidate: 10,
  };
};

// export const getServerSideProps = async (context) => {
//   // fetch data form API
//   // run in the server
//   const req = context.req;
//   const res = context.res;

//   console.log(req);
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

const HomePage = (props) => {
  console.log('index page change');
  const [loadedMeetups, setLoadedMeetups] = useState([]);
  // useEffect(() => {
  //   // send a http request and fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);
  // return <MeetupList meetups={loadedMeetups} />;
  return (
    <Fragment>
      <Head>
        <title>Home</title>
        <meta name="description" content="This is a meetup page" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};
export default HomePage;
