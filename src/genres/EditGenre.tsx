import { urlGenres } from "../endpoints";
import EditEntity from "../utilis/EditEntity";
import GenreForm from "./GenreForm";
import { genreCreationDTO, genreDTO } from "./genres.module";

export default function EditGenre() {

    return (
        <>
            <EditEntity<genreCreationDTO, genreDTO>
                entityName="Genre"
                url={urlGenres}
                indexURL='/genres'
            >
                {(entity, edit) =>
                    <GenreForm
                        model={entity}
                        onSubmit={async value => {
                            await edit(value);
                        }}
                    />
                }
            </EditEntity>
        </>
    )
}