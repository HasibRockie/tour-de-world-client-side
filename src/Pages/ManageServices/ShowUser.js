import useAuth from './../../Contexts/useAuth';

const ShowUser = (props) => {
    const { user } = props;
    
  
    return (
      <tr>
          
        
        <th className="user-display-name">{user?.user?.displayName}</th>
        <td>{user?.user?.email}</td>
        <td>{user?.cart?.length}</td>
        <td>{user?.orders?.length}</td>
        {user?.orders?.length ? (
          <td>
            <button>Pending</button>
          </td>
        ) : (
          <td>
            <button>No Order</button>
          </td>
        )}
        <td>
          <span><i className="fas fa-times-circle text-danger fa-2x"></i></span>
          <span><i className="fas fa-check-circle text-success  fa-2x"></i></span>
        </td>
      </tr>
    );
  };

  export default ShowUser;