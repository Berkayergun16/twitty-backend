export default interface IUser {
    _id?: string;
    name : string;
    username : string;
    email : string;
    password : string;
    createdAt: Date;
    profilePicture?: string;
    posts?: string[];
}

// Path: src\interfaces\IUser.ts