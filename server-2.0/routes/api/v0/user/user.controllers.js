module.exports = {
  getUserData
};

const userServices = require("./user.services");
const { handleRes } = require("../../utils/wrappers");

async function getUserData(req, res, next) {
  try {
    const sessionUser = {
      firstName: "Harry",
      harvestId: 123,
      lastName: "Truman"
    };
    /*     const {
      passport: { user: sessionUser }
    } = req.session; */
    const userData = await userServices.getUserData(sessionUser);
    return handleRes([200, userData])(req, res, next);
  } catch (e) {
    next(e);
  }
}
