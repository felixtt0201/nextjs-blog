import React, { Fragment } from 'react';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';
const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{`Detail - ${props.meetupData.title}`}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};
// 需要告訴client 要跑哪個Id的頁面
export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://ben2:g5Yck3hLCa879jsl@nextjstest.fpklhsm.mongodb.net/meetups?retryWrites=true&w=majority',
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    // paths: [{ params: { meetupId: 'm1' } }, { params: { meetupId: 'm2' } }],
  };
};
// 在動態頁面中 如果有使用getStaticProps 就需要使用 getStaticPaths
export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;
  console.log(meetupId);
  const client = await MongoClient.connect(
    'mongodb+srv://ben2:g5Yck3hLCa879jsl@nextjstest.fpklhsm.mongodb.net/meetups?retryWrites=true&w=majority',
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();
  // fetch data for a single meetup
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
};

export default MeetupDetails;
