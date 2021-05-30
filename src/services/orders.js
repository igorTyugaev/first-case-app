import firebase, {analytics, auth, firestore} from "../firebase";

const orders = {};

orders.updateOrder = (values, orderId) => {
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

        if (!uid) {
            reject(new Error("No UID"));
            return;
        }

        const collectionReference = firestore.collection("orders");
        const orderDocumentReference = (orderId) ? (collectionReference.doc(orderId)) : (collectionReference.doc());

        if (orderId) {
            orderDocumentReference
                .update({
                    name: values.name,
                    description: values.description,
                    tags: values.tags,
                    deadline: values.deadline,
                    price: values.price,
                    author: uid,
                })
                .then((value) => {
                    analytics.logEvent("change_order");
                    resolve(value);
                })
                .catch((reason) => {
                    reject(reason);
                });
        } else {
            orderDocumentReference
                .set({
                    name: values.name,
                    description: values.description,
                    tags: values.tags,
                    deadline: values.deadline,
                    price: values.price,
                    author: uid,
                })
                .then((value) => {
                    analytics.logEvent("change_order");
                    resolve(value);
                })
                .catch((reason) => {
                    reject(reason);
                });
        }
    });
};

orders.addMemberToOrder = (orderId) => {
    return new Promise((resolve, reject) => {
        if (!orderId) {
            reject(new Error("No orderId"));
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

        const collectionReference = firestore.collection("orders");
        const orderDocumentReference = collectionReference.doc(orderId);

        orderDocumentReference
            .update({
                responses: firebase.firestore.FieldValue.arrayUnion(uid)
            })
            .then((value) => {
                analytics.logEvent("add_member_to_order");
                resolve(value);
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};

orders.changeTitle = (title, uidOrder = null) => {
    return new Promise((resolve, reject) => {
        if (!title) {
            reject(new Error("Не указан загаловок!"));

            return;
        }

        if (uidOrder) {
            firestore.collection("orders")
                .doc(uidOrder)
                .update({
                    title: title,
                })
                .then((value) => {
                    analytics.logEvent("change_title_order");

                    resolve(value);
                })
                .catch((reason) => {
                    reject(reason);
                });
        } else {
            firestore.collection("orders")
                .add({
                    title: title,
                })
                .then((value) => {
                    analytics.logEvent("change_title_order");

                    resolve(value);
                })
                .catch((reason) => {
                    reject(reason);
                });
        }
    });
};

orders.changeStatus = (orderId, status) => {
    return new Promise((resolve, reject) => {
        if (!status) {
            reject(new Error("No status"));
            return;
        }

        if (!orderId) {
            reject(new Error("No id order"));
            return;
        }

        firestore.collection("orders")
            .doc(orderId)
            .update({
                status: status,
            })
            .then((value) => {
                analytics.logEvent("change_order_status");
                resolve(value);
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};

orders.getOrder = (orderId, setOrder) => {
    firestore
        .collection("orders")
        .doc(orderId)
        .onSnapshot(
            (snapshot) => {
                const data = snapshot.data();

                if (!snapshot.exists || !data) {
                    return;
                }

                setOrder(data);

                // context.setState({
                //     order: data,
                // });
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
}

export default orders;
