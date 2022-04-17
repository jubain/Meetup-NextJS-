// url of the file
import { MongoClient } from 'mongodb'

async function handler(req, res) {
    if (req.method == 'POST') {
        const data = req.body
        try {
            const client = await MongoClient.connect(`mongodb+srv://Jubeen:Jubeen@cluster0.gphr2.mongodb.net/myMeetUp?retryWrites=true&w=majority`)
            const db = client.db()
            const meetupsCollection = db.collection('meetups')
            const result = await meetupsCollection.insertOne(data)
            client.close()

            res.status(201).json({ message: 'Data Inserted' })

        } catch (error) {
            console.log(error)
        }

    }

}

export default handler