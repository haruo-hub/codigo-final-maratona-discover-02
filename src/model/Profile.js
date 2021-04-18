const Database = require("../db/config");

module.exports = {
    async getAll() {
        const db = await Database();
        const data = await db.all(`SELECT * FROM profile`);
        await db.close();
        return data.map((item) =>{
            return {
                "id": item.id,
                "name" : item.name,
                "avatar": item.avatar,
                "monthly-budget": item.monthly_budget,
                "days-per-week": item.days_per_week,
                "hours-per-day": item.hours_per_day,
                "vacation-per-year": item.vacation_per_year,
                "value-hour": item.value_hour,
                "selected": item.selected
            }
        });
    },
    async get(profileId) {
        const db = await Database();
        const data = await db.get(`SELECT * FROM profile WHERE id = ${profileId}`);
        await db.close();
        
        return {
            "id": data.id,
            "name" : data.name,
            "avatar": data.avatar,
            "monthly-budget": data.monthly_budget,
            "days-per-week": data.days_per_week,
            "hours-per-day": data.hours_per_day,
            "vacation-per-year": data.vacation_per_year,
            "value-hour": data.value_hour,
            "selected": data.selected
        };
    },
    async getSelected() {
        const db = await Database();
        const data = await db.get(`SELECT * FROM profile WHERE selected = 1`);
        await db.close();
        
        return {
            "id": data.id,
            "name" : data.name,
            "avatar": data.avatar,
            "monthly-budget": data.monthly_budget,
            "days-per-week": data.days_per_week,
            "hours-per-day": data.hours_per_day,
            "vacation-per-year": data.vacation_per_year,
            "value-hour": data.value_hour,
            "selected": data.selected
        };
    },
    async update(newData) {
        const db = await Database();

        await db.run(`UPDATE profile SET  
            name="${newData.name}", 
            avatar="${newData.avatar}",
            monthly_budget=${newData["monthly-budget"]},
            days_per_week=${newData["days-per-week"]},
            vacation_per_year=${newData["vacation-per-year"]},
            value_hour=${newData["value-hour"]},
            hours_per_day=${newData["hours-per-day"]}
        WHERE id = ${newData.id}`);
        await db.close();
    },
    async delete(id) {
        const db = await Database();
        await db.run(`DELETE FROM profile WHERE id = ${id}`);
        await db.close();
    },
    async create(newProfile) {
        const db = await Database();
        await db.run(`INSERT INTO profile(
            name,
            avatar,
            monthly_budget,
            days_per_week,
            vacation_per_year, 
            value_hour,
            hours_per_day,
            selected
        )
        VALUES(
            "${newProfile.name}", 
            "${newProfile.avatar}",
            ${newProfile.monthly_budget},
            ${newProfile.days_per_week},
            ${newProfile.vacation_per_year},
            ${newProfile.value_hour},
            ${newProfile.hours_per_day},
            ${newProfile.selected}
        )`);

        await db.close();
    },
    async select(id) {
        const db = await Database();
        await db.run(`UPDATE profile SET selected = 0`);
        await db.run(`UPDATE profile SET selected = 1 WHERE id = ${id}`);
        await db.close();
    },
}