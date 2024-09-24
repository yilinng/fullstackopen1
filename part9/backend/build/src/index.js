"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const bmiCalculator_1 = require("./utils/bmiCalculator");
const exerciseCalculator_1 = require("./utils/exerciseCalculator");
const patients_1 = __importDefault(require("./routes/patients"));
const diagnoses_1 = __importDefault(require("./routes/diagnoses"));
const app = express();
app.use(express.json());
const PORT = 3001;
app.get('/ping', (_req, res) => {
    res.send('pong');
});
//https://stackoverflow.com/questions/59812643/how-to-get-a-variable-input-in-url-after-question-mark-javascript
app.get('/bmi?', (req, res) => {
    console.log('req.query', req.query);
    console.log("req.params", req.params);
    const { height, weight } = req.query;
    const result = (0, bmiCalculator_1.bmiCalculator)(height, weight);
    res.json(result);
});
app.post('/exercises', (req, res) => {
    console.log("req.body", req.body);
    const { daily_exercises, target } = req.body;
    const newArr = [target, ...daily_exercises];
    console.log('new Arr', newArr);
    const result = (0, exerciseCalculator_1.exerciseCalculator)(Number(target), newArr);
    res.json(result);
});
app.use('/api/patients', patients_1.default);
app.use('/api/diagnoses', diagnoses_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
