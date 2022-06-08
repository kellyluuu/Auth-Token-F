import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "../pages/Index";
import Show from "../pages/Show";
import CONFIG from "../config/index";
import SignupPage from "../pages/SignupPage"
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "../components/Protected-Route"
import { getToken } from '../services/tokenService';

export default function Main(props) {
  const [people, setPeople] = useState(null);

  const peopleAPI = `${CONFIG.DEV.URL}/people/`

  const getPeople = async () => {
    const data = await fetch(peopleAPI, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        // Add this header - don't forget the space after Bearer
        Authorization: "Bearer " + getToken(),
      }
    }).then((res) => res.json());
    setPeople(data);
  };

  const createPeople = async (person) => {
    await fetch(peopleAPI, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        // Add this header - don't forget the space after Bearer
        Authorization: "Bearer " + getToken(),
      },
      body: JSON.stringify(person),
    });
    getPeople();
  };

  const updatePeople = async (person, id) => {
    await fetch(peopleAPI + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Add this header - don't forget the space after Bearer
        Authorization: "Bearer " + getToken(),
      },
      body: JSON.stringify(person),
    });
    getPeople();
  };

  const deletePeople = async (id) => {
    await fetch(peopleAPI + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Add this header - don't forget the space after Bearer
        Authorization: "Bearer " + getToken(),
      }
    });
    getPeople();
  };

/* -------------------------------------------------------------------------- */
/*                      Disable eslint’s warning to solve                     */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                React Hook useEffect has a missing dependency               */
/* -------------------------------------------------------------------------- */
  
// useEffect(() => {
//   getUserDetail()
// }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(()=> {getPeople()},[]) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute user={props.user}>
              <Index people={people} 
              createPeople={createPeople} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/people/:id"
          element={
            <ProtectedRoute user={props.user}>
              <Show
                people={people}
                deletePeople={deletePeople}
                updatePeople={updatePeople}
              />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<SignupPage {...props} />} />
        <Route path="/login" element={<LoginPage {...props} />} />
      </Routes>
    </main>
  );
}