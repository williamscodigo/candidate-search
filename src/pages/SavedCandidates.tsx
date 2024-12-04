import { useEffect, useState } from "react";
import User from "../interfaces/User";
import { getLocalData } from "../utils/localData";



const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<User[]>([]);

  useEffect(() => {
    //get data from local storage and set to usestate
    //check localStorage first
    const localData = getLocalData('candidates');
    localData.length !== 0 ? setCandidates(localData) : setCandidates([]);
  }, []) //will only run once when component mounts

  function handleSubmit(e: React.FormEvent<HTMLFormElement>, index: number) {
    e.preventDefault();

    //remove from state and update local storage
    const updatedCandidates = [...candidates];
    updatedCandidates.splice(index, 1);
    setCandidates(updatedCandidates);
    localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
  }

  return (
    <>
      <h1>Potential Candidates</h1>
      {candidates.length > 0 ? (<table className="table">
        <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Email</th>
          <th>Company</th>
          <th>Bio</th>
          <th>Reject</th>
        </tr>
        </thead>
        <tbody>
      {Array.isArray(candidates) && candidates.length > 0 && candidates.map((candidate, index) => {
        return (
          <tr key={index}>
            <td className="image-center"><img src={candidate.avatar_url} alt={candidate.login + " avatar (image)"} /></td>
            <td><a href={candidate.githubURL} target="_blank">{candidate.login}</a></td>
            <td>{candidate.email}</td>
            <td>{candidate.company}</td>
            <td>{candidate.bio}</td>
            <td><form onSubmit={(e) => handleSubmit(e, index)}>
          <button type='submit' className="minus-btn">-</button>
</form></td>
          </tr>
        )
      })
      }
      </tbody>
      </table>) : <p>No candidates saved</p>}
      
    </>
  );
};

export default SavedCandidates;
