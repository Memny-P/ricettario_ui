// Non è un componente => ts e non tsx
import IndexGenres from "./genres/IndexGenres";
import CreateGenre from "./genres/CreateGenre";
import EditGenre from "./genres/EditGenre";
import LandingPage from "./movies/LandingPage";
import IndexActors from "./actors/IndexActors";
import CreateActor from "./actors/CreateActor";
import EditActor from "./actors/EditActor";
import CreateMovieTheaters from "./movietheaters/CreateMovieTheaters";
import IndexMovieTheaters from "./movietheaters/IndexMovieTheaters";
import EditMovieTheaters from "./movietheaters/EditMovieTheaters";
import CreateMovie from "./movies/CreateMovie";
import EditMovie from "./movies/EditMovie";
import FilterMovies from "./movies/FilterMovies";
import RedirectToLandingPage from "./utilis/RedirectToLandingPage";
import MovieDetails from "./movies/MovieDetails";
import Register from "./auth/Register";
import Login from "./auth/Login";
import IndexUsers from "./auth/IndexUsers";

const routes = [
    { path: '/genres', component: IndexGenres, isAdmin: true },
    { path: '/genres/create', component: CreateGenre, isAdmin: true },
    { path: '/genres/edit/:id', component: EditGenre, isAdmin: true },   // uso un parametro e pretendo che sia una cifra numerica

    { path: '/actors', component: IndexActors, isAdmin: true },
    { path: '/actors/create', component: CreateActor, isAdmin: true },
    { path: '/actors/edit/:id', component: EditActor, isAdmin: true },

    { path: '/movietheaters', component: IndexMovieTheaters, isAdmin: true },
    { path: '/movietheaters/create', component: CreateMovieTheaters, isAdmin: true },
    { path: '/movietheaters/edit/:id', component: EditMovieTheaters, isAdmin: true },

    { path: '/movies/filter', component: FilterMovies },
    { path: '/movies/create', component: CreateMovie, isAdmin: true },
    { path: '/movies/edit/:id', component: EditMovie, isAdmin: true },
    { path: '/movies/:id', component: MovieDetails },

    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/users', component: IndexUsers },

    { path: '/', component: LandingPage },
    // if none of the prevoius routes catch the url bar =>
    { path: '*', component: RedirectToLandingPage }

]

export default routes;