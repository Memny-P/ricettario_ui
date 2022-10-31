import axios, { AxiosResponse } from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlAccounts } from "../endpoints";
import DisplayErrors from "../utilis/DisplayErrors";
import { authenticationResponse, userCredentials } from "./auth.models";
import AuthenticationContext from "./AuthenticationContext";
import AuthForm from "./AuthForm";
import { getClaims, saveToken } from "./handleJWT";

export default function Register() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<string[]>([]);
    const { update } = useContext(AuthenticationContext);

    async function register(credentials: userCredentials) {
        try {
            setErrors([]);
            const response = await axios
                .post<authenticationResponse>(`${urlAccounts}/create`, credentials);
            saveToken(response.data);
            update(getClaims());

            navigate('/');
        }
        catch (error) {
            if (error && error.response)
                if (Array.isArray(error.response.data)) {
                    setErrors(error.response.data);
                } else {
                    setErrors(['An error has occurred']);
                }
        }
    }
    return (<>
        <h3>Register</h3>
        <DisplayErrors errors={errors} />
        <AuthForm
            model={{ email: '', password: '' }}
            onSubmit={async values => await register(values)}
        />
    </>);
}