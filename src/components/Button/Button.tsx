import "./Button.css";

interface ButtonProps {
    btnType?: "submit" | "button" | "reset";
    content: string;
    isClick?: boolean;
    click?: VoidFunction;
}

export const Button = ({ 
    btnType = "button", 
    content,
    isClick = false,
    click 
}: ButtonProps) => {
    const handleClick = isClick ? click : undefined;

    return (
        <button type={btnType} className="btn" onClick={handleClick}>
            {content}
        </button>
    );
}
