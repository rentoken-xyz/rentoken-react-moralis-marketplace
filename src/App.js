import React from 'react';
import { useMoralis } from "react-moralis";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

import { Header } from './Header'
import { Footer } from './Footer'
import { Home } from './Home';
import { Profile } from './Profile';
import { NFT_Dashboard } from './NFT_Dashboard';
import { Cards } from './Cards';



/* @dev BUGS: 
  * Metamask popup de-activated
  * Considering auto-update of Moralis and managing auto-update of other dependencies
*/

function App() {
  const { authenticate, isAuthenticated, user, logout, isAuthUndefined } = useMoralis();

  return(
    <div>
      <Header />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/NFT_Dashboard" element={ isAuthenticated && !isAuthUndefined ? <NFT_Dashboard /> : <Home /> } />
        <Route path="/profile" element={ isAuthenticated && !isAuthUndefined ? <Profile /> : <Home /> } />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
