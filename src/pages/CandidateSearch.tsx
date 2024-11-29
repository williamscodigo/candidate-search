import { useEffect, useState } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { useNavigate } from 'react-router-dom';
import CandidateCard from '../components/CandidateCard';
import RawGithubUser from '../interfaces/RawGithubUser';
import User from '../interfaces/User';
import { setLocalData, getLocalData, clearLocalData } from '../utils/localData';

const CandidateSearch = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    //this might not be the wanted behavior - erase candidates from local storage when component loads!!!
    //note: can be handled in a different way when adding candidates to local storage in handlePlusUser - check readme for more info
    clearLocalData('candidates');

    const fetchData = async () => {
      try {
        // First, fetch raw data from GitHub
        const data = await searchGithub();

        // Map over users and fetch detailed data - discard empty or invalid users
        const formattedUsers = await data.reduce(async (accPromise: Promise<User[]>, user: RawGithubUser) => {
          const acc = await accPromise; // Await the accumulated users array
          const rawUser = await searchGithubUser(user.login);
        
          // Skip invalid data
          if (rawUser && Object.keys(rawUser).length > 0) {
            acc.push({
              avatar_url: rawUser.avatar_url,
              login: rawUser.login,
              location: rawUser.location,
              email: rawUser.email,
              company: rawUser.company,
              bio: rawUser.bio,
            });
          }
        
          return acc;
        }, Promise.resolve([] as User[])); // Ensure initial accumulator is an empty array of type User[]
        
        

        // Save data to local storage and state
        setLocalData('preCandidates', formattedUsers);
        setUsers(formattedUsers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Check local storage for existing data
    const localData = getLocalData('preCandidates');
    if (localData && localData.length > 0) {
      setUsers(localData); // Use cached data
    } else {
      fetchData(); // Fetch new data
    }
  }, []); // Empty dependency array ensures this runs only once

  // Handlers for PlusForm and MinusForm
  const handlePlusUser = () => {
    //add user to candidates array in local storage
    const candidates = [...getLocalData('candidates'), users[currentIndex]];
    setLocalData('candidates', candidates);

    if (currentIndex === users.length - 1) {
      clearLocalData('preCandidates');
      navigate('/SavedCandidates');
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleMinusUser = () => {
    if (currentIndex === users.length - 1) {
      clearLocalData('preCandidates');
      navigate('/SavedCandidates');
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <section>
    <h1>Candidate Search</h1>
    {users.length > 0 && (
      <>
        {/* Display current index out of total users */}
        <div className="view-status">
          {`${currentIndex + 1} / ${users.length}`}
        </div>

        <CandidateCard
          user={users[currentIndex]}
          onMinus={handleMinusUser}
          onPlus={handlePlusUser}
        />
      </>
    )}
  </section>
  );
};

export default CandidateSearch;
