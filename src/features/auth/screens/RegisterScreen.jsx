import {
    View,
    Text,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity
} from "react-native"
import { useState } from "react"
import { Eye, EyeOff } from 'lucide-react-native';

import { useForm, Controller } from "react-hook-form"
import { COLORS, SPACING, FONT_SIZE } from "../../../shared/constants/theme"
import Input from "../../../shared/components/Input"
import Button from "../../../shared/components/Button"
import { useAuth } from "../hooks/useAuth"

import kinalSportsLogo from "../../../../assets/kinal_sports.png"

const RegisterScreen = ({navigation}) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const { handleRegister, loading } = useAuth()
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            lastName: "",
            user: "",
            email: "",
            password: "",
            phone: "",
        },
    })

 
    const onSubmit = async (data) => {
        try {
            await handleRegister(data)

            Alert.alert(
                "Registro exitoso",
                "Tu cuenta ha sido creada. Ahora puedes iniciar sesion"
                [{ text: "ok", onPress: () => navigation.navigate("Login")}]
            )
        } catch (error) {
            console.error(error)
            const message = error.response?.data?.message || "Error al registrarse"
            Alert.alert("Error", message)
        }
    }
    
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Image
                        source={kinalSportsLogo}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
 
                <View>
                    <Controller
                        control={control}
                        rules={{ required: "Nombre requerido" }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Nombre"
                                placeholder="Tu Nombre"
                                onChangeText={onChange}
                                value={value}
                                autoCapitalize="none"
                                error={errors.name?.message}
                            />
                        )}
                        name="name"
                    />

                    <Controller
                        control={control}
                        rules={{ required: "Apellido requerido" }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Apellido"
                                placeholder="Tu Apellido"
                                onChangeText={onChange}
                                value={value}
                                autoCapitalize="none"
                                error={errors.lastName?.message}
                            />
                        )}
                        name="lastName"
                    />

                    <Controller
                        control={control}
                        rules={{ required: "Usuario requerido" }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Usuario"
                                placeholder="Tu nombre de usuario"
                                onChangeText={onChange}
                                value={value}
                                autoCapitalize="none"
                                error={errors.user?.message}
                            />
                        )}
                        name="user"
                    />

                    <Controller
                        control={control}
                        rules={{ required: "Email requerido" }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Email"
                                placeholder="correo@ejemplo.com"
                                onChangeText={onChange}
                                value={value}
                                autoCapitalize="none"
                                error={errors.email?.message}
                            />
                        )}
                        name="email"
                    />

                    <Controller
                        control={control}
                        rules={{ required: "Número de teléfono requerido" }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Teléfono"
                                placeholder="1234-5678"
                                onChangeText={onChange}
                                value={value}
                                autoCapitalize="none"
                                error={errors.phone?.message}
                            />
                        )}
                        name="phone"
                    />
 
                    <Controller
                        control={control}
                        rules={{ required: "Contraseña requerida" }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Contraseña"
                                placeholder="••••••••"
                                secureTextEntry={!isPasswordVisible}
                                onChangeText={onChange}
                                value={value}
                                autoCapitalize="none"
                                error={errors.password?.message}
                                rightIcon={
                                    <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                        {isPasswordVisible ? (
                                            <Eye size={22} color="gray" />
                                        ) : (
                                            <EyeOff size={22} color="gray" />
                                        )}
                                    </TouchableOpacity>
                                }
                            />
                        )}
                        name="password"
                    />
 
                    <Button
                        title="Registrarse"
                        onPress={handleSubmit(onSubmit)}
                        style={styles.button}                    
                    />
 
                    <View style={styles.footer}>
                        <Text sytle={styles.footerText}>¿Ya tienes una cuenta?</Text>
                        <Text
                            style={styles.link}
                            onPress={() => navigation.navigate("Login")}
                        >
                            Iniciar Sesión
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        flexGrow: 1,
        padding: SPACING.xl,
        justifyContent: "center",
    },
    header: {
        alignItems: "center",
        marginBottom: SPACING.xxl,
    },
    logo: {
        height: 80,
        width: 200,
        marginBottom: SPACING.sm,
    },
    subtitle: {
        fontSize: FONT_SIZE.lg,
        color: COLORS.secondary,
        marginTop: SPACING.sm,
    },
    form: {
        width: "100%",
    },
    button: {
        marginTop: SPACING.lg,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: SPACING.xl,
    },
    footerText: {
        fontSize: FONT_SIZE.md,
        color: COLORS.textLight,
    },
    link: {
        fontSize: FONT_SIZE.md,
        color: COLORS.primary,
        fontWeight: "700",
    },
});

export default RegisterScreen;