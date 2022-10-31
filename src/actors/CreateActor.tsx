import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlActors } from "../endpoints";
import DisplayErrors from "../utilis/DisplayErrors";
import { convertActorToFormData } from "../utilis/formDataUtils";
import ActorForm from "./ActorForm";
import { actorCreationDTO } from "./actors.model";

export default function CreateActor() {
    const [errors, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();

    async function create(actor: actorCreationDTO) {
        try {
            const formData = convertActorToFormData(actor);

            await axios({
                method: 'post',
                url: urlActors,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate('/actors');
        } catch (error) {
            if (error && error.response) {
                if (Array.isArray(error.response.data)) {
                    setErrors(error.response.data);
                } else {
                    setErrors(['An error has occurred']);
                }
            }
        }
    }


    return (
        <>
            <h3>Create Actor</h3>
            <DisplayErrors errors={errors} />
            <ActorForm model={{ name: '', dateOfBirth: undefined }}
                onSubmit={async values => await create(values)}
            />

        </>
    )
}