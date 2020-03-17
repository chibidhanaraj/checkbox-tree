import React, {Component} from 'react';

class UserForm extends Component{
    state = {
        name: null,
        age: null,
        sex: null
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addUser(this.state);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" onChange={this.handleChange}/> 
                    <label htmlFor="name">Age: </label>
                    <input type="text" id="age" onChange={this.handleChange}/>
                    <label htmlFor="name">Sex: </label>
                    <input type="text" id="sex" onChange={this.handleChange}/>
                    <input type="submit" />
                </form>
            </div>
        )
    } 
}

export default UserForm;