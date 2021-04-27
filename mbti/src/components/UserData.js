import React, { useState } from 'react';

export default function UserData({submitName, submitPersonality, submittedName, submittedPersonality}) {
	const [name, setName] = useState(submittedName);
    const [personality, setPersonality] = useState(submittedPersonality);

    const handleSubmit = async e => {
        e.preventDefault();
        submitName(name);
        submitPersonality(personality);
    }

    return(
        <div className="login-wrapper">
            <h1><i>TypeDate</i></h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Current Name: {submittedName}</p>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </label>
                <label>
                    <p>Current Personality Type: {submittedPersonality}</p>
                    <input type="text" value={personality} onChange={e => setPersonality(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
