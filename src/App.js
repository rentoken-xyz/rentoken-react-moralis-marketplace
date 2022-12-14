import React from "react";
import { useMoralis, useChain } from "react-moralis";
import { Routes, Route } from "react-router-dom";

import { Header } from "./Header";
// import { Footer } from './Footer'
import { Home } from "./Home";
// import { Profile } from './Profile';=
import { NftDashboard } from "./NftDashboard";
import { Testing } from "./Testing";
import { Deployer } from "./Deployer";

/* @dev BUGS:
 * Metamask popup de-activated
 * Considering auto-update of Moralis and managing auto-update of other dependencies
 */

function App() {
    const { chain } = useChain();
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

    const [likedNfts, setLikedNfts] = React.useState(false);

    React.useEffect(() => {
        if (!isWeb3Enabled && isAuthenticated) {
            enableWeb3();
        }
    }, [isWeb3Enabled, isAuthenticated]);

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
                            account={account}
                            isWeb3Enabled={isWeb3Enabled}
                            enableWeb3={enableWeb3}
                            chain={chain}
                            isAuthenticated={isAuthenticated}
                            Moralis={Moralis}
                            authenticate={authenticate}
                        />
                    }
                />
                <Route
                    path="/Testing"
                    element={
                        isAuthenticated && !isAuthUndefined ? (
                            <Testing />
                        ) : (
                            <Home
                                account={account}
                                isWeb3Enabled={isWeb3Enabled}
                                enableWeb3={enableWeb3}
                                chain={chain}
                                isAuthenticated={isAuthenticated}
                                Moralis={Moralis}
                                authenticate={authenticate}
                            />
                        )
                    }
                />
                <Route
                    path="/Deployer"
                    element={
                        isAuthenticated && !isAuthUndefined ? (
                            <Deployer />
                        ) : (
                            <Home
                                account={account}
                                isWeb3Enabled={isWeb3Enabled}
                                enableWeb3={enableWeb3}
                                chain={chain}
                                isAuthenticated={isAuthenticated}
                                Moralis={Moralis}
                                authenticate={authenticate}
                            />
                        )
                    }
                />
                <Route
                    path="/NftDashboard"
                    element={
                        isAuthenticated && !isAuthUndefined ? (
                            <NftDashboard
                                account={account}
                                isWeb3Enabled={isWeb3Enabled}
                                enableWeb3={enableWeb3}
                                chain={chain}
                            />
                        ) : (
                            <Home
                                account={account}
                                isWeb3Enabled={isWeb3Enabled}
                                enableWeb3={enableWeb3}
                                chain={chain}
                                isAuthenticated={isAuthenticated}
                                Moralis={Moralis}
                                authenticate={authenticate}
                            />
                        )
                    }
                />
            </Routes>
            {/* <Footer /> */}
        </div>
    );
}

export default App;
