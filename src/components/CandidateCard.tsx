interface User {
    avatar_url: string;
    login: string;
    location: string;
    email: string;
    company: string;
    bio: string;
}

export default function CandidateCard({ user }: { user: User }) {

    return (
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
    );
}