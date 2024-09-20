import {
    FastifyInstance,
    FastifyPluginOptions,
    FastifyRequest,
    FastifyReply,
} from "fastify";
import { CreateNutritionController } from "./controllers/CreateNutritionController";

export async function routes(
    fastify: FastifyInstance,
    options: FastifyPluginOptions
) {
    fastify.get("/teste", (request: FastifyRequest, reply: FastifyReply) => {
        let responseText =
            '```json\n{\n  "nome": "Hundlee",\n  "sexo": "Masculino",\n  "idade": 25,\n  "altura": 1.80,\n  "peso": 112,\n  "objetivo": "Definicao",\n  "refeicoes": [\n    {\n      "horario": "08:00",\n      "nome": "Cafe da Manha",\n      "alimentos": [\n        "2 fatias de pao integral",\n        "1 ovo cozido",\n        "1 colher de sopa de azeite de oliva",\n        "1 banana",\n        "1 copo de leite desnatado"\n      ]\n    },\n    {\n      "horario": "10:00",\n      "nome": "Lanche da Manha",\n        "alimentos": [\n        "1 maça",\n        "1 pote de iogurte grego natural"\n      ]\n    },\n    {\n      "horario": "12:00",\n      "nome": "Almoco",\n      "alimentos": [\n        "150g de frango grelhado",\n        "100g de batata doce cozida",\n        "1 xícara de brócolis cozido",\n        "1 colher de sopa de azeite de oliva"\n      ]\n    },\n    {\n      "horario": "15:00",\n      "nome": "Lanche da Tarde",\n      "alimentos": [\n        "1 scoop de whey protein",\n        "1 banana"\n      ]\n    },\n    {\n      "horario": "19:00",\n      "nome": "Jantar",\n      "alimentos": [\n        "150g de peixe assado",\n        "1 xícara de arroz integral",\n        "1 xícara de couve refogada"\n      ]\n    },\n    {\n      "horario": "21:00",\n      "nome": "Lanche da Noite",\n      "alimentos": [\n        "1 pote de iogurte grego natural com 1 colher de sopa de granola"\n      ]\n    }\n  ],\n  "suplementos": [\n    "Whey Protein",\n    "Creatina",\n    "Glutamina"\n  ]\n}\n```';

        try {
            let jsonString = responseText
                .replace(/```\w*\n/g, "")
                .replace(/\n```/g, "")
                .trim();

            let jsonObject = JSON.parse(jsonString);
            return reply.send({ data: jsonObject });
        } catch (error) {
            console.log(error);
        }

        reply.send({ ok: true });
    });

    fastify.post(
        "/create",
        async (request: FastifyRequest, reply: FastifyReply) => {
            return new CreateNutritionController().handle(request, reply);
        }
    );
}
