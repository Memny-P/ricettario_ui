import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import DisplayErrors from "./DisplayErrors";
import { ErrorsAxiosHandler } from "./ErrorsHandler";
import Loading from "./Loading";

// <TCreation> : lavoro con i generics => passo il tipo oggetto come parametro
export default function EditEntity<TCreation, TRead>
    (props: editEntityProps<TCreation, TRead>) {

    const { id }: any = useParams();
    const [entity, setEntity] = useState<TCreation>();
    const [responseData, setResponseData] = useState<TRead>();
    const [errors, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        let url = props.urlEdit ? props.urlEdit : props.url;
        axios.get(`${url}/${id}`)
            .then((response: AxiosResponse<TRead>) => {
                setResponseData(response.data);
                setEntity(props.transform(response.data));
            });
    }, [id]);

    async function edit(entityToEdit: TCreation) {
        try {
            if (props.transformFormData) {
                // vuol dire che devo mandare al metodo del controller i dati in formato form
                const formData = props.transformFormData(entityToEdit);
                await axios({
                    method: 'put',
                    url: `${props.url}/${id}`,
                    data: formData,
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.put(`${props.url}/${id}`, entityToEdit);
            }
            navigate(props.indexURL);
        } catch (error) {
<<<<<<< HEAD
            setErrors(ErrorsAxiosHandler(error));
=======
            if (error && error.response)
                if (Array.isArray(error.response.data)) {
                    setErrors(error.response.data);
                } else {
                    setErrors(['An error has occurred']);
                }
>>>>>>> f7af4adc2653c1c6dfec13f1ddd36b6f3725be86
        }
    }

    return (
        <>
            <h3>Edit {props.entityName}</h3>
            <DisplayErrors errors={errors} />
            {entity ? props.children(entity, responseData, edit)    // form in in base all'entity, e così posso chiamare la funzione di edit dal parente
                : <Loading />}
        </>
    )
}

interface editEntityProps<TCreation, TRead> {
    url: string;
    urlEdit?: string;
    entityName: string;
    indexURL: string;
    transform(entity: TRead): TCreation;
    transformFormData?(model: TCreation): FormData;
<<<<<<< HEAD
    children(entity: TCreation, responseData: TRead | undefined, edit: (entity: TCreation) => void): ReactElement;
=======
    children(entity: TCreation, edit: (entity: TCreation) => void): ReactElement;
>>>>>>> f7af4adc2653c1c6dfec13f1ddd36b6f3725be86
}


EditEntity.defaultProps = {
    transform: (entity: any) => entity  // di solito uso una trasformazione semplice da un oggetto ad un altro senza cambiare i valori
}