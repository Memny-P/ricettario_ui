import { useFormikContext } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import { stepDTO, stepRecipeCreationDTO } from "../steps/step.model";

export default function StepsField(props: stepsFieldForm) {
    const EMPTY_STEP: stepRecipeCreationDTO = {
        id: 1,
        description: "",
        order: 1,
        time: 0
    }
    const [steps, setSteps] = useState<stepRecipeCreationDTO[]>([]);

    useEffect(() => {
        let startingSteps = props.steps ? props.steps : [];
        if (startingSteps.length == 0) {
            startingSteps.push(EMPTY_STEP)
        }

        setSteps(startingSteps);
    }, []);

    const { values } = useFormikContext<any>();
    // #region DRAGGABLE STUFFS
    const [draggedElement, setDraggedElement] = useState<stepRecipeCreationDTO | undefined>(undefined);

    function handleDragStart(step: stepRecipeCreationDTO) {
        // metto actor nella variabile temporanea
        setDraggedElement(step);
    }
    function handleDragOver(step: stepRecipeCreationDTO) {
        // recupero la variabile temporanea 
        if (!draggedElement) return;

        if (step.id !== draggedElement.id) {
            const draggedElementIndex = steps.findIndex(x => x.id === draggedElement.id);
            const stepIndex = steps.findIndex(x => x.id === step.id);

            // Clono => swappo
            const steps_clone = [...steps];
            steps_clone[stepIndex] = draggedElement;
            steps_clone[draggedElementIndex] = step;

            values[props.field] = steps_clone
        }

        setDraggedElement(step);
    }
    // #endregion
    function handleChangeDescription(e: ChangeEvent, step: stepRecipeCreationDTO): void {
        let value = e.currentTarget.nodeValue;
        step.description = value ?? EMPTY_STEP.description;

    }
    function handleChangeTime(e: ChangeEvent, step: stepRecipeCreationDTO): void {
        let value = e.currentTarget.nodeValue;
        step.time = value ? Number.parseInt(value) : EMPTY_STEP.time;
    }
    return (
        <div className="mb-3">
            <label htmlFor="mesaurement">{props.displayName}</label>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Order #</th>
                        <th>Description</th>
                        <th>Time (seconds)</th>
                    </tr>
                </thead>
                <tbody >
                    {steps.map((step, i) =>
                        <tr key={step.id}
                            // className="list-group-item list-group-item-action"
                            draggable={true}
                            onDragStart={() => handleDragStart(step)}
                            onDragOver={() => handleDragOver(step)}
                        >
                            <td>
                                <span>{i + 1}</span>
                            </td>
                            <td>
                                <input type='text' value={step.description} onChange={e => handleChangeDescription(e, step)} />
                            </td>
                            <td>
                                <input type='number' value={step.time} onChange={e => handleChangeTime(e, step)} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

interface stepsFieldForm {
    displayName: string;
    field: string;
    steps?: stepRecipeCreationDTO[];
}