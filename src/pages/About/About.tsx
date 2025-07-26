const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12 xl:py-16">
      <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-12 text-center">
        About Me
      </h1>
      
      {/* Career Transition Story - Prominently Featured */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 lg:p-8 rounded-lg mb-12">
        <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          From Banking to Building Government Systems
        </h2>
        <p className="text-lg lg:text-xl xl:text-2xl text-gray-700 dark:text-gray-200 text-left md:text-justify leading-relaxed mb-4">
          My journey into tech wasn't typical. I started in retail banking, but I was always fascinated by how technology could solve problems and make operations more efficient. In 2016, I made the career change that would define my next chapter.
        </p>
        <p className="text-lg lg:text-xl xl:text-2xl text-gray-700 dark:text-gray-200 text-left md:text-justify leading-relaxed">
          I immersed myself in coding, completed an intensive bootcamp, and quickly progressed from software quality assurance to full-stack development. This non-traditional path gave me a unique perspective: I understand both the business problems that technology solves and the technical skills needed to build robust solutions.
        </p>
      </div>

      {/* Current Professional Summary */}
      <p className="text-lg lg:text-xl xl:text-2xl text-gray-700 dark:text-gray-200 text-left md:text-justify leading-relaxed mb-6">
        Today, I'm a software engineer with over 5 years of experience building scalable web applications and automating complex workflows in high-stakes government environments. I specialize in Python and Django on the backend, with expertise in AWS, Azure, and OpenShift deployments.
      </p>
      <p className="indent-6 lg:indent-10 xl:indent-14 text-lg lg:text-xl xl:text-2xl text-gray-700 dark:text-gray-200 text-left md:text-justify leading-relaxed mb-6">
        I've led the development of systems that replaced expensive vendor tools, streamlined manual processes, and delivered measurable impact on operational efficiency. My work has saved organizations over $1M annually while serving thousands of users with 100% compliance rates.
      </p>
      <p className="indent-6 lg:indent-10 xl:indent-14 text-lg lg:text-xl xl:text-2xl text-gray-700 dark:text-gray-200 text-left md:text-justify leading-relaxed mb-2">
        While backend development is my specialty, I'm comfortable across the full stack with JavaScript/TypeScript, React, and modern DevOps practices. I'm currently pursuing my AWS Solutions Architect certification and am particularly excited about the intersection of AI and cloud engineering.
      </p>
      <p className=" indent-6 lg:indent-10 xl:indent-14 text-lg lg:text-xl xl:text-2xl text-gray-700 dark:text-gray-200 text-left md:text-justify leading-relaxed mb-12">
        Beyond my professional work, I maintain a balanced lifestyle that
        includes family time and personal development. I'm passionate about
        continuous learning in technology and maintain an active fitness
        routine, combining strength training with cardiovascular exercise. This
        balanced approach helps me stay sharp and creative in my technical work.
      </p>

      {/* Divider */}
      <hr className="border-gray-200 dark:border-gray-700 mb-12" />

      {/* Three Column Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
        {/* Left Column */}
        <div className="text-center">
          <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Technical Interests
          </h2>
          <ul className="space-y-2 lg:space-y-3 xl:space-y-4 text-gray-600 dark:text-gray-100 text-base lg:text-lg xl:text-xl">
            <li>Software Engineering</li>
            <li>AI & ML Engineering</li>
            <li>Cloud Solutions</li>
          </ul>
        </div>

        {/* Middle Column */}
        <div className="text-center">
          <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Current Focus
          </h2>
          <ul className="space-y-2 lg:space-y-3 xl:space-y-4 text-gray-600 dark:text-gray-100 text-base lg:text-lg xl:text-xl">
            <li>AI Engineering</li>
            <li>AWS Certified Solutions Architect - Associate Exam</li>
            <li>System Design</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="text-center">
          <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Professional Interests
          </h2>
          <ul className="space-y-2 lg:space-y-3 xl:space-y-4 text-gray-600 dark:text-gray-100 text-base lg:text-lg xl:text-xl">
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
