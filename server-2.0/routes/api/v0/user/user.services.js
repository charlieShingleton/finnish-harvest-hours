module.exports = {
  getUserData
};

const userModel = require("./user.model");

async function getUserData(sessionUser) {
  const { firstName, harvestId: userHarvestId, lastName } = sessionUser;
  const userData = await userModel.getUserData(userHarvestId);
  const { previousBalance, variantPeriods } = userData;
  return { firstName, lastName, previousBalance, variantPeriods };
}
