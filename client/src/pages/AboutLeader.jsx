import React from 'react';

export default function AboutLeader() {
    const firstName = 'John';
    const lastName = 'Doe';
    const phoneNumber = '555-555-5555';
    const email = 'john.doe@example.com';
    const aboutMe = 'I am a passionate about teaching and leading youth in the community.';
    const headShot = 'https://via.placeholder.com/150';

    return (
        <div>
            <h1>About Leader</h1>
            <h2>{firstName} {lastName}</h2>
            <p><strong>Contact me at {phoneNumber} or {email}.</strong></p>
            <img src={headShot} alt={`${firstName} ${lastName}`} />
            <p>{aboutMe}</p>
        </div>
    );
};

