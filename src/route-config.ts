import RedirectToLandingPage from "./utilis/RedirectToLandingPage";
<<<<<<< HEAD
import Register from "./auth/Register";
import Login from "./auth/Login";
import IndexUsers from "./auth/IndexUsers";
import LandingPage from "./recipes/LandingPage";
import IndexIngredients from "./ingredients/IndexIngredients";
import CreateIngredient from "./ingredients/CreateIngredient";
import EditIngredient from "./ingredients/EditIngredient";

const routes = [
    { path: '/ingredients', component: IndexIngredients, isAdmin: false },
    { path: '/ingredients/create', component: CreateIngredient, isAdmin: false },
    { path: '/ingredients/edit/:id', component: EditIngredient, isAdmin: false },

=======
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

>>>>>>> f7af4adc2653c1c6dfec13f1ddd36b6f3725be86
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/users', component: IndexUsers },

    { path: '/', component: LandingPage },
    // if none of the prevoius routes catch the url bar =>
    { path: '*', component: RedirectToLandingPage }

]

export default routes;