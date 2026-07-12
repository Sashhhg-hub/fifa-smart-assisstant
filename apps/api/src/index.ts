import 'dotenv/config';
import { createApp } from './app.js';
import { connectDatabase } from './config/database.js';

const port = Number(process.env.PORT) || 3001;
const app = createApp();

await connectDatabase();

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
