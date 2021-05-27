const constraintsReview = {
    getValidator: (fieldId) => {
        if (fieldId === "description") {
            return {
                presence: {
                    allowEmpty: false,
                },

                type: "string",
            };
        } else if (fieldId === "rating") {
            return {
                presence: {
                    allowEmpty: false,
                },

                type: "string",
            };
        }
    },
};

export default constraintsReview;