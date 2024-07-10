import React, { useState } from 'react';

const SettingsPage = () => {
    const name = 'John Doe';
    const phone = '555-555-5555';
    const emailInput = 'john.doe@example.com';
    const headShot = 'https://via.placeholder.com/150';
    // State variables for form inputs
    const [fullName, setfullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    // Handle form input changes
    const handlefullNameChange = (e) => {
        setfullName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Extract first and last name from fullName
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];

    return (
            <div className="settings-content">
                <h1>Settings</h1>
                <div className="profilePicture">
                    <img src={headShot} alt={`${first} ${last}`} />
                </div>
                <div className="settings-page">
            <div className="sidebar">
                <button>My Profile</button>
                <button>My Groups</button>
                <button>Themes</button>
                <button>Upgrade Plans</button>
                <button>Logout</button>
            </div>
            <br />
                <form>
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            placeholder={name}
                            value={fullName}
                            onChange={handlefullNameChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder={emailInput}
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            value={phoneNumber}
                            placeholder={phone}
                            onChange={handlePhoneNumberChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="text"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <br />
                    <button type="submit">Save Changes</button>
                </form>
            </div>
        </div>
    );
};


export default SettingsPage;
