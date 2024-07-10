import { Link } from "react-router-dom";
export default function CreateLesson() {
  const lessons = [
    {
      title: "Create a Lesson",
      image: "./public/CreateLesson.png",
      description: "Create a new lesson here!",
      path: "/createLesson/createLessonbtn",
    },
  ];

  return (
    <div>
      {lessons.map((lesson, index) => (
        <div key={index}>
          <h3>{lesson.title}</h3>
          <Link to={lesson.path}>
            <img src={lesson.image} alt={lesson.title} />
          </Link>
          <p>{lesson.description}</p>
        </div>
      ))}
    </div>
  );
}
