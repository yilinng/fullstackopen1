"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bmiCalculator = void 0;
const utils_1 = require("./utils");
const bmiCalculator = (height, weight) => {
    if ((0, utils_1.isNotNumber)(height) || (0, utils_1.isNotNumber)(weight)) {
        return {
            error: "malformatted parameters"
        };
    }
    const result = weight / Math.pow(height / 100, 2);
    if (result >= 40.4) {
        return { weight, height, bmi: 'Morbidy obese' };
    }
    else if (result > 35.0 && result < 39.9) {
        return { weight, height, bmi: 'Severely obese' };
    }
    else if (result > 30.0 && result < 34.9) {
        return { weight, height, bmi: 'Moderately obese' };
    }
    else if (result > 25.0 && result < 29.9) {
        return { weight, height, bmi: 'overweight' };
    }
    else if (result > 18.5 && result < 24.9) {
        return { weight, height, bmi: 'normal' };
    }
    else if (result > 16.0 && result < 18.4) {
        return { weight, height, bmi: 'underweight' };
    }
    else if (result < 16.0) {
        return { weight, height, bmi: 'Severely underweight' };
    }
    return { error: "result can not find" };
};
exports.bmiCalculator = bmiCalculator;
//const height: number = Number(process.argv[2])
//const weight: number = Number(process.argv[3])
