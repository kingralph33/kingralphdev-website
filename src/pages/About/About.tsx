const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Me</h1>
      <p className="text-lg text-gray-600 dark:text-gray-100 text-left mb-6">
        Hi there!
      </p>
      <p className="text-lg text-gray-600 dark:text-gray-100 indent-8 text-left mb-2">
        I'm a software developer with a passion for building and
        problem-solving. My journey into tech began in 2016, transitioning from
        a background in retail and small business banking. Since then, I've
        gained experience in software quality assurance, full-stack development
        (Python/Flask/Django and MEAN stack), and DevOps, working with
        technologies like Java, JavaScript, PHP, and cloud platforms like
        OpenShift and Azure. Currently, I'm contributing to projects at the
        Federal Government.
      </p>
      <p className="text-lg text-gray-600 dark:text-gray-100 indent-8 text-left mb-12">
        Outside of work, I enjoy spending time with my wonderful wife and
        daughter. We love exploring new restaurants and new construction
        residential communities. I'm also currently on a fitness journey,
        balancing my lifelong love of strength training with a newfound
        appreciation for cardio.
      </p>

      {/* Divider */}
      <hr className="border-gray-200 dark:border-gray-700 mb-12" />

      {/* Three Column Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Favorite Sports
          </h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-100">
            <li>American Football</li>
            <li>Mixed Martial Arts</li>
            <li>Basketball</li>
          </ul>
        </div>

        {/* Middle Column */}
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Favorite Foods
          </h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-100">
            <li>Pizza</li>
            <li>Jerk Chicken</li>
            <li>Steak & Cheese</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Favorite Teams
          </h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-100">
            <li>Philadelphia Eagles</li>
            <li>Maryland Basketball</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
