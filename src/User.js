import React, {Component} from 'react';

class Users extends Component {
    getUserByID = (id) => {
        this.props.deleteUser(id)
    }

    render(){
        const { users } = this.props;
        const userList = users.map(user => {
            return(
                <div className="user-content" key={user.id}>
                    <h1>Name: { user.name } </h1>
                    <h2>Age: { user.age } </h2>   
                    <h3>Sex: { user.sex } </h3> 
                    <button onClick={() => {this.getUserByID(user.id)}}>Delete</button>
                </div>
            )
        })
        return(
            <div className="user-list">
                { userList }
            </div>
            
        )
    }
}
export default Users