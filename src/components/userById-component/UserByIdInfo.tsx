import { IUser } from "../../models/user/IUser.ts";
import "../../css/UserByIdInfo.css";

interface UserByIdInfoProps {
    user: IUser;
}

export const UserByIdInfo = ({ user }: UserByIdInfoProps) => {
    return (
        <div className="user-container">
            <h1 className="user-title">
                {user.firstName} {user.lastName}
            </h1>
            <img src={user.image} alt="User Avatar" className="user-avatar" />

            <div className="user-info">
                <p><span>Email:</span> {user.email}</p>
                <p><span>Phone:</span> {user.phone}</p>
                <p><span>Age:</span> {user.age}</p>
                <p><span>Gender:</span> {user.gender}</p>
                <p><span>Birth Date:</span> {user.birthDate}</p>
                <p><span>Blood Group:</span> {user.bloodGroup}</p>
                <p><span>Height:</span> {user.height} cm</p>
                <p><span>Weight:</span> {user.weight} kg</p>
                <p><span>Eye Color:</span> {user.eyeColor}</p>
                <p><span>Hair:</span> {user.hair.color} ({user.hair.type})</p>
                <p><span>University:</span> {user.university}</p>
                <p><span>Company:</span> {user.company.name} - {user.company.title}</p>
                <p><span>Address:</span> {user.address.address}, {user.address.city}, {user.address.country}</p>
            </div>
        </div>
    );
};
