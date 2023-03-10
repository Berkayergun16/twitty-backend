export default interface IPost {
    description: string;
    image?: string;
    user: object;
    likes?: string[];
    comments?: string[];
    createdAt: Date;
    updatedAt: Date;
}