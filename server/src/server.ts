import fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes";

export const app = fastify();
const port = 3001;

app.register(cors, {});
app.register(routes)

app.listen({ port: port }).then(() => {
  console.log(`Server running in ${port} port`);
});
