import { FastifyInstance } from "fastify";

export const createUser = async (app: FastifyInstance) => {
    app.post('/user', async (req, res) => {
        
    })
}