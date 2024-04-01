import { app } from "src/server"
import { createUser } from "./user/create-user"

export const routes = async () => {
    app.register(createUser);
}