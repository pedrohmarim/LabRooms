const jwt = require("jsonwebtoken");

module.exports = async (_id, tokenName, lifeTime) => {
  const token = jwt.sign(
    {
      _id,
    },
    `process.env.${tokenName}`,
    {
      expiresIn: lifeTime,
    }
  );

  return token;
};
