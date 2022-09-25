/* This example requires Tailwind CSS v2.0+ */

import logo from "./logo.png";
import { Link } from "react-router-dom";

let navigation = [];

export const Header = ({ authenticate, isAuthenticated, logout }) => {
    if (isAuthenticated) {
        navigation = [
            { name: "Home", href: "/" },
            { name: "NFT Dashboard", href: "/NftDashboard" },
            { name: "Deployer", href: "/Deployer" },
        ];
    } else {
        navigation = [
            { name: "Home", href: "/" },
            // { name: 'Lend NFTs', href: '#' },
        ];
    }

    return (
        <header className="sticky top-0 z-50 bg-white d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <a href="#">
                        <img className="h-10 w-auto" src={logo} alt="Logo" />
                    </a>
                    <div className="flex gap-20 justify-between">
                        {navigation.map((link) => (
                            <Link
                                to={link.href}
                                key={link.name}
                                className="no-underline text-base font-medium text-black hover:text-indigo-100"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div>
                        {isAuthenticated ? (
                            <div>
                                <button
                                    type="button"
                                    className="mr-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => logout()}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={() => authenticate()}
                            >
                                Authenticate
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
        // <div>
        //     <div className="mb-5">
        //         <header className="bg-indigo-500">
        //             <nav
        //                 className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        //                 aria-label="Top"
        //             >
        //                 <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
        //                     <div className="flex items-center">
        //                         <a href="#">
        //                             <img
        //                                 className="h-10 w-auto"
        //                                 src={logo}
        //                                 alt="Logo"
        //                             />
        //                         </a>
        // <div className="hidden ml-10 space-x-8 lg:block">
        //     {navigation.map((link) => (
        //         <Link
        //             to={link.href}
        //             key={link.name}
        //             className="text-base font-medium text-white hover:text-indigo-50"
        //         >
        //             {link.name}
        //         </Link>
        //     ))}
        // </div>
        //                     </div>
        //                     <div className="ml-10 space-x-4">
        //                         {isAuthenticated ? (
        //                             <div>
        //                                 <button
        //                                     type="button"
        //                                     className="mr-5 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        //                                     onClick={() => logout()}
        //                                 >
        //                                     Logout
        //                                 </button>

        //                                 <Link to="/profile" key="My Profile">
        //                                     {/* <Avatar
        //                                         username={
        //                                             user.attributes.username
        //                                         }
        //                                     /> */}
        //                                 </Link>
        //                             </div>
        //                         ) : (
        //                             <button
        //                                 type="button"
        //                                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        //                                 onClick={() => authenticate()}
        //                             >
        //                                 Authenticate
        //                             </button>
        //                         )}
        //                     </div>
        //                 </div>
        //                 <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
        //                     {navigation.map((link) => (
        //                         <a
        //                             key={link.name}
        //                             href={link.href}
        //                             className="text-base font-medium text-white hover:text-indigo-50"
        //                         >
        //                             {link.name}
        //                         </a>
        //                     ))}
        //                 </div>
        //             </nav>
        //         </header>
        //     </div>

        // </div>
    );
};
