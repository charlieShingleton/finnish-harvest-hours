module.exports = {
  getUserData
};

const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  id: Number,
  previousBalance: {
    default: 0,
    type: Number
  },
  variantPeriods: {
    default: [],
    type: [
      {
        start: Date, // Front-end expects this to exist.
        end: Date, // This can be null, however. A null value indicates 'indefinitely'.
        dailyHours: Number
      }
    ]
  }
});

const UserModel = mongoose.model("User", UserSchema, "Users");

function getUserData(userHarvestId) {
  return UserModel.findOne({ id: userHarvestId })
    .exec()
    .then(user => {
      // TODO: return error if user is null?
      if (user === null) return { previousBalance: 0, variantPeriods: [] };
      const { previousBalance = 0, variantPeriods = [] } = user;
      return { previousBalance, variantPeriods };
    })
    .catch(e => {
      throw e;
    });
}
