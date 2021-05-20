const constraintsOrder = {

    getValidator: (fieldId) => {
        if (fieldId === "name" || fieldId === "description") {
            return {
                presence: {
                    allowEmpty: false,
                },

                type: "string",
            };
        } else if (fieldId === "price") {
            return {
                presence: {
                    allowEmpty: false,
                },

                type: "string",
            };
        }
    },
};

export default constraintsOrder;
