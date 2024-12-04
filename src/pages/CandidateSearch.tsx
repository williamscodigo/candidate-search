import { useEffect, useState } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { useNavigate } from 'react-router-dom';
import CandidateCard from '../components/CandidateCard';
import RawGithubUser from '../interfaces/RawGithubUser';
import User from '../interfaces/User';
import { setLocalData, getLocalData, clearLocalData } from '../utils/localData';
import LoadingDots from '../components/LoadingDots';

const CandidateSearch = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true); // State for loading status

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true at the start of fetching

        // Fetch raw data from GitHub
        const data = await searchGithub();

        // Map over users and fetch detailed data - discard empty or invalid users
        const formattedUsers = await data.reduce(async (accPromise: Promise<User[]>, user: RawGithubUser) => {
          const acc = await accPromise;
          const rawUser = await searchGithubUser(user.login);

          // Skip invalid data
          if (rawUser && Object.keys(rawUser).length > 0) {
            acc.push({
              avatar_url: rawUser.avatar_url,
              login: rawUser.login,
              githubURL: rawUser.html_url,
              location: rawUser.location,
              email: rawUser.email,
              company: rawUser.company,
              bio: rawUser.bio,
            });
          }
          return acc;
        }, Promise.resolve([] as User[]));

        // Save data to local storage and state
        setLocalData('preCandidates', formattedUsers);
        setUsers(formattedUsers);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    // Check local storage for existing data
    const localData = getLocalData('preCandidates');
    if (localData && localData.length > 0) {
      setUsers(localData); // Use cached data
      setLoading(false); // No need to fetch, so set loading to false
    } else {
      fetchData(); // Fetch new data
    }
  }, []); // Empty dependency array ensures this runs only once

  const handlePlusUser = () => {
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
      {loading ? (
        <LoadingDots /> // Show loading dots while loading is true
      ) : (
        <>
          {users.length > 0 ? (
            <>
              <div className="view-status">{`${currentIndex + 1} / ${users.length}`}</div>

              <CandidateCard
                user={users[currentIndex]}
                onMinus={handleMinusUser}
                onPlus={handlePlusUser}
              />
            </>
          ) : (
            <div>No candidates available to review.</div>
          )}
        </>
      )}
    </section>
  );
};

export default CandidateSearch;
