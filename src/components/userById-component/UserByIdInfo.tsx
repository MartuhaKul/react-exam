
import { IUser } from "../../models/user/IUser.ts";

interface UserByIdInfoProps {
    user: IUser;
}

export const UserByIdInfo= ({ user }:UserByIdInfoProps) => {
    return (
        <div className="user-info">
            <h1>{user.firstName} {user.lastName}</h1>
            <img src={user.image} alt="User Avatar" className="user-avatar" />
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Age:</strong> {user.age}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Birth Date:</strong> {user.birthDate}</p>
            <p><strong>Blood Group:</strong> {user.bloodGroup}</p>
            <p><strong>Height:</strong> {user.height} cm</p>
            <p><strong>Weight:</strong> {user.weight} kg</p>
            <p><strong>Eye Color:</strong> {user.eyeColor}</p>
            <p><strong>Hair:</strong> {user.hair.color} ({user.hair.type})</p>
            <p><strong>University:</strong> {user.university}</p>
            <p><strong>Company:</strong> {user.company.name} - {user.company.title}</p>
            <p><strong>Address:</strong> {user.address.address}, {user.address.city}, {user.address.country}</p>
        </div>
    );
};
