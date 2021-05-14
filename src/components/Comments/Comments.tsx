import firebase from 'firebase';
import React, { useEffect, useState } from 'react';

export type CommentJSON = {
    uid: string;
    senderUID: string;
    senderUsername: string;
    date: Date;
    message: string;
}

export class CommentData {
    uid: string;
    senderUID: string;
    senderUsername: string;
    date: Date;
    message: string;

    constructor(uid: string, senderUID: string, senderUsername: string, date: Date, message: string) {
        this.uid = uid;
        this.senderUID = senderUID;
        this.senderUsername = senderUsername;
        this.date = date;
        this.message = message;
    }

    static retrieveFromFirestore(userUID: string) {
        return firebase.firestore().collection("users").doc(userUID).get().then(doc => {
            return doc.data()?.comments?.map((json: CommentJSON) => new CommentData(json.uid, json.senderUID, json.senderUsername, json.date, json.message)) ?? [];
        });
    }

    get jsx() {
        return (
            <div className="comment">
                <div>Comment by {this.senderUsername} @ {this.date}</div>
                <div>{this.message}</div>
            </div>
        );
    }
}

export default function CommentList(props: { targetUID: string }) {
    const [comments, setComments] = useState<CommentData[]>([]);
    const { targetUID } = props;

    useEffect(() => {
        if (!targetUID) {
            return () => { };
        }
        CommentData.retrieveFromFirestore(targetUID).then(setComments);
    }, [targetUID]);

    return (
        <div {...props}>
            {comments.map(comment => comment.jsx)}
        </div>
    )
}
