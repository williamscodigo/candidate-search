
import PlusForm from "./PlusForm";
import MinusForm from "./MinusForm";
import User from "../interfaces/User";

interface CandidateCardProps {
    user: User;
    onMinus: () => void;
    onPlus: () => void;
}

export default function CandidateCard({ user, onMinus, onPlus }: CandidateCardProps) {

    return (
        <>
    <div className="card">
        <img className="card-header" src={user.avatar_url} alt={user.login + "avatar"}/>
        <div className="card-body">
        <h2 className="">{user.login}</h2>
        <p><span>Location: </span>{user.location}</p>
        <p><span>Email: </span>{user.email}</p>
        <p><span>Company: </span>{user.company}</p>
        <p><span>Bio: </span> {user.bio}</p>
        </div>
    </div>
    <div className='forms-container'>
    <MinusForm onSubmit={onMinus} />
      <PlusForm onSubmit={onPlus} />
    </div>
    </>
    );
}