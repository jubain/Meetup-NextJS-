import MeetupDetail from "../../components/meetups/MeetupDetail"
import { MongoClient, ObjectId } from "mongodb"
import { Fragment } from "react"
import Head from "next/head"


function MeetupDetails(props) {
    return <Fragment>
        <Head>
            <title>{props.meetupData.title}</title>
            <meta name="description" content={props.meetupData.desc} />
        </Head>
        <MeetupDetail
            img={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            desc={props.meetupData.desc}
        />
    </Fragment>
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://Jubeen:Jubeen@cluster0.gphr2.mongodb.net/myMeetUp?retryWrites=true&w=majority')
    const db = client.db()
    const meetupCollection = db.collection('meetups')
    const meetups = await meetupCollection.find({}, { _id: 1 }).toArray()
    client.close()
    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } }))
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId
    try {
        const client = await MongoClient.connect('mongodb+srv://Jubeen:Jubeen@cluster0.gphr2.mongodb.net/myMeetUp?retryWrites=true&w=majority')
        const db = client.db()
        const meetupCollection = db.collection('meetups')
        const selectedmeetup = await meetupCollection.findOne({
            _id: ObjectId(meetupId),
        })

        client.close()
        return {
            props: {
                meetupData: {
                    id: selectedmeetup._id.toString(),
                    title: selectedmeetup.title,
                    address: selectedmeetup.address,
                    image: selectedmeetup.image,
                    desc: selectedmeetup.description
                }
            }
        }
    } catch (error) {
        console.log(error)
    }

}

export default MeetupDetails