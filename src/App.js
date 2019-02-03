import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CreateProject from './components/projects/CreateProject'
import ProjectDetails from './components/projects/ProjectDetails'
import Profile from './components/profile/Profile'
import EditProfile from './components/profile/EditProfile'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/createproject' component={CreateProject} />
            <Route path='/projectdetails/:id' component={ProjectDetails} />
            <Route path='/profile' component={Profile} />
            <Route path='/editprofile' component={EditProfile} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
