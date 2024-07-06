import {FormikForm} from "@/src/components/form/FormikForm"
import {CredentialsInput, credentialsInputSchema, signIn} from "@/src/lib/auth";
import {FormikText} from "@/src/components/form/FormikText";
import {Button, Form, YStack} from "tamagui";
import {router} from "expo-router";
import {useState} from "react";
import {ActivityIndicator, Text} from "react-native";
import {useAuthentication} from "@/src/hooks/useAuthentication";


export const LoginForm = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const {session} = useAuthentication()
    console.log({session})
    const handleLogin = async (credentials: CredentialsInput) => {
        setLoading(true)
        console.log("got credentials " + credentials)
        await signIn(credentials)
            .then(result => {
                console.log({result})
                if (result.data.session) router.push("/")
            })
            .catch(console.log)
        setLoading(false)
    }

    return (
        <FormikForm
            title="Sign in"
            onSubmit={handleLogin}
            initialValues={{email: "rthomlinson03@gmail.com", password: "SpringTest1!"}}
            schema={credentialsInputSchema}>
            <YStack gap="$2">
                <FormikText name="email" placeholder="Email address"/>
                <FormikText name="password" placeholder="Password"/>
                <Form.Trigger asChild>
                    <Button disabled={loading}>
                        Submit
                        {loading && <ActivityIndicator />}
                    </Button>
                </Form.Trigger>
            </YStack>
        </FormikForm>
    )
}