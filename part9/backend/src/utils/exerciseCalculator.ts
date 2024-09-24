import { isNotNumber } from './utils'


interface Error {
  error: string
}

interface ExerciseInterface {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

type Result = ExerciseInterface | Error 

export const exerciseCalculator = (target: number, args: string[]): Result => {

  console.log('args', args)
 
  if (args.length < 1) return {
    error: "parameters missing"
  }
  const arr = args

  let trainTotal = 0
  let dayCount = 0
  let average = 0
  let success = false


  if (!isNotNumber(args[0]) && !arr.some(isNotNumber)) {
    arr.map(nb => {
      if (Number(nb) > 0)
        trainTotal += 1
        dayCount += Number(nb)
    })
    average = dayCount / arr.length
    success = average > target
    return {
      periodLength: arr.length,
      trainingDays: trainTotal,
      success: success,
      rating: target,
      ratingDescription: "not too bad but could be better",
      target: target,
      average: average
    }
  } else {
    return {
      error: "malformatted parameters"
    }
  }
}




//const result = exerciseCalculator(process.argv)

//console.log(result)