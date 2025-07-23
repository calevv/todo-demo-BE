const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = Schema(
    {
        task: {
            type: String,
            required: true,
        },
        isComplete: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true }
    // 만들어진 시간 추가옵션
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
