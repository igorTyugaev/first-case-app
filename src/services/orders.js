import firebase, {analytics, auth, firestore, storage} from "../firebase";

import moment from "moment";
import authentication from "./authentication";

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

orders.signUp = (fields) => {
    return new Promise((resolve, reject) => {
        if (!fields) {
            reject(new Error("Нет полей"));

            return;
        }

        const firstName = fields.firstName;
        const lastName = fields.lastName;
        const username = fields.username;
        const emailAddress = fields.emailAddress;
        const password = fields.password;

        if (!firstName || !lastName || !username || !emailAddress || !password) {
            reject(
                new Error(
                    "Без имени, фамилии, имени пользователя, адреса эл. почты или пароля."
                )
            );

            return;
        }

        if (auth.currentUser) {
            reject(new Error("Нет текущего пользователя"));

            return;
        }

        auth
            .createUserWithEmailAndPassword(emailAddress, password)
            .then((value) => {
                const user = value.user;

                if (!user) {
                    reject(new Error("Нет пользователя"));

                    return;
                }

                const uid = user.uid;

                if (!uid) {
                    reject(new Error("Нет UID"));

                    return;
                }

                const userDocumentReference = firestore.collection("users").doc(uid);

                userDocumentReference
                    .set({
                        firstName: firstName,
                        lastName: lastName,
                        username: username,
                    })
                    .then((value) => {
                        analytics.logEvent("sign_up", {
                            method: "password",
                        });

                        resolve(value);
                    })
                    .catch((reason) => {
                        reject(reason);
                    });
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};

orders.signUpWithEmailAddressAndPassword = (emailAddress, password) => {
    return new Promise((resolve, reject) => {
        if (!emailAddress || !password) {
            reject(new Error("No e-mail address or password"));

            return;
        }

        if (auth.currentUser) {
            reject(new Error("No current user"));

            return;
        }

        auth
            .createUserWithEmailAndPassword(emailAddress, password)
            .then((value) => {
                const user = value.user;

                if (!user) {
                    reject(new Error("No user"));

                    return;
                }

                const uid = user.uid;

                if (!uid) {
                    reject(new Error("No UID"));

                    return;
                }

                const userDocumentReference = firestore.collection("users").doc(uid);

                userDocumentReference
                    .set({}, {merge: true})
                    .then((value) => {
                        analytics.logEvent("sign_up", {
                            method: "password",
                        });

                        resolve(value);
                    })
                    .catch((reason) => {
                        reject(reason);
                    });
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};

orders.signIn = (emailAddress, password) => {
    return new Promise((resolve, reject) => {
        if (!emailAddress || !password) {
            reject(new Error("No e-mail address or password"));

            return;
        }

        if (auth.currentUser) {
            reject(new Error("No current user"));

            return;
        }

        auth
            .signInWithEmailAndPassword(emailAddress, password)
            .then((value) => {
                const user = value.user;

                if (!user) {
                    reject(new Error("No user"));

                    return;
                }

                const uid = user.uid;

                if (!uid) {
                    reject(new Error("No UID"));

                    return;
                }

                const userDocumentReference = firestore.collection("users").doc(uid);

                userDocumentReference
                    .get({source: "server"})
                    .then((value) => {
                        if (value.exists) {
                            analytics.logEvent("login", {
                                method: "password",
                            });

                            resolve(user);
                        } else {
                            userDocumentReference
                                .set({}, {merge: true})
                                .then((value) => {
                                    analytics.logEvent("login", {
                                        method: "password",
                                    });

                                    resolve(user);
                                })
                                .catch((reason) => {
                                    reject(reason);
                                });
                        }
                    })
                    .catch((reason) => {
                        reject(reason);
                    });
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};

orders.sendSignInLinkToEmail = (emailAddress) => {
    return new Promise((resolve, reject) => {
        if (!emailAddress) {
            reject(new Error("No e-mail address"));

            return;
        }

        if (auth.currentUser) {
            reject(new Error("No current user"));

            return;
        }

        const actionCodeSettings = {
            url: process.env.REACT_APP_HOMEPAGE,
            handleCodeInApp: true,
        };

        auth
            .sendSignInLinkToEmail(emailAddress, actionCodeSettings)
            .then((value) => {
                analytics.logEvent("send_sign_in_link_to_email");

                localStorage.setItem("emailAddress", emailAddress);

                resolve(value);
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};

orders.signInWithEmailLink = (emailAddress, emailLink) => {
    return new Promise((resolve, reject) => {
        if (!emailAddress || !emailLink) {
            reject(new Error("No e-mail address or e-mail link"));

            return;
        }

        if (auth.currentUser) {
            reject(new Error("No current user"));

            return;
        }

        auth
            .signInWithEmailLink(emailAddress, emailLink)
            .then((value) => {
                analytics.logEvent("login", {
                    method: "email-link",
                });

                localStorage.removeItem("emailAddress");

                resolve(value);
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};

orders.signInWithAuthProvider = (provider) => {
    return new Promise((resolve, reject) => {
        if (!provider) {
            reject(new Error("No provider"));

            return;
        }

        const authProvider = new firebase.auth.OAuthProvider(provider.id);
        const scopes = provider.scopes;

        if (scopes) {
            scopes.forEach((scope) => {
                authProvider.addScope(scope);
            });
        }

        if (auth.currentUser) {
            reject(new Error("No current user"));

            return;
        }

        auth
            .signInWithPopup(authProvider)
            .then((value) => {
                const user = value.user;

                if (!user) {
                    reject(new Error("No user"));

                    return;
                }

                const uid = user.uid;

                if (!uid) {
                    reject(new Error("No UID"));

                    return;
                }

                const userDocumentReference = firestore.collection("users").doc(uid);

                userDocumentReference
                    .get({source: "server"})
                    .then((value) => {
                        if (value.exists) {
                            analytics.logEvent("login", {
                                method: provider.id,
                            });

                            resolve(user);
                        } else {
                            userDocumentReference
                                .set({}, {merge: true})
                                .then((value) => {
                                    analytics.logEvent("login", {
                                        method: provider.id,
                                    });

                                    resolve(user);
                                })
                                .catch((reason) => {
                                    reject(reason);
                                });
                        }
                    })
                    .catch((reason) => {
                        reject(reason);
                    });
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};

orders.linkAuthProvider = (provider) => {
    return new Promise((resolve, reject) => {
        if (!provider) {
            reject(new Error("No provider"));

            return;
        }

        const authProvider = new firebase.auth.OAuthProvider(provider.id);
        const scopes = provider.scopes;

        if (scopes) {
            scopes.forEach((scope) => {
                authProvider.addScope(scope);
            });
        }

        const currentUser = auth.currentUser;

        if (!currentUser) {
            reject(new Error("No current user"));

            return;
        }

        currentUser
            .linkWithPopup(authProvider)
            .then((value) => {
                analytics.logEvent("link_auth_provider", {
                    providerId: authProvider.id,
                });

                resolve(value);
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};

orders.unlinkAuthProvider = (providerId) => {
    return new Promise((resolve, reject) => {
        if (!providerId) {
            reject(new Error("No provider ID"));

            return;
        }

        const currentUser = auth.currentUser;

        if (!currentUser) {
            reject(new Error("No current user"));

            return;
        }

        currentUser
            .unlink(providerId)
            .then((value) => {
                analytics.logEvent("unlink_auth_provider", {
                    providerId: providerId,
                });

                resolve(value);
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};

orders.authProviderData = (providerId) => {
    if (!providerId) {
        return;
    }

    const currentUser = auth.currentUser;

    if (!currentUser) {
        return;
    }

    const providerData = currentUser.providerData;

    if (!providerData) {
        return;
    }

    return providerData.find((authProvider) => authProvider.providerId === providerId);
};

orders.signOut = () => {
    return new Promise((resolve, reject) => {
        const currentUser = auth.currentUser;

        if (!currentUser) {
            reject(new Error("No current user"));

            return;
        }

        auth
            .signOut()
            .then((value) => {
                analytics.logEvent("sign_out");

                resolve(value);
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};

orders.resetPassword = (emailAddress) => {
    return new Promise((resolve, reject) => {
        if (!emailAddress) {
            reject(new Error("No e-mail address"));

            return;
        }

        if (auth.currentUser) {
            reject(new Error("No current user"));

            return;
        }

        auth
            .sendPasswordResetEmail(emailAddress)
            .then((value) => {
                analytics.logEvent("reset_password");

                resolve(value);
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};

orders.changeAvatar = (avatar) => {
    return new Promise((resolve, reject) => {
        if (!avatar) {
            reject(new Error("No avatar"));

            return;
        }

        const avatarFileTypes = [
            "image/gif",
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/svg+xml",
        ];

        if (!avatarFileTypes.includes(avatar.type)) {
            reject(new Error("Invalid file type"));

            return;
        }

        if (avatar.size > 20 * 1024 * 1024) {
            reject(new Error("Invalid size"));

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

        const avatarReference = storage
            .ref()
            .child("images")
            .child("avatars")
            .child(uid);

        avatarReference
            .put(avatar)
            .then((uploadTaskSnapshot) => {
                avatarReference
                    .getDownloadURL()
                    .then((value) => {
                        currentUser
                            .updateProfile({
                                photoURL: value,
                            })
                            .then((value) => {
                                analytics.logEvent("change_avatar");

                                resolve(value);
                            })
                            .catch((reason) => {
                                reject(reason);
                            });
                    })
                    .catch((reason) => {
                        reject(reason);
                    });
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};

orders.removeAvatar = () => {
    return new Promise((resolve, reject) => {
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

        currentUser
            .updateProfile({
                photoURL: null,
            })
            .then((value) => {
                const avatarReference = storage
                    .ref()
                    .child("images")
                    .child("avatars")
                    .child(uid);

                avatarReference
                    .delete()
                    .then((value) => {
                        analytics.logEvent("remove_avatar");

                        resolve(value);
                    })
                    .catch((reason) => {
                        reject(reason);
                    });
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};

orders.changeFirstName = (firstName) => {
    return new Promise((resolve, reject) => {
        if (!firstName) {
            reject(new Error("No first name"));

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

        const userDocumentReference = firestore.collection("users").doc(uid);

        userDocumentReference
            .update({
                firstName: firstName,
            })
            .then((value) => {
                analytics.logEvent("change_first_name");

                resolve(value);
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};

orders.changeAbout = (about) => {
    return new Promise((resolve, reject) => {
        if (!about) {
            reject(new Error("No about"));

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

        const userDocumentReference = firestore.collection("users").doc(uid);

        userDocumentReference
            .update({
                about: about,
            })
            .then((value) => {
                analytics.logEvent("change_about");

                resolve(value);
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};

orders.changeEducation = (education) => {
    return new Promise((resolve, reject) => {
        if (!education) {
            reject(new Error("No education"));

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

        const userDocumentReference = firestore.collection("users").doc(uid);

        userDocumentReference
            .update({
                education: education,
            })
            .then((value) => {
                analytics.logEvent("change_education");

                resolve(value);
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};

orders.changeLastName = (lastName) => {
    return new Promise((resolve, reject) => {
        if (!lastName) {
            reject(new Error("No last name"));

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

        const userDocumentReference = firestore.collection("users").doc(uid);

        userDocumentReference
            .update({
                lastName: lastName,
            })
            .then((value) => {
                analytics.logEvent("change_last_name");

                resolve(value);
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};

orders.changeUsername = (username) => {
    return new Promise((resolve, reject) => {
        if (!username) {
            reject(new Error("No username"));

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

        const userDocumentReference = firestore.collection("users").doc(uid);

        userDocumentReference
            .update({
                username: username,
            })
            .then((value) => {
                analytics.logEvent("change_username");

                resolve(value);
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};

orders.changeEmailAddress = (emailAddress) => {
    return new Promise((resolve, reject) => {
        if (!emailAddress) {
            reject(new Error("No e-mail address"));

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

        currentUser
            .updateEmail(emailAddress)
            .then((value) => {
                analytics.logEvent("change_email_address");

                resolve(value);
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};

orders.changePassword = (password) => {
    return new Promise((resolve, reject) => {
        if (!password) {
            reject(new Error("No password"));

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

        currentUser
            .updatePassword(password)
            .then((value) => {
                const userDocumentReference = firestore.collection("users").doc(uid);

                userDocumentReference
                    .update({
                        lastPasswordChange: firebase.firestore.FieldValue.serverTimestamp(),
                    })
                    .then((value) => {
                        analytics.logEvent("change_password");

                        resolve(value);
                    })
                    .catch((reason) => {
                        reject(reason);
                    });
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};

orders.verifyEmailAddress = () => {
    return new Promise((resolve, reject) => {
        const currentUser = auth.currentUser;

        if (!currentUser) {
            reject(new Error("No current user"));

            return;
        }

        currentUser
            .sendEmailVerification()
            .then((value) => {
                analytics.logEvent("verify_email_address");

                resolve(value);
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};

orders.deleteAccount = () => {
    return new Promise((resolve, reject) => {
        const currentUser = auth.currentUser;

        if (!currentUser) {
            reject(new Error("No current user"));

            return;
        }

        currentUser
            .delete()
            .then((value) => {
                analytics.logEvent("delete_account");

                resolve(value);
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};

orders.getRoles = () => {
    return new Promise((resolve, reject) => {
        const currentUser = auth.currentUser;

        if (!currentUser) {
            reject(new Error("No current user"));

            return;
        }

        currentUser
            .getIdTokenResult()
            .then((idTokenResult) => {
                resolve(idTokenResult.claims.roles);
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};

orders.isAdmin = () => {
    return new Promise((resolve, reject) => {
        orders
            .getRoles()
            .then((value) => {
                resolve(value.includes("admin"));
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};

orders.isPremium = () => {
    return new Promise((resolve, reject) => {
        orders
            .getRoles()
            .then((value) => {
                resolve(value.includes("premium"));
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};

orders.getName = (fields) => {
    if (!fields) {
        return null;
    }

    const firstName = fields.firstName;
    const username = fields.username;
    const displayName = fields.displayName;
    const lastName = fields.lastName;

    if (firstName) {
        return firstName;
    }

    if (username) {
        return username;
    }

    if (displayName) {
        return displayName;
    }

    if (lastName) {
        return lastName;
    }

    return null;
};

orders.getFullName = (fields) => {
    if (!fields) {
        return null;
    }

    const firstName = fields.firstName;
    const lastName = fields.lastName;
    const displayName = fields.displayName;

    if (firstName && lastName) {
        return `${firstName} ${lastName}`;
    }

    if (displayName) {
        return displayName;
    }

    return null;
};

orders.getNameInitials = (fields) => {
    if (!fields) {
        return null;
    }

    const firstName = fields.firstName;
    const lastName = fields.lastName;
    const username = fields.username;
    const displayName = fields.displayName;

    if (firstName && lastName) {
        return firstName.charAt(0) + lastName.charAt(0);
    }

    if (firstName) {
        return firstName.charAt(0);
    }

    if (username) {
        return username.charAt(0);
    }

    if (lastName) {
        return lastName.charAt(0);
    }

    if (displayName) {
        return displayName.charAt(0);
    }

    return null;
};

orders.getProfileCompletion = (fields) => {
    if (!fields) {
        return null;
    }

    fields = [
        fields.photoURL,
        fields.firstName,
        fields.lastName,
        fields.username,
        fields.email,
        fields.email && fields.emailVerified,
    ];

    if (!fields) {
        return null;
    }

    let profileCompletion = 0;

    fields.forEach((field) => {
        if (field) {
            profileCompletion += 100 / fields.length;
        }
    });

    return Math.floor(profileCompletion);
};

orders.getSecurityRating = (user, userData) => {
    if (!user || !user.metadata) {
        return null;
    }

    let creationTime = user.metadata.creationTime;

    if (!creationTime) {
        return null;
    }

    creationTime = moment(creationTime);

    let securityRating = 0;

    if (userData && userData.lastPasswordChange) {
        let lastPasswordChange = userData.lastPasswordChange;

        if (lastPasswordChange) {
            lastPasswordChange = moment(lastPasswordChange.toDate());

            if (creationTime.diff(lastPasswordChange, "days") >= 365.242199) {
                securityRating = 50;
            } else {
                securityRating = 100;
            }
        }
    } else {
        if (moment().diff(creationTime, "days") >= 365.242199) {
            securityRating = 50;
        } else {
            securityRating = 100;
        }
    }

    return securityRating;
};

export default orders;
