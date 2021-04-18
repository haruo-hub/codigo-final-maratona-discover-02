const Profile = require('../model/Profile');
const Job = require('../model/Job');
const JobUtils = require('../utils/JobUtils');

module.exports = {

    create(req, res) {
        return res.render("job")
    },
    async save(req, res) {
        const job = req.body;
        job.createdAt = Date.now();
        await Job.create({
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now()
        });
        return res.redirect("/");
    },

    async show(req, res) {
        const jobs = await Job.get();
        const jobId = req.params.id;
        const job = jobs.find(job => Number(jobId) === Number(job.id));
        if(!job) {
            return res.send("Job Not Found!");
        }
        const profile = await Profile.getSelected();
        job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);
        return res.render("job-edit", { job });
    },

    async update(req, res) {
        const jobs = await Job.get();
        const jobId = req.params.id;
        const job = jobs.find(job => Number(jobId) === Number(job.id));
        if(!job) {
            return res.send("Job Not Found!");
        }
        const updatedJob = {
            ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        };

        await Job.update(updatedJob);

        res.redirect('/job/' + jobId);
    },

    async delete(req, res) {
        const jobId = req.params.id;
        await Job.delete(jobId);
        res.redirect('/');
    }
}