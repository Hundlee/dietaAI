import { GoogleGenerativeAI } from "@google/generative-ai";
import { DataProps } from "../controllers/CreateNutritionController";
import { json } from "stream/consumers";

class CreateNutritionService {
    async execute({
        name,
        age,
        gender,
        height,
        weight,
        level,
        objective,
    }: DataProps) {
        try {
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
            });

            const response = await model.generateContent(
                `Crie uma dieta completa para uma pessoa com nome: ${name} do sexo ${gender} com peso atual: ${weight}kg, 
                altura: ${height}, idade: ${age} anos e com foco e objetivo em ${objective}, atualmente nível de atividade: ${level} 
                e ignore qualquer outro parametro que não seja os passados, retorne em json com as respectivas propriedades, 
                propriedade nome o nome da pessoa, propriedade sexo com sexo, propriedade idade, propriedade altura,propriedade peso,
                propriedade objetivo com o objetivo atual, propriedade refeições com uma array 
                contendo dentro cada objeto sendo uma refeição de dieta e dentro de cada refeição a propriedade horários com horário da refeição, propriedade nome com nome, e a propriedade alimentros com array 
                contendo os alimentos dessa refeirção e pode incluir uma propriedade como suplementos contendo array com sugestão de 
                suplemento que é indicado para o sexto dessa ppessoa e o objetivo dela e não retorne nenhuma observação além das 
                passadas no prompt, retorne em json e nenhuma propriedade pode ter acento`
            );

            console.log(JSON.stringify(response, null, 2));

            if (response.response && response.response.candidates) {
                const jsonText = response.response.candidates[0]?.content
                    .parts[0].text as string;

                let jsonString = jsonText
                    .replace(/```\w*\n/g, "")
                    .replace(/\n```/g, "")
                    .trim();

                let jsonObject = JSON.parse(jsonString);

                return { data: jsonObject };
            }

            return { ok: true };
        } catch (error) {
            console.log("Error:", error);
            throw new Error("Failed Create");
        }
    }
}

export { CreateNutritionService };
