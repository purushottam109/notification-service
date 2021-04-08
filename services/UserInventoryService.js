// Queries the User Inventory service to get the User 
// Information from the USER INVENTORY

const config = require(".././config.json");
const UserServiceEndpoint = config.services.userInventoryServiceUrl;

// mocked endpoint in the USER INVENTORY SERVICE
const userInfoCall = new Promise((resolve, reject) => {
    connect(UserServiceEndpoint);
    // assumed resolves
    resolve({
        email: 'abc@def.com'
    });
})

// get the medium data for user from the USER INVENTORY SERVICE
const getUserEndpoint = (user, medium) => {
    return userInfoCall(user, medium);
}

exports.getUserEndpoint = getUserEndpoint;
