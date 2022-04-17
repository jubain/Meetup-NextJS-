import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import Head from 'next/head'

function NewMeetupPage() {
    const router = useRouter()

    async function addMeetupHandler(enteredMeetupData) {
        try {
            const res = await fetch('/api/new-meetup', {
                method: 'POST',
                body: JSON.stringify(enteredMeetupData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    return <Fragment>
        <Head>
            <title>Add a new meetup</title>
            <meta name='description' content='Add your own new meetups!'/>
        </Head>
        <NewMeetupForm
            onAddMeetup={addMeetupHandler}
        />
    </Fragment>
}

export default NewMeetupPage