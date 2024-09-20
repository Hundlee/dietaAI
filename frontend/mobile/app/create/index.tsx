import { Header } from "@/components/header";
import { colors } from "@/constants/colors";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Select } from "@/components/input/select";
import { useDataStore } from "@/store/data";
import { router } from "expo-router";

const schema = z.object({
    gender: z.string().min(1, { message: "O sexo é obrigatorio" }),
    level: z
        .string()
        .min(1, { message: "O nivel de atividade física é obrigatorio" }),
    objective: z.string().min(1, { message: "O seu objetivo é obrigatório" }),
});

type FormData = z.infer<typeof schema>;

export default function Step() {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const setPageTwo = useDataStore((state) => state.setPageTwo);

    const genderOptions = [
        { label: "Masculino", value: "masculino" },
        { label: "Feminino", value: "feminino" },
    ];

    const levelOptions = [
        {
            label: "Sedentário (Pouco ou nenhuma atividade física)",
            value: "Sedentário",
        },
        {
            label: "Levemente ativo (exercícios 1 a 3 vezes por semana)",
            value: "Levemente ativo (exercícios 1 a 3 vezes por semana)",
        },
        {
            label: "Moderadamente ativo (exercícios 3 a 5 vezes por semana)",
            value: "Moderadamente ativo (exercícios 3 a 5 vezes por semana)",
        },
        {
            label: "Altamente ativo (exercícios 5 a 7 vezes por semana)",
            value: "Altamente ativo (exercícios 5 a 7 vezes por semana)",
        },
    ];

    const objectiveOptions = [
        {
            label: "Emagrecer",
            value: "emagrecer",
        },
        {
            label: "Hipertrofia",
            value: "Hipertrofia",
        },
        {
            label: "Hipertrofia + definição",
            value: "Hipertrofia e definição",
        },
        {
            label: "Definição",
            value: "definição",
        },
    ];

    function handleCreate(data: FormData) {
        setPageTwo({
            gender: data.gender,
            level: data.level,
            objective: data.objective,
        });

        router.push("/nutrition");
    }

    return (
        <View style={styles.container}>
            <Header step="Passo 2" title="Finalizando dieta" />

            <ScrollView style={styles.content}>
                <Text style={styles.label}>Sexo:</Text>
                <Select
                    placeholder="Selecione seu sexo..."
                    name="gender"
                    control={control}
                    error={errors.gender?.message}
                    options={genderOptions}
                />

                <Text style={styles.label}>
                    Selecione nível de atividade física:
                </Text>
                <Select
                    placeholder="Selecione seu nível..."
                    name="level"
                    control={control}
                    error={errors.level?.message}
                    options={levelOptions}
                />

                <Text style={styles.label}>Selecione seu objetivo:</Text>
                <Select
                    placeholder="Selecione seu nível..."
                    name="objective"
                    control={control}
                    error={errors.objective?.message}
                    options={objectiveOptions}
                />

                <Pressable
                    style={styles.button}
                    onPress={handleSubmit(handleCreate)}
                >
                    <Text style={styles.buttonText}>Avançar</Text>
                </Pressable>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1,
    },
    content: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    label: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
    },
    button: {
        backgroundColor: colors.blue,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "bold",
    },
});
