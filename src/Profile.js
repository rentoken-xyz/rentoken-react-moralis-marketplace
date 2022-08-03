import { useState } from "react"
import { useMoralis } from "react-moralis"
import { AlertError } from './alert-error'

export const Profile = () => {
    const { user, setUserData, userError, isUserUpdating } = useMoralis();
    
    const [username, setUsername] = useState(user.attributes.username);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSave = () => {
        setUserData ({
            username,
            email : email === "" ? undefined : email,
            password : password === "" ? undefined : password
        })
    }

    return (
    <div className="ml-5 mr-5">
        <h1 className='font-bold text-5xl mb-10'>Profile page</h1>
        { userError && <AlertError title="Failed to update user info" message={userError.message} /> }
        <div className="bg-blue-100 mb-7">
        <h3 className="font-bold">Your current creds:</h3>
        <p>Your username is: {user.attributes.username}</p>
        { (user.attributes.email === undefined) ? <p>You haven't saved any email address yet.</p> : <p>Your email is: {user.attributes.email}</p>}
        { (user.attributes.password === undefined) ? <p>You haven't saved any password yet.</p> : <p>Your password is: {user.attributes.password}</p>}
        </div>

        <div className="mb-7">
            <p className="font-bold">Username</p>
            <input 
                value={username} 
                onChange={(event) => setUsername(event.currentTarget.value)}
                className="bg-gray-100 w-1/2"
            />
        </div>
        <div className="mb-7">
            <p className="font-bold">email</p>
            <input 
                value={email} 
                onChange={(event) => setEmail(event.currentTarget.value)}
                className="bg-gray-100 w-1/2"
            />
        </div>
        <div className="mb-7">
            <p className="font-bold">Password</p>
            <input 
                value={password} 
                onChange={(event) => setPassword(event.currentTarget.value)}
                className="bg-gray-100 w-1/2"
            />
        </div>

        <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => handleSave()}
            >Save changes</button>
    </div>
    )
}