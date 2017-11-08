import React from 'react';

const AdminUsers = (props) => {

  const users = props.users;

  return (
    <div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Is Admin?</th>
          <th>Make Admin</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {
          users &&
          users.map((user, idx) => {
             return (
              <tr key={idx}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                {user.isAdmin ? <td><button disabled onClick={() => { props.promote(user.id)}}>Promote</button></td> : <td><button onClick={() => { props.promote(user.id)}}>Promote</button></td>}
                <td><button onClick={() =>{props.remove(user.id)}}>&times;</button></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
    </div>)
}

export default AdminUsers;
