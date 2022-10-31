import { ReactElement, useContext, useEffect, useState } from "react";
import AuthenticationContext from "./AuthenticationContext";

export default function Authorized(props: authorizedProps) {

    const [isAuthorized, setIsAuthorized] = useState(true);
    const { claims } = useContext(AuthenticationContext);

    useEffect(() => {
        if (props.role) {
            const index = claims
                .findIndex(claim => claim.name === 'role' && claim.value === props.role);

            setIsAuthorized(index > -1);
        } else {
            setIsAuthorized(claims.length > 0); // nella nostra app se ha almeno un claim vuol dire che è autorizzato
        }
    }, [claims, props.role]);    // se vengono cambiati i claims si ritriggera useeffect

    return (
        <>
            {isAuthorized ? props.authorized : props.notAuthorized}
        </>
    )
}
interface authorizedProps {
    // i due elementi che possono o vedere o non vedere in base a auth
    authorized: ReactElement;
    notAuthorized?: ReactElement;
    role?: string;
}