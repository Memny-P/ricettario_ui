import { urlIngredients } from "../endpoints";
import IndexEntity from "../utilis/IndexEntity";
import { ingredientDTO } from "./ingredient.model";

export default function IndexGenres() {
    return (
        <>
            <IndexEntity<ingredientDTO>
                url={urlIngredients}
                createUrl="/ingredients/create"
                title="Ingredient"
                entityName="ingredient"
            >
                {(ingredients, buttons) =>
                    <>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ingredients.map(ingredient =>
                                <tr key={ingredient.id}>
                                    <td>
                                        {buttons(`/ingredients/edit/${ingredient.id}`, ingredient.id)}
                                    </td>
                                    <td>
                                        {ingredient.name}
                                    </td>
                                </tr>)}
                        </tbody>
                    </>

                }
            </IndexEntity>
        </>
    )
}