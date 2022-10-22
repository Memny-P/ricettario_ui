import MovieTheaterForm from "./MovieTheaterForm";

export default function EditMovieTheaters() {
    return (
        <>
            <h3>Edit MovieTheaters</h3>
            <MovieTheaterForm
                model={{ name: 'Sambil', latitude: 45.532860494717674, longitude: 9.313530921936037 }}
                onSubmit={values => console.log(values)} />
        </>
    )
}