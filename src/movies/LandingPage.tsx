import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { urlMovies } from "../endpoints";
import AlertContext from "../utilis/AlertContext";
import { landingPageDTO, movieDTO } from "./movies.model";
import MoviesList from "./MoviesList";

export default function LandingPage() {
    // useState pre gestire aggiornamento della pagina
    const [movies, setMovies] = useState<landingPageDTO>({})

    useEffect(() => {
        loadData();
    }, []);

    function loadData() {
        axios.get(`${urlMovies}`)
            .then((response: AxiosResponse<landingPageDTO>) => {
                setMovies(response.data);
            });
    }
    return (
        <AlertContext.Provider value={() => {
            // questa è la funzione che viene usata nell'individual component
            loadData(); // => ricarico la landing ogni volta che nell'individual viene triggerato il delete
        }}>
            <h2>In Theaters</h2>
            <MoviesList movies={movies.inTheaters} />
            <h3>Upcoming Releases</h3>
            <MoviesList movies={movies.upcomingReleases} />
        </AlertContext.Provider>
    )
}