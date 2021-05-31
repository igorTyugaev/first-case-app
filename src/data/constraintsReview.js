const constraintsReview = {
    description: {
        length: {
            minimum: 2,
            maximum: 185,
        },

        presence: {
            allowEmpty: false,
        },

        type: "string",
    },
};

export default constraintsReview;