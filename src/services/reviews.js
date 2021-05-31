import firebase, {analytics, auth, firestore} from "../firebase";

const reviews = {};

reviews.updateReview = (values, reviewId= null) => {
    return new Promise((resolve, reject) => {
        if (!values) {
            reject(new Error("No values"));
            return;
        }

        const currentUser = auth.currentUser;
        
        if (!currentUser) {
            reject(new Error("No current user"));
            return;
        }

        const idAuthor = currentUser.uid;
        const photo = currentUser.photoURL;

        if (!currentUser.uid) {
            reject(new Error("No UID"));
            return;
        }

        const collectionReference = firestore.collection("reviews");
        const reviewDocumentReference = (reviewId) ? (collectionReference.doc(reviewId)) : (collectionReference.doc());

        if (reviewId) {
            reviewDocumentReference
                .update({
                    rating: values.rating,
                    description: values.description,
                    targetPerson: values.targetPerson,
                    author: values.fullName,
                    idAuthor: idAuthor,
                    photoURL: photo ? photo : '',
                })
                .then((value) => {
                    analytics.logEvent("change_review");
                    resolve(value);
                })
                .catch((reason) => {
                    reject(reason);
                });
        } else {
            reviewDocumentReference
                .set({
                    rating: values.rating,
                    description: values.description,
                    targetPerson: values.targetPerson,
                    author: values.fullName,
                    idAuthor: idAuthor,
                    photoURL: photo ? photo : '',
                })
                .then((value) => {
                    analytics.logEvent("change_review");
                    resolve(value);
                })
                .catch((reason) => {
                    reject(reason);
                });
        }
    });
};

reviews.getReview = (reviewId, setReview) => {
    firestore
        .collection("reviews")
        .doc(reviewId)
        .onSnapshot(
            (snapshot) => {
                const data = snapshot.data();

                if (!snapshot.exists || !data) {
                    return;
                }

                setReview(data);
            },
            (error) => {
                this.resetState(() => {
                    const code = error.code;
                    const message = error.message;

                    switch (code) {
                        default:
                            this.openSnackbar(message);
                            return;
                    }
                });
            }
        );
};

export default reviews;
