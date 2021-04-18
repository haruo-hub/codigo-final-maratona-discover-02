const Profile = require('../model/Profile');

module.exports = {
    create(req, res) {
        return res.render("profile")
    },
    async save(req, res) {
        const profile = req.body;
        profile.createdAt = Date.now();
        const weeksPerYear = 52;
        const weeksPerMonth = (weeksPerYear - profile["vacation-per-year"]) / 12;
        const weekTotalHours = profile["hours-per-day"] * profile["days-per-week"];
        const monthlyTotalHours = weekTotalHours * weeksPerMonth;
        const valueHour = profile["monthly-budget"] / monthlyTotalHours;

        await Profile.create({
            "name" : profile.name,
            "avatar": profile.avatar,
            "monthly_budget": profile["monthly-budget"],
            "days_per_week": profile["days-per-week"],
            "hours_per_day": profile["hours-per-day"],
            "vacation_per_year": profile["vacation-per-year"],
            "value_hour": valueHour,
            "selected": 0,
            value_hour: valueHour,
            created_at: Date.now()
        });
        return res.redirect("/");
    },
    async index(req, res) {
        return res.render("profiles", { profiles: await Profile.getAll() })
    },
    async show(req, res) {
        const profileId = req.params.id;
        return res.render("profile-edit", { profile: await Profile.get(profileId) })
    },
    async update(req, res) {
        const data = req.body;
        const weeksPerYear = 52;
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"];
        const monthlyTotalHours = weekTotalHours * weeksPerMonth;
        const valueHour = data["monthly-budget"] / monthlyTotalHours;
        const profile = await Profile.getSelected();
        await Profile.update({
            ...profile,
            ...data,
            "value-hour": valueHour
        });
        return res.render("profile-edit", { profile: await Profile.getSelected() })
    },
    async delete(req, res) {
        const profileId = req.params.id;
        await Profile.delete(profileId);
        res.redirect('/profiles');
    },
    async select(req, res) {
        const profileId = req.params.id;
        await Profile.select(profileId);
        res.redirect('/profiles');
    }
}