import { ReactElement, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { actorMovieDTO } from "../actors/actors.model";

export default function TypeAheadActors(props: typeAheadProps) {

    const actors: actorMovieDTO[] = [
        { id: 1, name: "Felipe", character: '', picture: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Tom_Holland_by_Gage_Skidmore.jpg' },
        { id: 2, name: "Beppe", character: '', picture: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Andrew_Garfield_by_Gage_Skidmore.jpg' },
        { id: 3, name: "jessica", character: '', picture: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Emma_Stone_at_Maniac_UK_premiere_%28cropped%29.jpg' },
    ]

    const selected: actorMovieDTO[] = [];

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
    return (<div className="mb-3">

        <label>{props.displayName}</label>
        <Typeahead
            id="typeahead"
            onChange={(options) => {
                if (options && options.length > 0) {

                    let actor = options[0] as actorMovieDTO;
                    if (props.actors.findIndex(x => x.id === actor.id) === -1)
                        props.onAdd([...props.actors, actor]);

                    console.log(actor);
                }
            }}
            options={actors}
            labelKey="name"
            filterBy={['name']}
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