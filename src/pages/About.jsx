const About = () => {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">About Me</h1>
      <p>I am a passionate Software Engineer, BIT graduate, and current MCS student with hands-on experience in web and mobile application development. I enjoy building clean, user-friendly, and scalable digital solutions that solve real problems. <br /> <br />
        My experience includes front-end and back-end development, API integration, UI/UX refinement, and creating complete applications from concept to deployment. I combine academic learning with practical project work to deliver reliable and modern software solutions.I believe in continuous learning, clean code, and professional communication. Always open to new opportunities, collaborations, and challenging projects.</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Skills</h2>
        <div className="mt-2">
          <p>MERN Stack Development (MongoDB, Express.js, React.js, Node.js)</p>
          <div className="w-full bg-gray-700 h-2 rounded">
            <div className="bg-purple-500 h-2 w-4/5"></div>
          </div>
        </div>

        <br />

        <div className="mt-2">
          <p>REST API Development</p>
          <div className="w-full bg-gray-700 h-2 rounded">
            <div className="bg-purple-500 h-2 w-5/5"></div>
          </div>
        </div>

        <br />

        <div className="mt-2">
          <p>Frontend: React.js, Tailwind CSS</p>
          <div className="w-full bg-gray-700 h-2 rounded">
            <div className="bg-purple-500 h-2 w-5/5"></div>
          </div>
        </div>
        <br />

        <div className="mt-2">
          <p>Backend: Node.js, Express.js</p>
          <div className="w-full bg-gray-700 h-2 rounded">
            <div className="bg-purple-500 h-2 w-5/6"></div>
          </div>
        </div>
        <br />

        <div className="mt-2">
          <p>Database: MongoDB</p>
          <div className="w-full bg-gray-700 h-2 rounded">
            <div className="bg-purple-500 h-2 w-3/5"></div>
          </div>
        </div>
      


      </div>
    </div>
  );
};

export default About;