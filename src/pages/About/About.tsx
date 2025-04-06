const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Me</h1>
      <p className="text-lg text-gray-600 dark:text-gray-100 text-left mb-6">
        Welcome to my site!
      </p>
      <p className="text-lg text-gray-600 dark:text-gray-100 indent-8 text-left mb-2">
        My journey into tech wasn't a straight line. I started in retail
        banking, but I was always fascinated by how technology could solve
        problems and make things more efficient. In 2016, I decided to make a
        career change and never looked back. I immersed myself in coding,
        completing a bootcamp and quickly gaining experience in software quality
        assurance and full-stack development. Now, I'm passionate about building
        scalable and reliable cloud solutions, and I'm particularly excited
        about the potential of Machine Learning Cloud Engineering. I'm currently
        working on getting my AWS Solutions Architect Certification. I'm always
        eager to learn new things and collaborate with other passionate
        developers. If you'd like to connect, please don't hesitate to reach
        out!
      </p>
      <p className="text-lg text-gray-600 dark:text-gray-100 indent-8 text-left mb-12">
        Beyond my professional work, I maintain a balanced lifestyle that
        includes family time and personal development. I'm passionate about
        continuous learning in technology and maintain an active fitness
        routine, combining strength training with cardiovascular exercise. This
        balanced approach helps me stay sharp and creative in my technical work.
      </p>

      {/* Divider */}
      <hr className="border-gray-200 dark:border-gray-700 mb-12" />

      {/* Three Column Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Technical Interests
          </h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-100">
            <li>Software Engineering</li>
            <li>AI & ML Engineering</li>
            <li>Cloud Solutions</li>
          </ul>
        </div>

        {/* Middle Column */}
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Current Focus
          </h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-100">
            <li>AI Engineering</li>
            <li>AWS Certified Solutions Architect - Associate Exam</li>
            <li>System Design</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Professional Interests
          </h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-100">
            <li>Automation and Efficiency</li>
            <li>Process Optimization</li>
            <li>Scalable and Reliable Systems</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
