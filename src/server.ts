import dotenv from 'dotenv';
import app from './index';

dotenv.config();
const PORT =  process.env.PORT || 3000;

app.listen(PORT,()=> {
   console.log('Server runnig  on port 3000');
});