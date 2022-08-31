import React from "react";
import { useMoralis } from "react-moralis";
import { Routes, Route } from "react-router-dom";

import { Header } from "./Header";
// import { Footer } from './Footer'
import { Home } from "./Home";
// import { Profile } from './Profile';=
import { NFT_Dashboard } from "./NFT_Dashboard";
import { ComboboxComponent } from "./ComboboxComponent";

/* @dev BUGS:
 * Metamask popup de-activated
 * Considering auto-update of Moralis and managing auto-update of other dependencies
 */

function App() {
    const {
        Moralis,
        authenticate,
        isAuthenticated,
        user,
        logout,
        isAuthUndefined,
        account,
        isWeb3Enabled,
        enableWeb3,
    } = useMoralis();

    return (
        <div>
            <Header
                authenticate={authenticate}
                isAuthenticated={isAuthenticated}
                user={user}
                logout={logout}
                enableWeb3={enableWeb3}
            />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            isAuthenticated={isAuthenticated}
                            Moralis={Moralis}
                        />
                    }
                />
                <Route
                    path="/NFT_Dashboard"
                    element={
                        isAuthenticated && !isAuthUndefined ? (
                            <NFT_Dashboard
                                account={account}
                                isWeb3Enabled={isWeb3Enabled}
                                enableWeb3={enableWeb3}
                                Moralis={Moralis}
                            />
                        ) : (
                            <Home
                                isAuthenticated={isAuthenticated}
                                Moralis={Moralis}
                            />
                        )
                    }
                />
                <Route
                    path="/ComboboxComponent"
                    element={<ComboboxComponent />}
                />
            </Routes>
            {/* <Footer /> */}
        </div>
    );
}

export default App;
