interface HeaderProps {
  name: string;
}

interface ContentProps {
  courseParts: CoursePart[];
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: "background"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;


interface TotoalProps {
  total: number;
}

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
];

const Header = (props: HeaderProps) => {
  return (
    <h1>{props.name}</h1>
  )
}


const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((part: CoursePart, index: number) => 
        <SingleContent key={index} {...part} />
      )} 
    </div>
  )
}

const SingleContent = (props: CoursePart) => {
  console.log('props', props)
  switch (props.kind) {
    case 'basic':
      return (
        <div>
          <p>
            {props.name} {props.exerciseCount}
          </p>
          <p>{props.description}</p>
        </div>
      )
    case 'background':
      return (
        <div>
          <p>
            {props.name} {props.exerciseCount}
          </p>
          <p>{props.description}</p>
          <p>{props.backgroundMaterial}</p>
        </div>
      )
    case 'group':
      return (
        <div>
          <p>
            {props.name} {props.exerciseCount}
          </p>
          <p>{props.groupProjectCount}</p>
        </div>
      )
    default:
      console.log('this kind not match...')
  }
 
}

const Total = (props: TotoalProps) => {
  return (
    <p>
    Number of exercises {props.total}
    </p>
  )
}


const App = () => {
  const courseName = "Half Stack application development";
 
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />

      <Total total={totalExercises}/>
    </div>
  );
};

export default App;
