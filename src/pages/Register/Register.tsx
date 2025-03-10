import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";

import IconPerson from "../../assets/icon/person.png";
import IconPassword from "../../assets/icon/password.png";

import { AuthLayout } from "../../layouts/AuthLayout/AuthLayout";
import { useAuthStore } from "../../store/useAuthStore";
import { Alert } from "../../components/Alert/Alert";
import { PasswordValid } from "../../utils/PasswordValid";
import { AlertEnum, AlertMessageEnum } from "../../enum/enum";

export const Register = () => {
    const navigate = useNavigate();
    const { registerUser, alert, setAlert } = useAuthStore();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleRegister = (event: React.FormEvent) => {
        event.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            setAlert(AlertMessageEnum.FIELDEMPTY, AlertEnum.ERROR);
            return;
        }

        if (password !== confirmPassword) {
            setAlert(AlertMessageEnum.PASSWORDNOTMATCH, AlertEnum.ERROR);
            return;
        }

        if (PasswordValid(password)) {
            setAlert(AlertMessageEnum.PASSWORDVALID, AlertEnum.ERROR);
            return;
        }

        const success = registerUser({ name, email, password });

        if (success) {
            setAlert(AlertMessageEnum.REGISTERSUCCESS, AlertEnum.SUCCESS);
            navigate("/");
        } else {
            setAlert(AlertMessageEnum.EMAILALREADYREGISTER, AlertEnum.ERROR);
        }
    };

    return (
        <AuthLayout>
            {alert && <Alert message={alert.message} type={alert.type} />}

            <form onSubmit={handleRegister}>
                <h1>Cadastro</h1>

                <Input
                    type="text"
                    name="name"
                    placeholder="Nome Completo"
                    icon={IconPerson}
                    value={name}
                    state={setName}
                />

                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    icon={IconPerson}
                    value={email}
                    state={setEmail}
                />

                <Input
                    type="password"
                    name="password"
                    placeholder="Senha"
                    icon={IconPassword}
                    value={password}
                    state={setPassword}
                />

                <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmação de Senha"
                    icon={IconPassword}
                    value={confirmPassword}
                    state={setConfirmPassword}
                />

                <Button btnType="submit" content="Cadastrar" />

                <hr />

                <p style={{ textAlign: "center" }}>
                    Caso já tenha cadastro, <Link to="/">clique aqui</Link>
                </p>
            </form>
        </AuthLayout>
    );
};