import firebase from 'firebase';

export interface IOrder {
    id: string;
    name: string;
    desc: string;
    price: number;
    tags: string[];
    deadline: Date;
    status: "standby" | "in_progress" | "done";

    owner: firebase.storage.Reference;
    assignedMentor: firebase.storage.Reference | null;
    dateAdded: Date;
}
