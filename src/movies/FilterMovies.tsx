import axios, { Axios, AxiosResponse } from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { urlGenres, urlMovies } from "../endpoints";
import { genreDTO } from "../genres/genres.module";
import Button from "../utilis/Button";
import Pagination from "../utilis/Pagination";
import { movieDTO } from "./movies.model";
import MoviesList from "./MoviesList";

export default function FilterMovies() {


    const initialValues: filterMoviesForm = {
        title: '',
        genreId: 0,
        upcomingReleases: false,
        inTheaters: false,
        page: 1,
        recordsPerPage: 10
    }

    const [genres, setGenres] = useState<genreDTO[]>([]);
    const [movies, setMovies] = useState<movieDTO[]>([]);
    const navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    const [totaleAmountOfPages, setTotaleAmountOfPages] = useState(0);

    useEffect(() => {
        axios.get(`${urlGenres}/all`)
            .then((response: AxiosResponse<genreDTO[]>) => {
                setGenres(response.data);
            });
    }, []);

    useEffect(() => {

        if (query.get('title')) initialValues.title = query.get('title')!;  // cast as not undefined
        if (query.get('genreId')) initialValues.genreId = parseInt(query.get('genreId')!, 10);  // cast as not undefined
        if (query.get('upcomingReleases')) initialValues.upcomingReleases = true;
        if (query.get('inTheaters')) initialValues.inTheaters = true;
        if (query.get('page')) initialValues.page = parseInt(query.get('page')!, 10);  // cast as not undefined

        searchMovies(initialValues);
    }, []);

    function searchMovies(values: filterMoviesForm) {
        modifyURL(values);
        axios.get(`${urlMovies}/filter`, { params: values })
            .then((response: AxiosResponse<movieDTO[]>) => {
                const records = parseInt(response.headers['totalamountofrecords']!, 10);
                setTotaleAmountOfPages(Math.ceil(records / values.recordsPerPage));
                setMovies(response.data);
            })
    }
    function modifyURL(values: filterMoviesForm) {
        // voglio mettere nell'url il dettaglio del filtro che applico
        const queryStrings: string[] = [];

        if (values.title) queryStrings.push(`title=${values.title}`);
        if (values.genreId != 0) queryStrings.push(`genreId=${values.genreId}`);
        if (values.upcomingReleases)
            queryStrings.push(`upcomingReleases=${values.upcomingReleases}`);
        if (values.inTheaters) queryStrings.push(`inTheaters=${values.inTheaters}`);

        queryStrings.push(`page=${values.page}`);
        navigate(`/movies/filter?${queryStrings.join('&')}`);
    }
    return (
        <>
            <h3>Filter Movies</h3>
            <Formik initialValues={initialValues}
                onSubmit={values => {
                    values.page = 1;
                    searchMovies(values);
                }}>
                {(formikProps) => (
                    <>

                        <Form>
                            <div className="row gx-3 align-items-center mb-3">
                                <div className="col-auto">
                                    <input type="text" className="form-control" id='title'
                                        placeholder="Title of the movie"
                                        {
                                        ...formikProps.getFieldProps("title") // integro alcune proprietà
                                        }

                                    />
                                </div>
                                <div className="col-auto">
                                    <select className="form-select"
                                        {...formikProps.getFieldProps("genreId")}
                                    >
                                        <option value="0">--Choose a genre--</option>
                                        {genres.map(genre =>
                                            <option
                                                key={genre.id}
                                                value={genre.id}
                                            >{genre.name}</option>)}
                                    </select>
                                </div>
                                <div className="col-auto">
                                    <div className="form-check">
                                        <Field className="form-check-input" id="upcomingReleases"
                                            name="upcomingReleases" type="checkbox" />
                                        <label className="form-check-label" htmlFor="upcomingReleases">
                                            Upcoming Releases</label>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <div className="form-check">
                                        <Field className="form-check-input" id="inTheaters"
                                            name="inTheaters" type="checkbox" />
                                        <label className="form-check-label" htmlFor="inTheaters">
                                            In Theaters</label>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <Button className="btn btn-primary"
                                        onClick={() => formikProps.submitForm()}
                                    >Filter</Button>
                                    <Button className="btn btn-danger ms-3"
                                        onClick={() => {
                                            formikProps.setValues(initialValues);
                                            searchMovies(initialValues);
                                        }}
                                    >Clear</Button>
                                </div>
                            </div>
                        </Form>

                        <MoviesList movies={movies} />
                        <Pagination
                            totalAmountOfPages={totaleAmountOfPages}
                            currentPage={formikProps.values.page}
                            onChange={newPage => {
                                formikProps.values.page = newPage;
                                searchMovies(formikProps.values);
                            }} />
                    </>
                )}
            </Formik>
        </>
    )
}

interface filterMoviesForm {
    title: string;
    genreId: number;
    upcomingReleases: boolean;
    inTheaters: boolean;
    page: number;
    recordsPerPage: number;
}


