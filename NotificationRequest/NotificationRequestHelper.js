const { getUserEndpoint } = require("../services/UserInventoryService");
const { create } = require("../NotificationRequest/NotificationRequestFactory");

const createRequest = async (message, user, medium) => {
    try {
        const endpointInfo = await getUserEndpoint(user, medium);
        return create(medium, { message, ...endpointInfo });
    } catch (e) {
        console.log(e);
    }
}