// add job
const jobs = require("../modal/jobModal")

exports.addJobController = async(req,res)=> {
    const {jobTitle,location,jobType,salary,qualification,experiance,description} = req.body

    try {
        const exisingJob = await jobs.findOne({jobTitle,location})
        if(exisingJob){
            res.status(401).json("Job Already Added")
        }else{
            const newJob = new jobs({
                jobTitle,location,jobType,salary,qualification,experiance,description
            })
            await newJob.save()
            res.status(200).json("Job Added Succesfully")
        }

    } catch (error) {
        res.status(200).json(error)
    }
}

// to get all jobs

exports.getAllJobsController = async(req,res)=> {
    const {search} = req.query
    console.log(search);
    
    try {
        const allJobs = await jobs.find({jobTitle : {$regex : search, $options : "i"}})
        res.status(200).json(allJobs)
    } catch (error) {
        res.status(500).json(error)
    }
}

// to delete a job

exports.deleteJobController = async(req,res) => {
    const {id} = req.params
    try {
        await jobs.findByIdAndDelete({_id:id})
        res.status(200).json("jod deleted successfully")
    } catch (error) {
        res.status(500).json(error)
    }
}