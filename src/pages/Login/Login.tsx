import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../../components/Button/Button"
import { Input } from "../../components/Input/Input"

import IconPerson from "../../assets/icon/person.png";
import IconPassword from "../../assets/icon/password.png";

import { AuthLayout } from "../../layouts/AuthLayout/AuthLayout";

import { useAuthStore } from "../../store/useAuthStore";
import { Alert } from "../../components/Alert/Alert";

import { useMovieStore } from "../../store/useMovieStore";

import "./Login.css"

export const Login = () => {
    const navigate = useNavigate();

    const { loginUser, alert, setAlert } = useAuthStore();
    const { setPage } = useMovieStore();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const success = loginUser(email, password);

        if (success) {
            setPage(1);
            navigate("/dashboard");
        } else {
            setAlert("Email ou senha incorretos.", "error");
        }
    };

    return (
        <AuthLayout>
            {alert && <Alert message={alert.message} type={alert.type} />}

            <form onSubmit={handleSubmit}>
                <h1>Faça seu login</h1>

                <Input
                    type={"email"}
                    name={"email"}
                    placeholder={"Email"}
                    icon={IconPerson}
                    value={email}
                    state={setEmail}
                />

                <Input
                    type={"password"}
                    name={"password"}
                    placeholder={"Senha"}
                    icon={IconPassword}
                    value={password}
                    state={setPassword}
                />

                <Button btnType={"submit"} content="Entrar" />

                <hr />

                <p style={{ textAlign: "center" }}>Caso não tenha cadastro, <Link to={"/register"}>clique aqui</Link></p>
            </form>
        </AuthLayout>
    )
}