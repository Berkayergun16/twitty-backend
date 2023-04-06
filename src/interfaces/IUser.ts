export default interface IUser {
    name : string;
    username : string;
    email : string;
    password : string;
    createdAt: Date;
    profilePicture?: string;
    posts?: any;
    followers?: any;
    following?: any;
}

// Path: src\interfaces\IUser.ts