import 'dotenv/config'; import { app } from './app.js';
const port=Number(process.env.PORT||5001);
const server=app.listen(port,()=>console.log(`Sweety API listening on ${port}`));
server.on('error',error=>{
  if(error.code==='EADDRINUSE')console.error(`Port ${port} is already in use. Set PORT to an available port in your .env file.`);
  else console.error('Could not start the Sweety API:',error.message);
  process.exit(1);
});
