import React, {Component} from 'react';
import axios from "axios/index";
import Person from '../../models/Person';

class Content extends Component {

    state = {people: []};

    componentDidMount() {
        axios.get("https://example-nodejs-rest-api.herokuapp.com/people").then(response => {
            const people = response.data;
            const updatedPeople = people.map(persons => {
                return {
                    ...persons
                }
            });
            this.setState({people: updatedPeople});
        }).catch(err => {
            //console.log(err);
            this.setState({error: true});
        });
    }

    render() {

        let people = this.state.people.map(person => {
            return <Person key={person.id} id={person.id} firstname={person.firstname} lastname={person.lastname}/>;
        });

        return (
            <div>
                <h1 className="text-danger text-center">People</h1>
                <hr/>
                <div className="row">
                    <div className="col-md-9 col-md-offset-1">
                        <table className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                            </tr>
                            </thead>
                            <tbody>{people}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

}

export default Content;