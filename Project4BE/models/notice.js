const noticeDaos = require('../daos/notice');

//select drafts from notices where type = {type}

const getDraft = async (type) => {
  return await noticeDaos.findOne(
    { type },
    "draft"
  );
};

module.exports = {
  getDraft,
};