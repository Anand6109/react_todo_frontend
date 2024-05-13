import React, { useContext } from 'react';
import { Context } from '../main';
import Loader from '../components/Loader';

const Profile = () => {
    const { isAuthenticated, loading, user } = useContext(Context);

    console.log(user); // Check the structure of the user object in the console

    return (
        loading ? <Loader /> : (
            <div>
                <h1>{user?.name}</h1>
                <p>{user?.email}</p>
            </div>
        )
    );
};

export default Profile;
