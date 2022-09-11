import React, { Component } from "react";
import ContactDataService from "../services/contact.service";

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangeAdresse = this.onChangeAdresse.bind(this);
    this.onChangeVille = this.onChangeVille.bind(this);
    this.onChangePays = this.onChangePays.bind(this);
    this.onChangetel = this.onChangetel.bind(this);
    this.onChangedate = this.onChangedate.bind(this);
    this.getContact = this.getContact.bind(this);
    this.updateContact = this.updateContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);

    this.state = {
      currentContact: {
        id: null,
        nom: "",
        adress: "",
        ville: "",
        pays: "",
        telephone: "",
        debut_contrat: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getContact(this.props.match.params.id);
  }

  onChangeNom(e) {
    const nom = e.target.value;

    this.setState(function (prevState) {
      return {
        currentContact: {
          ...prevState.currentContact,
          nom: nom
        }
      };
    });
  }

  onChangeAdresse(e) {
    const adress = e.target.value;

    this.setState(prevState => ({
      currentContact: {
        ...prevState.currentContact,
        adress: adress
      }
    }));
  }
  onChangeVille(e) {
    const ville = e.target.value;

    this.setState(prevState => ({
      currentContact: {
        ...prevState.currentContact,
        ville: ville
      }
    }));
  }
  onChangePays(e) {
    const pays = e.target.value;

    this.setState(prevState => ({
      currentContact: {
        ...prevState.currentContact,
        pays: pays
      }
    }));
  }
  onChangetel(e) {
    const telephone = e.target.value;

    this.setState(prevState => ({
      currentContact: {
        ...prevState.currentContact,
        telephone: telephone
      }
    }));
  }
  onChangedate(e) {
    const debut_contat = e.target.value;

    this.setState(prevState => ({
      currentContact: {
        ...prevState.currentContact,
        debut_contat: debut_contat
      }
    }));
  }

  getContact(id) {
    ContactDataService.get(id)
      .then(response => {
        this.setState({
          currentContact: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  updateContact() {
    ContactDataService.update(
      this.state.currentContact.id,
      this.state.currentContact
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The tutorial was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteContact() {
    ContactDataService.delete(this.state.currentContact.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/contacts')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentContact } = this.state;

    return (
      <div>
        {currentContact ? (
          <div className="edit-form">
            <h4>Contact</h4>
            <form>
              <div className="form-group">
                <label htmlFor="nom">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  id="nom"
                  value={currentContact.nom}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="adress">Adresse</label>
                <input
                  type="text"
                  className="form-control"
                  id="adress"
                  value={currentContact.adress}
                  onChange={this.onChangeAdresse}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ville">Ville</label>
                <input
                  type="text"
                  className="form-control"
                  id="ville"
                  value={currentContact.ville}
                  onChange={this.onChangeVille}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pays">Ville</label>
                <input
                  type="text"
                  className="form-control"
                  id="pays"
                  value={currentContact.pays}
                  onChange={this.onChangePays}
                />
              </div>
              <div className="form-group">
                <label htmlFor="telephone">Telephone</label>
                <input
                  type="text"
                  className="form-control"
                  id="telephone"
                  value={currentContact.telephone}
                  onChange={this.onChangetel}
                />
              </div>

            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteContact}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateContact}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}
