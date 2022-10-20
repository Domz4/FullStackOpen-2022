const Part = ({ name, exercises }) => {
  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  );
};
const Header = ({ course }) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((e) => (
        <Part key={e.id} name={e.name} exercises={e.exercises} />
      ))}
    </>
  );
};

const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises : {parts.reduce((sum, e) => (sum += e.exercises), 0)}
    </p>
  );
};

const Course = ({ course }) => (
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
);
const Courses = ({ courses }) => {
  return (
    <>
      {courses.map((e) => {
        return <Course course={e} key={e.id} />;
      })}
    </>
  );
};
export default Courses;
