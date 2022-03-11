import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.type) {
    case 'normal':
      return (
        <div>
          <b>{coursePart.name} {coursePart.exerciseCount}</b> <br/>
          <i>{coursePart.description}</i>
        </div>
      );
    case 'groupProject':
      return (
        <div>
          <b>{coursePart.name} {coursePart.exerciseCount}</b> <br/>
          project exercises {coursePart.groupProjectCount}
        </div>
      );
    case 'submission':
      return (
        <div>
          <b>{coursePart.name} {coursePart.exerciseCount}</b> <br/>
          <i>{coursePart.description}</i> <br/>
          submit to {coursePart.exerciseSubmissionLink}
        </div>
      );
    case 'special':
      return (
        <div>
          <b>{coursePart.name} {coursePart.exerciseCount}</b> <br/>
          <i>{coursePart.description}</i> <br/>
          required skills {coursePart.requirements.map((skill, index) => <em key={index}>{skill} </em>)}
        </div>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;
