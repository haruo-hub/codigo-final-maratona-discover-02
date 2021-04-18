const Profile = require('../model/Profile');
const Job = require('../model/Job');
const JobUtils = require('../utils/JobUtils');

module.exports = {
    async index(req, res)  {
        const jobs = await Job.get();
        const profile = await Profile.getSelected();

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        };
        
       
        const updatedJobs = jobs.map((job) => {
            const remaining = JobUtils.remainingDays(job);
            const status = remaining <= 0 ? 'done' : 'progress';
            statusCount[status] += 1;
            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            };
        });

        let jobTotalHour = updatedJobs.reduce((total, job) => {
            if(job.status === 'progress') {
                total += Number(job['daily-hours']);
            }
            return total;
        }, 0);
        const freeHours = profile["hours-per-day"] - jobTotalHour;
        return res.render("index", { jobs: updatedJobs, profile, statusCount, freeHours });
    }
}