import React, { Component } from "react";
import TutorialDataService from "../services/contact.service";
import { Link } from "react-router-dom";

export default class ContactsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveContrats = this.retrieveContrats.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllContrats = this.removeAllContrats.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      contats: [],
      currentContrat: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveContrats();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveContrats() {
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          contats: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveContrats();
    this.setState({
      currentContrat: null,
      currentIndex: -1
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentContrat: tutorial,
      currentIndex: index
    });
  }

  removeAllContrats() {
    TutorialDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentContrat: null,
      currentIndex: -1
    });

    TutorialDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          contats: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { contats, currentContrat, currentIndex } = this.state;
 
    return (
      <div className="list row">
        {/* <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div> */}
        <div className="col-md-6">
          <h4>Contacts List</h4>
          <ul className="list-group">
            {contats &&
              contats.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.nom}
                </li>
              ))}
          </ul>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllContrats}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentContrat ? (
            <div>
              <h4>COntact</h4>
              <div>
                <label>
                  <strong>Nom:</strong>
                </label>{" "}
                {currentContrat.nom}
              </div>
              <div>
                <label>
                  <strong>Adresse:</strong>
                </label>{" "}
                {currentContrat.adress}
              </div>
              <div>
                <label>
                  <strong>Ville:</strong>
                </label>{" "}
                {currentContrat.ville}
              </div>
              <div>
                <label>
                  <strong>pays:</strong>
                </label>{" "}
                {currentContrat.pays}
              </div>
              <div>
                <label>
                  <strong>telephone:</strong>
                </label>{" "}
                {currentContrat.telephone}
              </div>
              <div>
                <label>
                  <strong>Date contrat:</strong>
                </label>{" "}
                {currentContrat.debut_contrat}
              </div>
              <Link
                to={"/contacts/" + currentContrat.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br/>
              <p>Clicker sur un contact...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
