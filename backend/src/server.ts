import Fastify from "fastify";
import cors from "@fastify/cors";
import dontenv from "dotenv";
import { routes } from "./routes";

dontenv.config();

const app = Fastify({ logger: true });

app.setErrorHandler((error, req, reply) => {
    reply.code(400).send({ message: error.message });
});

const start = async () => {
    app.register(cors);
    app.register(routes);

    try {
        await app.listen({ port: 8080, host: "0.0.0.0" });
        console.log(`Servidor rodando na porta 8080`);
    } catch (error) {
        console.log(error);
    }
};

start();
