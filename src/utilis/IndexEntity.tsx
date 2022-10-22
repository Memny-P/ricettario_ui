import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { Link } from "react-router-dom";
import Button from "./Button";
import customConfirm from "./customConfirm";
import GenericList from "./GenericList";
import Pagination from "./Pagination";
import RecordsPerPageSelect from "./RecordsPerPageSelect";

export default function IndexEntity<T>(props: indexEntityProps<T>) {
    const [enities, setEntities] = useState<T[]>([]);
    const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [page, setPage] = useState(1);

    // quando entro qui voglio mandare una richiesta http alla mia api
    useEffect((() => {
        // uso effect per eseguire un'"azione" quando il componente è già creato
        loadData();
    }), [page, recordsPerPage]);  // viene eseguito quando cambia una di queste variabili


    function loadData() {
        axios.get(props.url, {
            params: { page, recordsPerPage }    // passo un oggetto come parametro del get ( paginationDTO )
        })
            .then((response: AxiosResponse<T[]>) => {
                if (response.headers && response.headers['totalamountofrecords']) {
                    // recupero dall'header ↓ 
                    const totalAmountOfRecords =
                        parseInt(response.headers['totalamountofrecords'], 10);

                    // calcolo il numero di pagine totali
                    setTotalAmountOfPages(Math.ceil(totalAmountOfRecords / recordsPerPage));
                }
                setEntities(response.data);
            })
    }

    async function deleteEntity(id: number) {

        try {
            await axios.delete(`${props.url}/${id}`);
            // .then(response => {
            //     // .. Eventuale feedback?
            // });
            loadData();
        } catch (error) {
            if (error && error.response) {
                console.error(error.response.data);
            }
        }
    }

    const buttons = (editUrl: string, id: number) => <>
        <Link className="btn btn-success" to={editUrl}>Edit</Link>
        <Button
            onClick={() => { customConfirm((() => deleteEntity(id))) }}
            className="btn btn-danger">Delete</Button>
    </>

    return (
        <>
            <h3>{props.title}</h3>
            <Link className="btn btn-primary" to={props.createUrl}
            >Create {props.entityName}</Link >

            <RecordsPerPageSelect onChange={recordsPerPage => {
                setPage(1);
                setRecordsPerPage(recordsPerPage);
            }} />

            <Pagination
                currentPage={page}
                totalAmountOfPages={totalAmountOfPages}
                onChange={newPage => setPage(newPage)} />

            <GenericList list={enities}>
                <table className="table table-striped">
                    { // ! == i know this i not undefined + buttons == parent ha accesso ai buttons
                        props.children(enities!, buttons)
                    }
                </table>
            </GenericList>
        </>
    )
}

interface indexEntityProps<T> {
    url: string;
    title: string;
    createUrl: string;
    entityName: string;
    children(enities: T[],
        buttons: (editUrl: string, id: number) => ReactElement): ReactElement;
}