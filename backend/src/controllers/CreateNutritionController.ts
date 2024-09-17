import { FastifyReply, FastifyRequest } from "fastify";
import { CreateNutritionService } from "../services/CreateNutritionService";

export interface DataProps {
    name: string;
    weight: string;
    height: string;
    level: string;
    age: string;
    gender: string;
    objective: string;
}

class CreateNutritionController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { name, weight, height, level, age, gender, objective } =
            request.body as DataProps;

        const createNutrition = new CreateNutritionService();

        const nutrition = await createNutrition.execute({
            name,
            weight,
            height,
            level,
            age,
            gender,
            objective,
        });

        reply.send(nutrition);
    }
}

export { CreateNutritionController };
