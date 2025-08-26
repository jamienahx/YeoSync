const noticeModel = require('../models/notice');

const fetchDraftByType = async (req, res) => {
  try {
    const { type } = req.params;
    if (!type) {
      return res.status(400).json({
        message: "Event type required",
      });
    }

    const draftDoc = await noticeModel.getDraft(type);
    res.status(200).json(draftDoc?.draft || ""); // send back the draft string only
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  fetchDraftByType,
};
