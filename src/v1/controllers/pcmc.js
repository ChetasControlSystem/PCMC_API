const { pool, insertDataPool } = require('../config/mysql-db');
const mssql = require('mssql');
const sqlQuery = require("./query")
const cron = require('cron');

const fetchAndStoreData = async () => {
    try {

        const sourceConnection = await pool.connect();
        const { recordset: getData } = await sourceConnection.query(sqlQuery.getData);
        await sourceConnection.close();

        try {
            const destinationConnection = await insertDataPool.connect();
        
            for (const row of getData) {
                // Format the DateAndTime field as a string in a format supported by SQL Server
                const formattedDate = row.DateAndTime.toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, '');

                const query = `
                    INSERT INTO [Smart_City_Data].[dbo].[SendData] 
                    ([DateAndTime], [Millitm], [TagIndex], [Val], [Status], [Marker]) 
                    VALUES ('${formattedDate}', ${row.Millitm}, ${row.TagIndex}, ${row.Val}, '${row.Status}', '${row.Marker}');
                `;
                await destinationConnection.query(query);
            }
        
            console.log('Data inserted successfully.');
        } catch (error) {
            console.error('Error inserting data:', error);
        }
        

        console.log('Data fetched and stored successfully.');

    } catch (error) {
        console.log('Error in cron job:', error);
    }
};

// Schedule the cron job to run every 10 minutes
const cronJob = new cron.CronJob('*/1 * * * *', fetchAndStoreData);


cronJob.start();

exports.data = async function (req, res, next) {
    try {
        res.json("Hello Nirav")
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
    }
}

