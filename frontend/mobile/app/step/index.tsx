import { Header } from "@/components/header";
import { colors } from "@/constants/colors";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { router } from "expo-router";
import { useDataStore } from "@/store/data";
import { Input } from "@/components/input/input";

const schema = z.object({
    name: z.string().min(1, { message: "O nome é obrigatorio" }),
    age: z.string().min(1, { message: "A idade é obrigatoria" }),
    height: z.string().min(1, { message: "A altura é obrigatoria" }),
    weight: z.string().min(1, { message: "O peso é obrigatorio" }),
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

    const setPageOne = useDataStore((state) => state.setPageOne);

    const handleCreate = (data: FormData) => {
        setPageOne({
            name: data.name,
            age: data.age,
            height: data.height,
            weight: data.weight,
        });

        router.push("/create");
    };

    return (
        <View style={styles.container}>
            <Header step="Passo 1" title="Vamos começar" />

            <ScrollView style={styles.content}>
                <Text style={styles.label}>Nome:</Text>
                <Input
                    placeholder="Seu nome"
                    name="name"
                    control={control}
                    error={errors.name?.message}
                    keyboardType="default"
                />

                <Text style={styles.label}>Seu peso atual:</Text>
                <Input
                    placeholder="Ex: 75"
                    name="weight"
                    control={control}
                    error={errors.weight?.message}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Altura:</Text>
                <Input
                    placeholder="Ex: 1,80"
                    name="height"
                    control={control}
                    error={errors.height?.message}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Idade:</Text>
                <Input
                    placeholder="Ex: 21"
                    name="age"
                    control={control}
                    error={errors.age?.message}
                    keyboardType="numeric"
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
