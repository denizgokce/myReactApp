import React, {Component} from 'react';
import axios from "axios/index";

class CreateView extends Component {

    state = {
        firstname: '',
        lastname: ''
    };

    postDataHandler = () => {
        const data = {
            firstname: this.state.firstname,
            lastname: this.state.lastname
        };

        axios.post("https://example-nodejs-rest-api.herokuapp.com/people", data)
            .then(response => {
                console.log(response);
                alert("Successfully added!")
            }).catch(err => {
            //console.log(err);
        });

    };

    render() {
        return (
            <div>
                <h1 className="text-center text-danger">Add Person</h1>
                <br/>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="form-group">
                            <label className="inputPassword">First Name</label>
                            <input type="text" className="form-control input-lg" placeholder="Person First Name"
                                   value={this.state.firstname}
                                   onChange={(event) => this.setState({firstname: event.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label className="inputPassword">Last Name</label>
                            <input type="text" className="form-control input-lg" placeholder="Person Last Name"
                                   value={this.state.lastname}
                                   onChange={(event) => this.setState({lastname: event.target.value})}/>
                        </div>
                        <button className="btn btn-info form-control input-lg" onClick={this.postDataHandler}>Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateView;