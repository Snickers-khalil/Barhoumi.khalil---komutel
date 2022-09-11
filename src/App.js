import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import ContactsList from "./components/contacts-list.component";
import Contact from "./components/contact.component";
import AddContact from "./components/add-contact.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/contacts"} className="navbar-brand">
            Komutel Test
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/contacts"} className="nav-link">
                Contacts
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Ajouter
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/contacts"]} component={ContactsList} />
            <Route exact path="/add" component={AddContact} />
            <Route path="/contacts/:id" component={Contact} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
