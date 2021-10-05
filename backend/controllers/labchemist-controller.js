const LabchemModel = require("../models/labchemist-model");
const AllUsersModel = require("../models/allusers-model");

//get LabChemist details
exports.getLabChemDetails = async (req, res) => {
    try {
        if (!req.user) {
            res.status(422).json({
                success: false,
                desc: "Can't find the user - ckeck again",
            });
        } else {
            res.status(200).send({
                labchemist: req.user,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            desc: "Error in get labchemist data controller-" + error,
        });
    }
};

//update labchemist
exports.updateLabchemDetails = async (req, res) => {
    const { username, fullname, email, phone,
        qualifications } = req.body;

    if (email) {

        try {



            await AllUsersModel.findOneAndUpdate(
                { email: req.user.email },
                { email: email },
                { omitUndefined: true }
            );
        } catch (error) {
            res.status(500).json({
                success: false,
                desc:
                    "Error in updatedoctor-update AllUsers controller-" + error,
            });
        }
    }

    try {

        const updatelabchem = await LabchemModel.findByIdAndUpdate(
            req.user.id,
            {
                username,
                email,
                fullname,
                phone,
                qualifications,

            },
            {
                new: true,
                upsert: false,
                omitUndefined: true,
            }
        );
        res.status(200).send({
            success: true,
            desc: " updated successfully",
            updatelabchem,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            desc: "Error in update labchem controller-" + error,
        });
    }
};

//delete chemist profile
exports.deleteLabchemistDetails = async (req, res) => {
    try {
        await LabchemModel.findByIdAndDelete(req.user._id);
        await AllUsersModel.findOneAndRemove({ email: req.user.email });

        res.status(200).send({
            status: true,
            desc: "deleted from the db",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            desc: "Error in delete chemist Details controller-" + error,
        });
    }
};
