
import User from "layouts/User.js";
import {
    
    Container,
    
  } from "reactstrap";
const Dashboard = () => {
    return ( 
        <Container>
            <h1 className="pt-5">Dashboard User</h1>
        </Container>
        
     );
}
 
Dashboard.layout = User;

export default Dashboard;