const mongoose = require("mongoose");
const { RiSoundModuleLine } = require("react-icons/ri");

const blacklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const blacklistTokenModel = mongoose.model(
  "blacklistTokens",
  blacklistTokenSchema,
);

module.exports = blacklistTokenModel;
