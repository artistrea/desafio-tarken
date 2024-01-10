import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { useSessionContext } from "../contexts/sessionContext/use";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AxiosError } from "axios";

export function LoginPage({
  navigation,
}: NativeStackScreenProps<any, "Login">) {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  const { login, session, register } = useSessionContext();

  const [errors, setErrors] = useState<string[]>([]);

  const [isRegistering, setIsRegistering] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] =
    useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) navigation.replace("MyLibrary");
  }, [session, navigation]);

  function handleSubmit() {
    const sign = isRegistering ? register : login;

    sign(loginDetails).catch((err) => {
      if (err instanceof AxiosError) {
        switch (err.response?.status) {
          case undefined:
            alert(
              "Parece que você não está conseguindo se comunicar com o servidor. Verifique sua conexão de rede."
            );
            setErrors([]);
            break;
          case 400: // erros de validação do input
            setErrors((err.response?.data?.message as string[]) || []);
            break;
          case 401:
            alert("Email ou senha incorretos");
            setErrors([]);
            break;
          case 422:
            alert("Este email já está sendo utilizado");
            setErrors([]);
            break;
          default:
            break;
        }
      } else alert("Ocorreu um erro inesperado");

      setLoading(false);
    });
    setLoading(true);
  }

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        justifyContent: "center",
        minHeight: "100%",
        paddingHorizontal: 16,
      }}
    >
      <View>
        <TextInput
          disabled={loading}
          error={!!errors.find((e) => e.includes("email"))}
          label="Email"
          value={loginDetails.email}
          onChangeText={(email) => setLoginDetails((pr) => ({ ...pr, email }))}
        />
        <HelperText type="error">
          {errors.find((e) => e.includes("email"))}
        </HelperText>
      </View>
      <View>
        <TextInput
          right={
            <TextInput.Icon
              onPress={() => setIsPasswordVisible((v) => !v)}
              icon={isPasswordVisible ? "eye-off" : "eye"}
            />
          }
          autoCorrect={false}
          secureTextEntry={!isPasswordVisible}
          disabled={loading}
          error={!!errors.find((e) => e.includes("password"))}
          label="Password"
          value={loginDetails.password}
          onChangeText={(password) =>
            setLoginDetails((pr) => ({ ...pr, password }))
          }
        />
        <HelperText type="error">
          {errors.find(
            (e) =>
              e.includes("password") && !e.includes("password_confirmation")
          )}
        </HelperText>
      </View>
      {isRegistering && (
        <View>
          <TextInput
            right={
              <TextInput.Icon
                onPress={() => setIsPasswordConfirmationVisible((v) => !v)}
                icon={isPasswordConfirmationVisible ? "eye-off" : "eye"}
              />
            }
            autoCorrect={false}
            secureTextEntry={!isPasswordConfirmationVisible}
            disabled={loading}
            error={!!errors.find((e) => e.includes("password_confirmation"))}
            label="Password Confirmation"
            value={loginDetails.password_confirmation}
            onChangeText={(password_confirmation) =>
              setLoginDetails((pr) => ({ ...pr, password_confirmation }))
            }
          />
          <HelperText type="error">
            {errors.find((e) => e.includes("password_confirmation"))}
          </HelperText>
        </View>
      )}

      <Button
        disabled={loading}
        onPress={handleSubmit}
        loading={loading}
        uppercase
      >
        {isRegistering ? "Register" : "Login"}
      </Button>

      <TouchableOpacity
        style={{ display: "flex", alignItems: "center" }}
        onPress={() => setIsRegistering((r) => !r)}
      >
        <Text
          variant="bodySmall"
          style={{
            textDecorationStyle: "solid",
            textDecorationLine: "underline",
          }}
        >
          I{isRegistering ? " already " : " don't "}
          have an account
        </Text>
      </TouchableOpacity>
    </View>
  );
}
