import {AlertSuccessAuthentification} from './alert-success-authentification';
import { useMoralis } from "react-moralis";


export const Home = () => {
    const { authenticate, isAuthenticated, user, logout, isAuthUndefined } = useMoralis();
    
    if (!isAuthenticated) {
        return(

          <div className="ml-5 mr-5">
              <h1><b>Home Page</b></h1>
              <div>
                <h1>Welcome to Rentoken Rental Marketplace.</h1>
                <br/><br/><br/>
                <p><b>Please register by clicking on the "Authenticate" button.</b></p>
              </div>
            </div>

        )
      }
      return (
        <div>
          <div className="ml-5 mr-5">
            <h1 className='font-bold text-5xl mb-10'>Home Page</h1>
            <div>
              <h1>Welcome to Rentoken Rental Marketplace.</h1>
              <p>Your username is {user.attributes.username}.</p>
            </div>
            <div>
              <AlertSuccessAuthentification
                title="Succesfully authentified !"
                message="Welcome to Rentoken Rental Marketplace."
              />
            </div>
          </div>
      </div>
      );
}