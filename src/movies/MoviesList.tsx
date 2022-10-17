import GenericList from "../utilis/GenericList";
import Loading from "../utilis/Loading";
import IndividualMovie from "./IndividualMovie";
import { movieDTO } from "./movies.model";
import css from './MoviesList.module.css';

export default function MoviesList(props: moviesListProps) {
    return <GenericList
        // posso passare elementi custom loadingUI={<>Loading..</>}
        list={props.movies}>
        <div className={css.div}>
            {props.movies?.map(movie =>
                <IndividualMovie {...movie} key={movie.id} />)}
        </div>
    </GenericList>
}

interface moviesListProps {
    movies?: movieDTO[];
}