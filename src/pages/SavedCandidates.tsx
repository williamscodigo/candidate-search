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
  }, []) //empty array this will run once when component loads

  return (
    <>
      <h1>Potential Candidates</h1>
      <ul>
      {Array.isArray(candidates) && candidates.length > 0 && candidates.map((candidate) => {
        return <li>{candidate.login}</li>
      })
      }
      </ul>
    </>
  );
};

export default SavedCandidates;
