import { Navigate } from "react-router-dom";//, Redirect 

export default function RedirectToLandingPage() {
    return <Navigate replace to={{ pathname: '/' }} />
}