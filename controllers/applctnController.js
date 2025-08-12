const applications = require("../modal/applicationModel");

exports.addApplctnsController = async (req, res) => {
    const { jobTitle, fullname, qualification, email, phone, coverletter } = req.body;

    try {
        const resume = req.file?.filename;
        console.log(resume,jobTitle, fullname, qualification, email, phone, coverletter);
        
        if (!jobTitle || !fullname || !qualification || !email || !phone || !coverletter || !resume) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingApplctn = await applications.findOne({ jobTitle, email });
        if (existingApplctn) {
            return res.status(409).json({ message: "Already Applied" });
        }

        const application = new applications({
            jobTitle,
            name: fullname,
            qualification,
            email,
            phone,
            coverletter,
            resume
        });

        await application.save();
        return res.status(200).json(application);

    } catch (error) {
        console.error("Application submission error:", error);
        return res.status(500).json({ message: "Server Error", error });
    }
};

// to get all applications
exports.getALlApplctnsController = async(req,res)=>{
    try {
        const allApplications = await applications.find()
        res.status(200).json(allApplications)
    } catch (error) {
        res.status(500).json(error)
    }
}
