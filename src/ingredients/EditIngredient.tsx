import { urlIngredients } from "../endpoints";
import EditEntity from "../utilis/EditEntity";
import { convertIngredientToFormData } from "../utilis/formDataUtilis";
import { ingredientCreationDTO, ingredientDTO, ingredientEditDTO } from "./ingredient.model";
import IngredientForm from "./IngredientForm";

export default function EditIngredient() {
    function transform(ingredient: ingredientEditDTO): ingredientCreationDTO {
        return {
            name: ingredient.name,
            ingredientBaseId: ingredient.ingredientBase.id,
            measurementId: ingredient.measurement.id,
            pictureUrl: ingredient.pictureUrl,
        };
    }
    return (
        <>
            <EditEntity<ingredientCreationDTO, ingredientEditDTO>
                url={urlIngredients}
                urlEdit={`${urlIngredients}/edit`}
                indexURL="/ingredients"
                entityName="Ingredient"
                transformFormData={convertIngredientToFormData}
                transform={transform}
            >
                {(entity, responseData, edit) =>
                    <IngredientForm
                        model={entity}
                        initialIngredient={responseData}
                        onSubmit={async values => await edit(values)}
                    />}
            </EditEntity>
        </>
    )
}