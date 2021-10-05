const PaymentModel = require("../models/salary-model");

//fetch salary
exports.getsalarychemist = async (req, res) => {
  console.log("request recieved salary");
    try {
      const chemsalary = await PaymentModel.find();
      res.status(200).send({
        chemsalary,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in getsalarychemist controller-" + error,
      });
    }
  };
