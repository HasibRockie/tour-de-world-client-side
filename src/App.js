import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Signin from './Pages/Signin/Signin';
import AuthProvider from './Contexts/AuthProvider';
import Services from './Pages/Services/Services';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import ManageServices from './Pages/ManageServices/ManageServices';
import SingleService from './Pages/SingleService/SingleService';
import Footer from './Components/Footer/Footer';
import Profile from './Pages/Profile/Profile';
import PublicRoute from './PublicRoute/PublicRoute';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter>
      <Header></Header>
      <Switch>
        <Route exact path='/'>
          <Home></Home>
        </Route>
        <Route exact path='/home'>
          <Home></Home>
        </Route>
        <PublicRoute exact path='/login'>
          <Signin></Signin>
        </PublicRoute>
        <Route exact path='/services'>
          <Services></Services>
        </Route>
        <PrivateRoute exact path='/profile'>
          <Profile></Profile>
        </PrivateRoute>
        <Route exact path='/services/:service'>
          <SingleService></SingleService>
        </Route>
        <PrivateRoute exact path='/manage'>
          <ManageServices></ManageServices>
        </PrivateRoute>
      </Switch>
      <Footer></Footer>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
