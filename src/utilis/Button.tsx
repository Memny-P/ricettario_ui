export default function Button(props: buttonProps) {
    return <button
        type={props.type}
        disabled={props.disabled}
        className={props.className}
        onClick={props.onClick}
    >{props.children}</button>
}

interface buttonProps {
    children: React.ReactNode;
    onClick?(): void;   // rendo optional l'onclick
    type: "button" | "submit";
    disabled: boolean;
    className: string;
}

// Per dichiarare delle proprietà di base
Button.defaultProps = {
    type: "button",
    disabled: false,
    className: "btn btn-primary"
}