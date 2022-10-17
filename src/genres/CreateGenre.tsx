import Button from "../utilis/Button";
import { useNavigate } from "react-router-dom";

export default function CreateGenre() {
    const navigate = useNavigate();// v6 usa questo == const history = useHistory();

    return (
        <>
            <h3>Create Genre</h3>
            <Button onClick={() => {
                // .. Saving in db
                navigate('/genres');    // history.push('/genres');
            }}>Save changes</Button>
        </>
    )
}