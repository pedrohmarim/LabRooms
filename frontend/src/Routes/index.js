import React, { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes as Switch } from 'react-router-dom';

const HomeComponent = lazy(() => import('../Pages/Home/home.component'));

const Routes = () => (
    <Router>
        <Suspense fallback={<p>CARREGANDO ...</p>}>
            <Switch>
                <Route path="/" element={<HomeComponent />} />
            </Switch>
        </Suspense>
    </Router>
)

export default Routes;