"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exerciseCalculator = void 0;
const utils_1 = require("./utils");
const exerciseCalculator = (target, args) => {
    console.log('args', args);
    if (args.length < 1)
        return {
            error: "parameters missing"
        };
    const arr = args;
    let trainTotal = 0;
    let dayCount = 0;
    let average = 0;
    let success = false;
    if (!(0, utils_1.isNotNumber)(args[0]) && !arr.some(utils_1.isNotNumber)) {
        arr.map(nb => {
            if (Number(nb) > 0)
                trainTotal += 1;
            dayCount += Number(nb);
        });
        average = dayCount / arr.length;
        success = average > target;
        return {
            periodLength: arr.length,
            trainingDays: trainTotal,
            success: success,
            rating: target,
            ratingDescription: "not too bad but could be better",
            target: target,
            average: average
        };
    }
    else {
        return {
            error: "malformatted parameters"
        };
    }
};
exports.exerciseCalculator = exerciseCalculator;
//const result = exerciseCalculator(process.argv)
//console.log(result)
