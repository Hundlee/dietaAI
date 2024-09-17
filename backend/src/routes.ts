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
            '```json\n{\n  "nome": "Gabriel",\n  "sexo": "Masculino",\n  "idade": 21,\n  "altura": 1.80,\n  "peso": 113,\n  "objetivo": "Chegar aos 90kg em 1 mês",\n  "refeicoes": [\n    {\n      "nome": "Café da Manhã",\n      "alimentos": [\n        "2 fatias de pão integral",\n        "1 ovo cozido",\n        "1 banana",\n        "1 copo de leite desnatado"\n      ]\n    },\n    {\n      "nome": "Lanche da Manhã",\n        "alimentos": [\n            "1 iogurte grego natural desnatado",\n            "1 colher de sopa de granola"\n        ]\n    },\n    {\n      "nome": "Almoço",\n      "alimentos": [\n        "150g de frango grelhado",\n        "1 xícara de arroz integral",\n        "1 xícara de brócolis cozido",\n        "Salada verde com azeite de oliva"\n      ]\n    },\n    {\n      "nome": "Lanche da Tarde",\n        "alimentos": [\n            "1 iogurte grego natural desnatado",\n            "1 fruta de sua preferência"\n        ]\n    },\n    {\n      "nome": "Jantar",\n      "alimentos": [\n        "150g de peixe grelhado",\n        "1 xícara de batata doce cozida",\n        "1 xícara de espinafre cozido"\n      ]\n    },\n    {\n      "nome": "Ceia",\n        "alimentos": [\n            "1 xícara de chá de camomila"\n        ]\n    }\n  ],\n  "suplementos": [\n    "Whey protein",\n    "Creatina",\n    "BCAA"\n  ]\n}\n```';

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
