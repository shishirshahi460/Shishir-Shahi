import ProjectCard from "../components/ProjectCard";

const Projects = () => {
  return (
    <div className="p-10 grid md:grid-cols-3 gap-6">
      <ProjectCard title="E-commerce App" desc="MERN stack project" />
      <ProjectCard title="Portfolio" desc="React + Tailwind" />
      <ProjectCard title="Todo App" desc="MERN stack project" />
      <ProjectCard title="Travel Booking App" desc="MERN Stack Project" />
      <ProjectCard title="Gymmandu App" desc="MERN stack project — Launching Soon." />
    </div>
  );
};

export default Projects;