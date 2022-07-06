// api 資料夾裡面的 檔案 寫一般的JS function 這邊只會執行在server
// api/new-meetup
// POST /api/new-meetup
import { MongoClient } from 'mongodb';
const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;
    // const { title, image, address, description } = data;
    const client = await MongoClient.connect(
      'mongodb+srv://ben2:g5Yck3hLCa879jsl@nextjstest.fpklhsm.mongodb.net/meetups?retryWrites=true&w=majority',
    );
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);
    console.log('result', result);
    client.close();

    res.status(201).json({ message: 'Meetup inserted!' });
  }
};
export default handler;
