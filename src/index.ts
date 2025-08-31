/* import app from './app';
import mongoConnect from './utils/db';

const port = process.env.PORT || 3000;

mongoConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening: http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Connection to db failed: ', (error as Error).message);
  });
*/

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoConnect = async () => {
  const dbUrl =
    process.env.NODE_ENV === 'test' ? process.env.DB_URL_TEST : process.env.DB_URL;

  try {
    await mongoose.connect(dbUrl!); // dbUrl ole undefined, "test": "NODE_ENV=test jest",
    console.log('DB connected');
  } catch (err) {
    console.error('DB connection error:', (err as Error).message);
    throw err;
  }
};

export default mongoConnect;





  