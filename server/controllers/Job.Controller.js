
const Job = require('../models/job');
const User = require('../models/user');

exports.createJobPost = async (req, res) => {
    try {
        const {
            id, title, type, location,
            companyName, companyUrl, skills,
            link, jobDescription
        } = req.body;

        // Validate the job data
        if (!id || !title || !type || !location || !companyName || !companyUrl || !skills || !link || !jobDescription) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        // Check if the job ID already exists
        const existingJob = await Job.findOne({ id });
        if (existingJob) {
            return res.status(400).json({ msg: 'Job ID already exists' });
        }

        // Get the user ID from the authenticated request
        const creator = req.auth._id;

        // Create a new job instance
        const job = new Job({
            id,
            title,
            type,
            location,
            companyName,
            companyUrl,
            skills,
            link,
            jobDescription,
            creator,
        });

        // Save the job to the database
        await job.save();

        res.status(201).json({ msg: 'Job posted successfully', job });
    } catch (error) {
        console.error('Error creating job post:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.getJob=async(req,res)=>{
    try{
        const jobs=await Job.find()
        res.status(201).json({
            msg:'Job fetch sucessfully',
            jobs
        })
    }
    catch(error){
        console.error('Error in fetching job post:', error);
        res.status(500).json({ msg: 'Server error' });
    }
}
exports.getUserPost=async(req,res)=>{
    try{
        const id=req.auth._id
        const posts=await Job.find({creator:id})
        res.status(201).json({
            msg:'Job fetch sucessfully',
            posts
        })
    }

    
    catch(error){
           console.log(error)
           res.status(500).json({ msg: 'Server error' });
    }
}


exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const creatorId = req.auth._id;

        // Find the post by ID
        const post = await Job.findById(postId);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Check if the creator matches
        if (post.creator.toString() !== creatorId) {
            return res.status(403).json({ msg: 'Unauthorized action' });
        }

        // Delete the post
        await Job.findByIdAndDelete(postId);

        res.status(200).json({ msg: 'Post deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server error' });
    }
};