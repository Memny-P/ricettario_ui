import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import DisplayErrors from "./DisplayErrors";
import Loading from "./Loading";

// <TCreation> : lavoro con i generics => passo il tipo oggetto come parametro
export default function EditEntity<TCreation, TRead>
    (props: editEntityProps<TCreation, TRead>) {

    const { id }: any = useParams();
    const [entity, setEntity] = useState<TCreation>();
    const [errors, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${props.url}/${id}`)
            .then((response: AxiosResponse<TRead>) => {
                setEntity(props.transform(response.data));
            });
    }, [id]);

    async function edit(entityToEdit: TCreation) {
        try {
            await axios.put(`${props.url}/${id}`, entityToEdit)
                .then(() => {
                    navigate(props.indexURL);
                });
        } catch (error) {
            if (error && error.response)
                setErrors(error.response);
        }
    }

    return (
        <>
            <h3>Edit {props.entityName}</h3>
            <DisplayErrors errors={errors} />
            {entity ? props.children(entity, edit)    // form in in base all'entity, e così posso chiamare la funzione di edit dal parente
                : <Loading />}
        </>
    )
}

interface editEntityProps<TCreation, TRead> {
    url: string;
    entityName: string;
    indexURL: string;
    transform(entity: TRead): TCreation;
    children(entity: TCreation, edit: (entity: TCreation) => void): ReactElement;
}


EditEntity.defaultProps = {
    transform: (entity: any) => entity  // di solito uso una trasformazione semplice da un oggetto ad un altro senza cambiare i valori
}