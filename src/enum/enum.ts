export enum AlertEnum {
    ERROR = "error",
    SUCCESS = "success"
}

export enum AlertMessageEnum {
    PASSWORDVALID = "A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.",
    PASSWORDINCORRET = "Email ou senha incorretos.",
    PASSWORDNOTMATCH = "As senhas não coincidem.",
    EMAILALREADYREGISTER = "Este e-mail já está cadastrado.",
    REGISTERSUCCESS = "Cadastro realizado com sucesso!",
    FIELDEMPTY = "Por favor, preencha todos os campos."
}

export enum AuthEnum {
    USERS = "users",
    LOGGEDUSER = "loggedUser"
}