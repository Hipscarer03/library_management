const StaffAction = require('../models/staffAction.model');
const User = require('../models/user.model');
const Request = require('../models/request.model');

const getAllStaffActions = async (req, res) => {
    try {
        const staffActions = await StaffAction.find();
        console.log(staffActions);
        res.status(200).json(staffActions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

checkEmpty = async (action_id, staff_id, action_type, target_id, timestamp) => {
    if (!action_id || !staff_id || !action_type || !target_id || !timestamp) {
        return false;
    }
    return true;
};

const createStaffAction = async (req, res) => {
    try {
        const { action_id, staff_id, action_type, target_id, timestamp } = req.body;
       if (!(await checkEmpty(action_id, staff_id, action_type, target_id, timestamp))) {
            res.status(400).send("action_id, staff_id, action_type, target_id, timestamp is required");
            return;
        }
        const request = await Request.findById(target_id).exec();
        if (!request) {
            res.status(404).send("Not found Request with id " + target_id + "\n");
            return;
        }
        const staffAction = new StaffAction({ action_id, staff_id, action_type, target_id, timestamp });
        await staffAction.save();
        res.status(201).json(staffAction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllStaffActions, createStaffAction };