import React, {Component} from 'react';
import axios from "axios/index";
import SmallPerson from "../../models/SmallPerson";

class UpdateView extends Component {

    state = {
        people: [],
        firstname: '',
        lastname: '',
        id: '',
        selectedPerson: {id: "", firstname: "", lastname: ""}
    };

    componentDidMount() {
        axios.get("https://example-nodejs-rest-api.herokuapp.com/people").then(response => {
            const people = response.data;
            const updatedPeople = people.map(persons => {
                return {
                    ...persons
                }
            });
            this.setState({
                people: updatedPeople,
                selectedPerson: Object(updatedPeople[0])
            });
        }).catch(err => {
            //console.log(err);
            this.setState({error: true});
        });
    }

    putDataHandler = () => {
        const data = {
            id: this.state.selectedPerson.id,
            firstname: this.state.selectedPerson.firstname,
            lastname: this.state.selectedPerson.lastname
        };

        axios.put("https://example-nodejs-rest-api.herokuapp.com/people", data)
            .then(response => {
                alert("Successfully updated!")
            }).catch(err => {
            //console.log(err);
        });
    };

    handleClick = (id) => {
        let person = this.state.people.find((person) => {
            return person.id === id;
        });
        this.setState({selectedPerson: Object(person)});
    };

    changeFirstname(event) {
        const person = this.state.selectedPerson;
        person.firstname = event.target.value;
        this.setState({selectedPerson: person});
    }

    changeLastname(event) {
        const person = this.state.selectedPerson;
        person.lastname = event.target.value;
        this.setState({selectedPerson: person});
    }

    render() {
        let people = this.state.people.map((person) => {
            return <SmallPerson key={person.id} id={person.id} firstname={person.firstname}
                                lastname={person.lastname} onClick={this.handleClick.bind(this)}/>;
        });
        return (
            <div>
                <h1 className="text-center text-danger" xmlns={"http://www.w3.org/1999/html"}>
                    Edit Person
                </h1>
                <br/>
                <div className="row">
                    <div className="col-md-3">
                        <h3 className="text-danger">Select Person</h3>
                        <hr/>
                        <div className="dropdown">
                            <button className="btn btn-default dropdown-toggle" type="button" id="peopleDropdown"
                                    data-toggle="dropdown">
                                {this.state.selectedPerson.firstname + "  " + this.state.selectedPerson.lastname + " "}
                                <span className="caret"/>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="peopleDropdown">
                                {people}
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="form-group">
                            <label className="inputEmail">ID</label>
                            <input type="text" className="form-control input-lg"
                                   placeholder="Person ID" disabled value={this.state.selectedPerson.id}/>
                        </div>
                        <div className="form-group">
                            <label className="inputPassword">First Name</label>
                            <input type="text" className="form-control input-lg"
                                   placeholder="Person First Name"
                                   value={this.state.selectedPerson.firstname}
                                   onChange={this.changeFirstname.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label className="inputPassword">Last Name</label>
                            <input type="text" className="form-control input-lg"
                                   placeholder="Person Last Name"
                                   value={this.state.selectedPerson.lastname}
                                   onChange={this.changeLastname.bind(this)}/>
                        </div>
                        <button className="btn btn-info form-control input-lg" onClick={this.putDataHandler}>Update
                        </button>
                    </div>
                </div>
            </div>

        );
    }

}

export default UpdateView;