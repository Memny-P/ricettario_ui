import './App.css';
import Menu from './Menu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './route-config';
import configureValidation from './Validation';
import { useEffect, useState } from 'react';
import { claim } from './auth/auth.models';
import AuthenticationContext from './auth/AuthenticationContext';
import { getClaims } from './auth/handleJWT';
import configureInteceptor from './utilis/httpInterceptors';

configureValidation();  // preparo le validazioni custom
configureInteceptor();  // configuro l'interceptor per l'autenticazione

function App() {
  // è da qui che vogliamo distribuire le competenze del nostro user
  const [claims, setClaims] = useState<claim[]>([
    // { name: 'email', value: 'felipe@hotmail.com' },
    // { name: 'role', value: 'admin' }
  ]);
  useEffect(() => {
    setClaims(getClaims());
  }, [])
  function isAdmin() {
    return claims.findIndex(claim => claim.name === 'role' && claim.value === 'admin') > -1;
  }

  return (
    <BrowserRouter>
      {/* voglio fare in modo che se cambiano i claims si riaggiorni la ui */}
      <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
        <Menu />
        <div className='container'>
          <Routes>
            {routes.map(route =>
              <Route key={route.path} path={route.path}
                element={
                  // se il route is protected && se l'utente non è admin
                  route.isAdmin && !isAdmin() ?
                    <>You ar not allowed to see this page</> : <route.component />}>
              </Route>
            )}
          </Routes>
        </div>
        <footer className='bd-footer py-5 mt-5 bg-light'>
          <div className='container'>
            React Movie {new Date().getFullYear().toString()}
          </div>
        </footer>
      </AuthenticationContext.Provider >
    </BrowserRouter >
  );
}

export default App;
