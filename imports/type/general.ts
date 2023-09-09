export interface IUserProfile extends Meteor.UserProfile {
    name: string;
    image?: string;
}