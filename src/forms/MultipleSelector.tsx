import './MultipleSelector.css';

export default function MultipleSelector(props: multipleSelectorProps) {

    // funzione per gestire la selezione del singolo elemento
    function select(item: multipleSelectorModel) {
        const selected = [...props.selected, item];
        const nonSelected = props.nonSelected.filter(val => val !== item);
        props.onChange(selected, nonSelected);
    }
    function deselect(item: multipleSelectorModel) {
        const selected = props.selected.filter(val => val !== item);
        const nonSelected = [...props.nonSelected, item];
        props.onChange(selected, nonSelected);
    }

    function selectAll() {
        const selected = [...props.selected, ...props.nonSelected];
        const nonSelected: multipleSelectorModel[] = [];
        props.onChange(selected, nonSelected);
    }
    function deselectAll() {
        const selected: multipleSelectorModel[] = [];
        const nonSelected = [...props.selected, ...props.nonSelected];
        props.onChange(selected, nonSelected);
    }
    return (
        <div className="mb-3">
            <label>{props.displayName}</label>
            <div className="multiple-selector">
                <ul>
                    {props.nonSelected.map(item =>
                        <li key={item.key} onClick={() => select(item)}>{item.value}</li>)}
                </ul>
                <div className="multiple-selector-buttons">
                    <button type="button" onClick={selectAll}>{'>>'}</button>
                    <button type="button" onClick={deselectAll}>{'<<'}</button>
                </div>
                <ul>
                    {props.selected.map(item =>
                        <li key={item.key} onClick={() => deselect(item)}>{item.value}</li>)}
                </ul>
            </div>
        </div>
    )
}

interface multipleSelectorProps {
    displayName: string;
    selected: multipleSelectorModel[];    // selected item
    nonSelected: multipleSelectorModel[];
    onChange(selected: multipleSelectorModel[],
        nonSelected: multipleSelectorModel[]): void;
}

export interface multipleSelectorModel {
    key: number;
    value: string;
}