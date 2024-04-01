import fastify from 'fastify';

const app = fastify();
const port = 3001;

app.listen({port: port}).then(() => {
    console.log(`Server running in ${port} port`);
})