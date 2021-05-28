import firebase, {analytics, auth, firestore} from "../firebase";

const channels = {};

channels.addChannelOrder = (order, userData) => {
    return new Promise((resolve, reject) => {
        if (!order) {
            reject(new Error("No values"));
            return;
        }

        const currentUser = auth.currentUser;

        if (!currentUser) {
            reject(new Error("No current user"));
            return;
        }

        const uid = currentUser.uid;

        if (!uid) {
            reject(new Error("No UID"));
            return;
        }

        const collectionReference = firestore.collection("channels");


        collectionReference
            .where("orderId", "==", order.id)
            .where("members", "array-contains", uid)
            .get()
            .then(snapshot => {
                if (snapshot && snapshot.docs && snapshot.docs.length > 0)
                    return resolve(snapshot.docs[0].id);
                else
                    createChannel()
            }, (error) => {
                return reject(new Error("Check failure"));
            })

        function createChannel() {
            collectionReference
                .add({
                    orderId: order.id,
                    channelName: order.name ? order.name : "Dialog",
                    members: [uid, order.author],
                    avatar: currentUser.photoURL,
                    userName: userData && userData.fullName ? userData.fullName : null,
                })
                .then((res) => {
                    analytics.logEvent("add_channel");
                    console.log("Create new channel with id:", res.id)
                    resolve(res.id);
                })
                .catch((reason) => {
                    reject(reason);
                });
        }

    });
};

channels.addChannelProfile = (profile, userData) => {
    return new Promise((resolve, reject) => {
        if (!profile) {
            reject(new Error("No profile"));
            return;
        }

        const currentUser = auth.currentUser;

        if (!currentUser) {
            reject(new Error("No current user"));
            return;
        }

        const uid = currentUser.uid;

        if (!uid) {
            reject(new Error("No UID"));
            return;
        }

        const collectionReference = firestore.collection("channels");


        collectionReference
            .where("members", "array-contains", [uid, profile.id])
            .get()
            .then(snapshot => {
                if (snapshot && snapshot.docs && snapshot.docs.length > 0)
                    return resolve(snapshot.docs[0].id);
                else
                    createChannel()
            }, (error) => {
                return reject(new Error("Check failure"));
            })

        function createChannel() {
            collectionReference
                .add({
                    channelName: profile.fullName ? profile.fullName : "Dialog",
                    members: [uid, profile.id],
                    avatar: currentUser.photoURL,
                    userName: userData && userData.fullName ? userData.fullName : null,
                })
                .then((res) => {
                    analytics.logEvent("add_channel");
                    resolve(res.id);
                })
                .catch((reason) => {
                    reject(reason);
                });
        }

    });
};

channels.removeChannel = (channelId) => {
    return new Promise((resolve, reject) => {
        if (!channelId) {
            reject(new Error("No channelId"));
            return;
        }

        const collectionReference = firestore.collection("channels").doc(channelId);

        collectionReference.delete().then(() => {
            return resolve("remove success");
        }).catch((error) => {
            return reject(new Error(error));
        });
    });
};

export default channels;
