import axios, { AxiosResponse } from "axios";
import { ReactElement, useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { actorDTO, actorMovieDTO } from "../actors/actors.model";
import { urlActors } from "../endpoints";

export default function TypeAheadActors(props: typeAheadProps) {

    const [actors, setActors] = useState<actorMovieDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSearch(query: string) {
        setIsLoading(true);

        axios.get(`${urlActors}/searchByName/${query}`)
            .then((response: AxiosResponse<actorMovieDTO[]>) => {
                setActors(response.data);
                setIsLoading(false);
            });
    };
    const selected: actorMovieDTO[] = [];
    // #region DRAGGABLE STUFFS
    const [draggedElement, setDraggedElement] = useState<actorMovieDTO | undefined>(undefined);

    function handleDragStart(actor: actorMovieDTO) {
        // metto actor nella variabile temporanea
        setDraggedElement(actor);
    }
    function handleDragOver(actor: actorMovieDTO) {
        // recupero la variabile temporanea 
        if (!draggedElement) return;

        if (actor.id !== draggedElement.id) {
            const draggedElementIndex = props.actors.findIndex(x => x.id === draggedElement.id);
            const actorIndex = props.actors.findIndex(x => x.id === actor.id);

            // Clono => swappo
            const actors_clone = [...props.actors];
            actors_clone[actorIndex] = draggedElement;
            actors_clone[draggedElementIndex] = actor;
            props.onAdd(actors_clone);    // TODO cambiare il nome della funzione
        }

        setDraggedElement(actor);
    }
    // #endregion
    return (<div className="mb-3">

        <label>{props.displayName}</label>
        <AsyncTypeahead
            id="typeahead"
            onChange={(options) => {
                if (options && options.length > 0) {

                    let actor = options[0] as actorMovieDTO;
                    if (props.actors.findIndex(x => x.id === actor.id) === -1) {
                        actor.character = '';
                        props.onAdd([...props.actors, actor]);
                    }

                }
            }}
            options={actors}
            labelKey="name"
            filterBy={() => true}   // comunico che il filtro è già applicato a livello della webapi
            isLoading={isLoading}
            onSearch={handleSearch} // consume API
            placeholder="Write the name of the actor..."
            minLength={1}
            flip={true}
            selected={selected}
            renderMenuItemChildren={
                actor => (
                    <>
                        <img alt="actor" src={(actor as actorMovieDTO).picture}
                            style={{
                                height: '64px',
                                width: '64px',
                                marginRight: '10px',
                            }} />
                        <span>{(actor as actorMovieDTO).name}</span>
                    </>
                )
            }
        />
        <ul className="list-group">
            {props.actors.map(actor =>
                <li key={actor.id}
                    className="list-group-item list-group-item-action"
                    draggable={true}
                    onDragStart={() => handleDragStart(actor)}
                    onDragOver={() => handleDragOver(actor)}
                >
                    {props.listUI(actor)}
                    <span className="badge badge-primary badge-pill pointer text-dark"
                        style={{ marginLeft: '0.5rem' }}
                        onClick={() => props.onRemove(actor)}>X</span>
                </li>)}
        </ul>
    </div>
    )
}

interface typeAheadProps {
    displayName: string;
    actors: actorMovieDTO[];
    // To parent
    onAdd(actors: actorMovieDTO[]): void;
    onRemove(actor: actorMovieDTO): void;
    listUI(actor: actorMovieDTO): ReactElement;
}