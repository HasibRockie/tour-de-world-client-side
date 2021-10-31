import useAuth from './../../Contexts/useAuth';

const ShowService = (props) => {
    const { service } = props;
    const {services, setServices} = useAuth()
    
        // detele Service
        const handleDeleteService = id => {
          const proceed = window.confirm('Are you sure, you want to delete?');
          if (proceed) {
              const url = `https://tour-de-world-private-limited.herokuapp.com/services/${id}`;
              fetch(url, {
                  method: 'DELETE'
              })
                  .then(res => res.json())
                  .then(data => {
                      if (data.deletedCount > 0) {
                          alert('deleted successfully');
                          const remainingServices = services.filter(service => service._id !== id);
                          setServices(remainingServices);
                      }
                  });
          }
      }
  
    return (
      <tr>
          
        
        <th className="user-display-name">{service.title}</th>
        
        <td>{service.duration}</td>
        <td>${service.price}</td>
        
        <td>
          <span onClick={() => handleDeleteService(service._id)}><i className="fas fa-times-circle text-danger fa-2x"></i></span>
          
        </td>
      </tr>
    );
  };

  export default ShowService;