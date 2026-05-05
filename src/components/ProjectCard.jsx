const ProjectCard = ({ title, desc }) => {
  return (
    <div className="bg-gray-800 p-4 rounded hover:scale-105 transition">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
};

export default ProjectCard;