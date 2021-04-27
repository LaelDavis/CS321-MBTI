import React, { useState } from 'react';
import './App.css';
//import {BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Person from './components/Person';
import Lonely from './components/Lonely';
import data from './data.json';
import * as Pages from './components/Pages';
import UserData from './components/UserData';

//import Dashboard from './components/Dashboard/Dashboard';
//import Preferences from './components/Preferences/Preferences';

import Login from './components/Login/Login';

const App = () => {
	const [people, setPeople] = useState(data);
	const [likedUsers, setLikedUsers] = useState([]);
	const [superLikedUsers, setSuperLikedUsers] = useState([]);
	const [dislikedUsers, setDislikedUsers] = useState([]);
	const [currentPage, setCurrentPage] = useState(Pages.MAIN_PAGE);
	const [submittedName, submitName] = useState("");
    const [submittedPersonality, submitPersonality] = useState("");
	const activeUser = 0;
	
	//const token = getToken();
	const [token, setToken] = useState();

	if(!token) {
		return <Login setToken={setToken} />
	}

	const removedPersonFromDataSrc = (peopleSource, userId) =>
		peopleSource.filter(user => user.id !== userId);

	const modifySuperficialChoices = (userId, action) => {
	const newPeople = [...people];
	const newLikedUsers = [...likedUsers];
	const newSuperLikedUsers = [...superLikedUsers];
	const newDislikedUsers = [...dislikedUsers];

	switch (action) {
		case 'ADD_TO_LIKED_USERS':
			if (!people[activeUser].likedUsers.includes(userId)) {
				newPeople[activeUser].likedUsers.push(userId);
				newLikedUsers.push(data[userId]);

				setLikedUsers(newLikedUsers);
				setPeople(removedPersonFromDataSrc(people, userId));
			}
			break;
		case 'ADD_TO_DISLIKED_USERS':
			if (!people[activeUser].dislikedUsers.includes(userId)) {
				newPeople[activeUser].dislikedUsers.push(userId);
				newDislikedUsers.push(data[userId]);

				setDislikedUsers(newLikedUsers);
				setPeople(removedPersonFromDataSrc(people, userId));
			}
			break;
		case 'ADD_TO_SUPERLIKED_USERS':
			if (!people[activeUser].superLikedUsers.includes(userId)) {
				newPeople[activeUser].superLikedUsers.push(userId);
				newSuperLikedUsers.push(data[userId]);

				setSuperLikedUsers(newSuperLikedUsers);
				setPeople(removedPersonFromDataSrc(people, userId));
			}
			break;
		default:
			return people;
	}

	};

	if(currentPage === Pages.USER_DATA_PAGE) {
		return (
		<div className="parentClass">
		<div className="app">
			<Header 
				setCurrentPage={setCurrentPage}
				page={Pages.MAIN_PAGE}
			/>
			<UserData
				submitName={submitName}
				submitPersonality={submitPersonality}
				submittedName={submittedName}
				submittedPersonality={submittedPersonality}
			/>
		</div>
		</div>
		);
	}
	else if(people[1]) {
		return (
		<div className="parentClass">
		<div className="app">
			<Header 
				setCurrentPage={setCurrentPage}
				page={Pages.USER_DATA_PAGE}
			/>
			<Person
				key={people[1].id}
				person={people[1]}
				modifySuperficialChoices={modifySuperficialChoices}
				likedUsers={likedUsers}
			/>
		</div>
		</div>
		);
	}
	else {
		return (
		<div className="parentClass">
		<div className="app">
			<Header 
				setCurrentPage={setCurrentPage}
				page={Pages.USER_DATA_PAGE}
			/>
			<Lonely
			  activeUserImage={people[activeUser].image}
			  likedUsers={likedUsers}
			  superLikedUsers={superLikedUsers}
			/>
		</div>
		</div>
		);
	}
};

export default App;
