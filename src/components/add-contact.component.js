import React, { Component } from "react";
import ContactDataService from "../services/contact.service";

export default class AddContact extends Component {
  constructor(props) {
    super(props);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangeAdr = this.onChangeAdr.bind(this);
    this.onChangeVille = this.onChangeVille.bind(this);
    this.onChangePays = this.onChangePays.bind(this);
    this.onChangetel = this.onChangetel.bind(this);
    //this.onChangedate = this.onChangedate.bind(this),
    this.saveContact = this.saveContact.bind(this);
    this.newContact = this.newContact.bind(this);

    this.state = {
      id: null,
      nom: "",
      adress: "",
      ville: "",
      pays: "",
      telephone: "",
      debut_contrat: new Date().toDateString(),
    };
  }

  onChangeNom(e) {
    this.setState({
      nom: e.target.value
    });
  }

  onChangeAdr(e) {
    this.setState({
      adress: e.target.value
    });
  }

  onChangeVille(e) {
    this.setState({
      ville: e.target.value
    });
  }

  onChangePays(e) {
    this.setState({
      pays: e.target.value
    });
  }

  onChangetel(e) {
    this.setState({
      telephone: e.target.value
    });
  }

  onChangedate(e) {
    this.setState({
      debut_contrat: e.target.value
    });
  }

  saveContact() {
    var data = {
      nom: this.state.nom,
      adress: this.state.adress,
      ville: this.state.ville,
      pays: this.state.pays,
      telephone: this.state.telephone,
      debut_contrat: this.state.debut_contrat
    };
    ContactDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          nom: response.data.nom,
          adress: response.data.adress,
          ville: response.data.ville,
          pays: response.data.pays,
          telephone: response.data.telephone,
          debut_contrat: response.data.debut_contrat
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newContact() {
    this.setState({
      id: null,
      nom: "",
      adress: "",
      ville: "",
      pays: "",
      telephone: "",
      debut_contrat: new Date().toDateString(),
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newContact}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="nom">Nom</label>
              <input
                type="text"
                className="form-control"
                id="nom"
                required
                value={this.state.nom}
                onChange={this.onChangeNom}
                name="nom"
              />
            </div>

            <div>
              <label htmlFor="adress">Adresse</label>
              <input type='text' className="form-control"
                id="adresse"
                required
                value={this.state.adress}
                onChange={this.onChangeAdr}
                name="nom" />
            </div>
            <div>
              <label htmlFor="ville">Ville</label>
              <input type='text' className="form-control"
                id="ville"
                required
                value={this.state.ville}
                onChange={this.onChangeVille}
                name="ville" />
            </div>
            <div>
              <label htmlFor="pays">Pays</label>
              <input type='text' className='form-control'
                id="pays"
                required
                value={this.state.pays}
                onChange={this.onChangePays}
                name="nom" />
            </div>
            <div>
              <label htmlFor="telephone">Telephone</label>
              <input type='text' className='form-control' id="telephone"
                required
                value={this.state.telephone}
                onChange={this.onChangetel}
                name="nom" />
            </div>
            <div>
              <label htmlFor="debut_contat">Debut contrat</label>
              <input type='date' className='form-control'
                id="debut_contrat"
                required
                //value={moment(item.data[j]).format("DD/MM/YYYY")}
                value={this.state.debut_contrat}
                onChange={this.onChangedate}
                name="nom" />
            </div>

            <button onClick={this.saveContact} className="btn btn-success">
              Confirmer
            </button>
          </div>
        )}
      </div>
    );
  }
}
