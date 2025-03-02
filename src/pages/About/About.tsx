const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Me</h1>
      <p className="text-lg text-gray-600 dark:text-gray-100 text-left mb-6">
        Welcome to my portfolio.
      </p>
      <p className="text-lg text-gray-600 dark:text-gray-100 indent-8 text-left mb-2">
        I'm a software developer specializing in cloud solutions and full-stack
        development. My journey into technology began in 2016, transitioning
        from a background in retail and small business banking. Since then, I've
        developed expertise in software quality assurance, full-stack
        development (Python/Flask/Django and MEAN stack), and DevOps. I work
        extensively with Java, JavaScript, PHP, and cloud platforms including
        OpenShift and Azure. Currently, I'm leveraging these skills on impactful
        projects at the Federal Government level.
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
            <li>Machine Learning Cloud Engineering</li>
            <li>Cloud Solutions</li>
          </ul>
        </div>

        {/* Middle Column */}
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Current Focus
          </h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-100">
            <li>Machine Learning Cloud Engineering</li>
            <li>AWS Solutions Architecture Certification</li>
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
