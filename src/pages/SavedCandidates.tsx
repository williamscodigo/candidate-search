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

  return (
    <>
      <h1>Potential Candidates</h1>
      {/* candidate table instead of list here - loop to display table row */}
      <table className="table">
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
      {Array.isArray(candidates) && candidates.length > 0 && candidates.map((candidate) => {
        return (
          <tr>
            <td className="image-center"><img src={candidate.avatar_url} alt={candidate.login + " avatar (image)"} /></td>
            <td>{candidate.login}</td>
            <td>{candidate.email}</td>
            <td>{candidate.company}</td>
            <td>{candidate.bio}</td>
            <td>delete candidate</td>
          </tr>
        )
      })
      }
      </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;
