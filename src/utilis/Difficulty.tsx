import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import AuthenticationContext from "../auth/AuthenticationContext";
import './Difficulty.css';

export default function Difficulty(props: ratingsProps) {

    // tanti elementi quanti maximumValue
    const [maximumValueArr, setMaximumValueArr] = useState<number[]>([]);
    const [selectedValue, setSelectedValue] = useState<number>(props.selectedValue);
    const { claims } = useContext(AuthenticationContext);

    useEffect(() => {
        // costruisco e riempo un'arry di zero => lo assegno
        setMaximumValueArr(Array(props.maximumValue).fill(0));

    }, [props.maximumValue]);

    function handleMouseOver(rate: number) {
        setSelectedValue(rate);
    }
    function handleClick(rate: number) {
        // Voglio far votare solo gli utenti autenticati
        const userIsLoggedIn = claims.length > 0;

        if (!userIsLoggedIn) {
            Swal.fire({
                title: 'Error',
                text: 'You need to login',
                icon: 'error'
            });
            return;
        }

        setSelectedValue(rate);
        props.onChange(rate);
    }

    return (<>
        {maximumValueArr.map((_, index) => <FontAwesomeIcon
            onMouseOver={() => handleMouseOver(index + 1)}
            onClick={() => handleClick(index + 1)}
            icon="star"
            key={index}
            className={`fa-lg pointer ${selectedValue >= index + 1 ? 'checked' : null}`}
        />)}
    </>);
}

interface ratingsProps {
    maximumValue: number;
    selectedValue: number;
    onChange(rate: number): void;   // voglioro reagire in caso di cambio di rating
}