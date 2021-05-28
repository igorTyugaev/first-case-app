import firebase, {analytics, auth, firestore} from "../firebase";

const reviews = {};

reviews.updateReview = (values, reviewId) => {
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

        const uid = currentUser.uid;
        const fullname = currentUser.fullName;
        const photo = currentUser.photoURL;

        if (!uid) {
            reject(new Error("No UID"));
            return;
        }

        if (!fullname) {
            reject(new Error("No fullname"));
            return;
        }

        const collectionReference = firestore.collection("reviews");
        const reviewDocumentReference = (reviewId) ? (collectionReference.doc(reviewId)) : (collectionReference.doc());

        if (reviewId) {
            reviewDocumentReference
                .update({
                    rating: values.rating,
                    description: values.description,
                    targetPerson: uid,
                    author: fullname,
                    athorPhoto: photo,
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
                    targetPerson: uid,
                    author: fullname,
                    athorPhoto: photo,
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
