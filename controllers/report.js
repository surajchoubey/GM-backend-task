const Report = require('../models/report')

const get_report = async(req, res) => {

    if(!req.query.reportID) {
        res.status(400).json({
            error: 'You must provide a report ID'
        })
    }
    
    const report = await Report.findById(req.query.reportID)

    if (report.length === 0) {
        res.status(200).json({
            error: `Nothing with reportID: ${req.query.reportID} exists`
        })
    } else {

        Report.find({marketID: report.marketID, cmdtyID: report.cmdtyID}).exec().then(reports => {
    
            let users = [], mean_sum = 0

            reports.forEach(item => {
                users.push(item.userID)
                mean_sum += item.price / item.convFctr
            })
            
            res.status(200).json({
                "_id": report._id,
                "cmdtyName": report.cmdtyName,
                "cmdtyID": report.cmdtyID,
                "marketID": report.marketID,
                "marketName": report.marketName,
                "users": users,
                "timestamp": Date.now(),
                "priceUnit": "Kg",
                "price": mean_sum / reports.length
            })
        }).catch(err => {
            res.status(500).json({
                error: err.message
            })
        })
    }
}


const post_report = (req, res) => {
    Report.find({
        userID: req.body.reportDetails.userID, 
        marketID: req.body.reportDetails.marketID, 
        cmdtyID: req.body.reportDetails.cmdtyID
    }).exec().then(docs => {
        if (docs.length === 0) {
            const report = new Report(req.body.reportDetails)
            report.save().then(result => {
                res.status(201).json({
                    status: "success",
                    reportID: result._id
                })
            }).catch(err => {
                res.status(500).json({
                    error: err.message
                })
            })
        } else {
            res.status(201).json({
                error: "Data already exists"
            })
        }
    }).catch(err => {
        res.status(400).json({
            error: err.message
        })
    })
}

module.exports = {
    get_report,
    post_report
}