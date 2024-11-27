import { useEffect, useState } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import CandidateCard from '../components/CandidateCard';
import RawGithubUser from '../interfaces/RawGithubUser';
import PlusForm from '../components/PlusForm';
import MinusForm from '../components/MinusForm';

interface User {
  avatar_url: string;
  login: string;
  location: string;
  email: string;
  company: string;
  bio: string;
}

const CandidateSearch = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await searchGithub();
      console.log('Data:', data);

      data.map(async (user: RawGithubUser) => {
        const rawUser = await searchGithubUser(user.login);
        const formattedUser = {
          avatar_url: rawUser.avatar_url,
          login: rawUser.login,
          location: rawUser.location,
          email: rawUser.email,
          company: rawUser.company,
          bio: rawUser.bio
        };
        setUsers((prev) => [...prev, formattedUser]);
      }); 
    };

    //fix this: add users to local storage if user already in local storage, don't fetch again
    fetchData();

  }
  , []);

  return (
    <section>
      <h1>Candidate Search</h1>
      {Array.isArray(users) && users.length !== 0 && <CandidateCard user={users[0]} />}
      <div className='forms-container'>
      <MinusForm />
        <PlusForm />
      </div>
    </section>
  )

};

export default CandidateSearch;
