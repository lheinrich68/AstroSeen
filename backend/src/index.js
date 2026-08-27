import 'dotenv/config';
import express from 'express';
import routes from './routes/index.js';

const app = express();

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`AstroSeen API en écoute sur le port ${PORT}.`);
    })
}

export default app;