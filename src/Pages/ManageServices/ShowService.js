import useAuth from './../../Contexts/useAuth';

const ShowService = (props) => {
    const { service } = props;
    
  
    return (
      <tr>
          
        
        <th className="user-display-name">{service.title}</th>
        
        <td>{service.duration}</td>
        <td>${service.price}</td>
        
        <td>
          <span><i className="fas fa-times-circle text-danger fa-2x"></i></span>
          
        </td>
      </tr>
    );
  };

  export default ShowService;