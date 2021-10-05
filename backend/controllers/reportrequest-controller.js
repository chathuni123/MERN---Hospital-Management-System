const Reportrequest=require("../models/report-requesrt");

//fetch repoertrequest
exports.getrepoertrequest = async (req, res) => {
    try {
      const Repoertrequest = await Reportrequest.find();
      res.status(200).send({
        Repoertrequest,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in gettrepoertrequest controller-" + error,
      });
    }
  };