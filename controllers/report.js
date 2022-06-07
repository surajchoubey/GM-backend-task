const Report = require('../models/report')

const get_report = async(req, res) => {

    try {

        if (!req.query.reportID || req.query.reportID.length !== 24) {
            return res.status(400).json({ error: 'You must provide a report ID which is valid'})
        }

        const report = await Report.findById(req.query.reportID)

        if (!report) {
            return res.status(200).json({ error: `Nothing with reportID: ${req.query.reportID} exists` })
        }

        const reports = await Report.find({marketID: report.marketID, cmdtyID: report.cmdtyID})
        let users = [], mean_sum = 0

        await reports.forEach(item => {
            users.push(item.userID)
            mean_sum += item.price / item.convFctr
        })
            
        res.status(200).json({
            _id: report._id,
            cmdtyName: report.cmdtyName,
            cmdtyID: report.cmdtyID,
            marketID: report.marketID,
            marketName: report.marketName,
            users: users,
            timestamp: Date.now(),
            priceUnit: "Kg",
            price: mean_sum / reports.length
        })

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}


const post_report = async(req, res) => {
    
    try {
        const already = await Report.findOne({
            userID: req.body.reportDetails.userID, 
            marketID: req.body.reportDetails.marketID, 
            cmdtyID: req.body.reportDetails.cmdtyID 
        })

        if(already) return res.status(201).json({ error: "Data already exists" })

        const report = await new Report(req.body.reportDetails)
        await report.save((err, result) => {
            if(err) return res.status(500).json({ error: err.message })
            res.status(201).json({
                status: "success",
                reportID: result._id
            })
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = {
    get_report,
    post_report
}