import RedirectToLandingPage from "./utilis/RedirectToLandingPage";
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

    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/users', component: IndexUsers },

    { path: '/', component: LandingPage },
    // if none of the prevoius routes catch the url bar =>
    { path: '*', component: RedirectToLandingPage }

]

export default routes;