const Contact = () => {
  return (
    <div className="p-10">
      <h1 className="text-3xl mb-4">Contact Me</h1>
      <form className="flex flex-col gap-4 max-w-md">
        <input className="p-2 bg-gray-800" placeholder="Name" />
        <input className="p-2 bg-gray-800" placeholder="Email" />
        <textarea className="p-2 bg-gray-800" placeholder="Message"></textarea>
        <button className="bg-purple-500 p-2 rounded">Send</button>
      </form>
    </div>
  );
};

export default Contact;