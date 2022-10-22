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

const routes = [
    { path: '/genres', component: IndexGenres },
    { path: '/genres/create', component: CreateGenre },
    { path: '/genres/edit/:id', component: EditGenre },   // uso un parametro e pretendo che sia una cifra numerica

    { path: '/actors', component: IndexActors },
    { path: '/actors/create', component: CreateActor },
    { path: '/actors/edit/:id', component: EditActor },

    { path: '/movietheaters', component: IndexMovieTheaters },
    { path: '/movietheaters/create', component: CreateMovieTheaters },
    { path: '/movietheaters/edit/:id', component: EditMovieTheaters },

    { path: '/movies/filter', component: FilterMovies },
    { path: '/movies/create', component: CreateMovie },
    { path: '/movies/edit/:id', component: EditMovie },

    { path: '/', component: LandingPage },
    // if none of the prevoius routes catch the url bar =>
    { path: '*', component: RedirectToLandingPage }

]

export default routes;