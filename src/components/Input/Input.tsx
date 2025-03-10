import { ChangeEvent } from "react";
import searchIcon from "../../assets/icon/search.png"

import "./Input.css";

interface InputProps {
    type: string
    name: string
    label?: string
    placeholder: string
    icon?: string
    value: string
    state: (e: string) => void
    isClick?: boolean
    click?: VoidFunction
}

export const Input = ({
    type,
    name,
    label = "",
    placeholder,
    icon = "",
    value,
    state,
    isClick = false,
    click = () => { }
}: InputProps) => {
    return (
        <div className="bg-input">
            {label && <label htmlFor={label}>{label}</label>}

            <div style={{ position: "relative" }}>
                {icon && <img src={icon} alt={`icon-${placeholder}`} className="bg-input-icon" />}
                <input
                    id={name}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => state(e.target.value)}
                />
                {isClick &&
                    <button className="bg-btn-search" onClick={click}>
                        <img src={searchIcon} alt={`icon-search`} />
                    </button>
                }
            </div>
        </div>
    )
}