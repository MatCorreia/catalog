import "./Alert.css"

interface AlertProps {
    message: string
    type: "success" | "error";
}

export const Alert = ({
    message,
    type
}: AlertProps) => {
    return (
        <div className={`bg-alert bg-alert-${type}`}>
            {message}
        </div>
    )
}