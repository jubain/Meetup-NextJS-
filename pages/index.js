import MeetupList from '../components/meetups/MeetupList'
import { MongoClient } from 'mongodb'
import Head from 'next/head'
import { Fragment } from 'react'

function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>Jubeen Meetups</title>
                <meta name='description' content='Browse a huge list of highly active meetups!' />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    )
}

// Alternate 1
// Only use when we need access to req object and data changes multiple times
// export async function getServerSideProps(context) {
//     const req = context.req
//     const res = context.res
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

// Alternate 2
export async function getStaticProps() {
    // Data fetching away from client
    // never execute in the client side and executed during bild process
    // Always need to return an object
    const client = await MongoClient.connect('mongodb+srv://Jubeen:Jubeen@cluster0.gphr2.mongodb.net/myMeetUp?retryWrites=true&w=majority')
    const db = client.db()
    const meetupCollection = db.collection('meetups')
    const meetups = await meetupCollection.find().toArray()
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 1
    }
}

export default HomePage