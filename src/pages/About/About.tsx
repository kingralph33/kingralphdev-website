const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 lg:py-10">
      {/* Profile Picture and Header */}
      <div className="flex flex-col items-center mb-8">
        <img
          src="/images/profile2.webp"
          alt="Ralph King Jr"
          width="150"
          height="150"
          className="w-32 h-32 lg:w-36 lg:h-36 rounded-full object-cover mb-4 ring-2 ring-green-600 dark:ring-gray-400"
          loading="eager"
        />
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-center text-blue-900 dark:text-white">
          About Me
        </h1>
      </div>

      {/* Career Transition Story - Prominently Featured */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 lg:p-8 rounded-lg mb-12 lg:mb-16 border-l-2 border-green-600 dark:border-gray-700">
        <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-center text-blue-900 dark:text-white">
          From Banking to Building Software
        </h2>
        <p className="text-sm lg:text-base text-gray-700 dark:text-gray-100 dark:font-semibold text-left md:text-justify leading-relaxed mb-3">
          My journey into tech wasn't typical. I started in retail banking, but I was always fascinated by how technology could solve problems and make operations more efficient. In 2016, I made the career change that would define my next chapter.
        </p>
        <p className="text-sm lg:text-base text-gray-700 dark:text-gray-100 dark:font-semibold text-left md:text-justify leading-relaxed">
          I immersed myself in coding, completed an intensive bootcamp, and quickly progressed from software quality assurance to full-stack development. This non-traditional path gave me a unique perspective: I understand both the business problems that technology solves and the technical realities of shipping software that works.
        </p>
      </div>

      {/* Current Professional Summary */}
      <p className="text-sm lg:text-base text-gray-700 dark:text-gray-100 dark:font-semibold text-left md:text-justify leading-relaxed mb-4">
        Today, I'm a software engineer with 8+ years of experience building and shipping web applications end-to-end for mission-critical government systems. I combine hands-on development with product ownership—working directly with stakeholders to identify requirements, making technical and product decisions, and delivering solutions from problem definition to production.
      </p>
      <p className="text-sm lg:text-base text-gray-700 dark:text-gray-100 dark:font-semibold text-left md:text-justify leading-relaxed mb-4">
        Much of my recent work has focused on building web applications using Python, Django, JavaScript, and React, alongside platform engineering—architecting CI/CD automation infrastructure, managing container orchestration with OpenShift/Kubernetes, and creating deployment automation that enables teams to ship faster and more reliably.
      </p>
      <p className="text-sm lg:text-base text-gray-700 dark:text-gray-100 dark:font-semibold text-left md:text-justify leading-relaxed mb-8">
        I'm comfortable across the stack and beyond. I write Python and JavaScript, build with Django and React, work with PostgreSQL and Elasticsearch, deploy on Azure and AWS, manage Kubernetes clusters, and create CI/CD pipelines. I value solving real problems over technical specialization—if learning a new tool or domain helps ship better software, I'll learn it.
      </p>

      {/* Personal Life Section */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 lg:p-8 rounded-lg mb-12 lg:mb-16 border-l-2 border-green-600 dark:border-gray-700">
        <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-center text-blue-900 dark:text-white">
          Beyond the Code
        </h2>
        <p className="text-sm lg:text-base text-gray-700 dark:text-gray-100 dark:font-semibold text-left md:text-justify leading-relaxed mb-3">
          Above all, I'm a husband and a father. Family is my foundation, and they're one of the reasons I strive to be better every day.
        </p>
        <p className="text-sm lg:text-base text-gray-700 dark:text-gray-100 dark:font-semibold text-left md:text-justify leading-relaxed mb-3">
          In my spare time, I love unwinding with PlayStation games—<span className="italic">Ghost of Tsushima</span> is a particular favorite. There's something therapeutic about exploring those beautiful landscapes and perfecting combat mechanics after a long day of debugging infrastructure issues.
        </p>
        <p className="text-sm lg:text-base text-gray-700 dark:text-gray-100 dark:font-semibold text-left md:text-justify leading-relaxed">
          I used to be big into working out, hitting the gym regularly for strength training and cardio. Lately though, I've been investing my free time in deepening my expertise in cloud-native technologies and infrastructure automation. The tech landscape moves fast, and I find the challenge of mastering new tools and frameworks just as rewarding as physical fitness.
        </p>
      </div>

      {/* Section divider for spacing */}
      <hr className="border-0 h-12 lg:h-16 bg-transparent" aria-hidden="true" />

      {/* Three Column Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 lg:mb-16 mt-12 lg:mt-16">
        {/* Left Column */}
        <div className="text-center">
          <h2 className="text-lg lg:text-xl font-semibold mb-3 text-blue-900 dark:text-white">
            What I Build
          </h2>
          <ul className="space-y-1.5 text-gray-700 dark:text-gray-100 text-sm">
            <li>Backend Services & APIs</li>
            <li>Automation & Developer Tools</li>
            <li>Deployment Systems & Infrastructure</li>
          </ul>
        </div>

        {/* Middle Column */}
        <div className="text-center">
          <h2 className="text-lg lg:text-xl font-semibold mb-3 text-blue-900 dark:text-white">
            Current Learning
          </h2>
          <ul className="space-y-1.5 text-gray-700 dark:text-gray-100 text-sm">
            <li>Infrastructure as Code</li>
            <li>System Design Patterns</li>
            <li>Cloud Architecture</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="text-center">
          <h2 className="text-lg lg:text-xl font-semibold mb-3 text-blue-900 dark:text-white">
            What I Value
          </h2>
          <ul className="space-y-1.5 text-gray-700 dark:text-gray-100 text-sm">
            <li>Shipping Working Software</li>
            <li>Solving Real Problems</li>
            <li>Learning New Domains</li>
          </ul>
        </div>
      </div>

      {/* Technology Expertise (moved from Home) */}
      <section className="mt-16 lg:mt-20">
        <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6 text-blue-900 dark:text-white">
          Technologies I Work With
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="mb-5">
            <h3 className="text-base font-semibold mb-2 text-center text-blue-900 dark:text-gray-400">
              Languages & Frameworks
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {["Python", "JavaScript", "TypeScript", "Django", "Flask", "React", "Node.js"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs lg:text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-5">
            <h3 className="text-base font-semibold mb-2 text-center text-blue-900 dark:text-gray-400">
              Platform & Infrastructure
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {["Kubernetes", "OpenShift", "Docker", "Azure", "AWS"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs lg:text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold mb-2 text-center text-blue-900 dark:text-gray-400">
              CI/CD & Databases
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {["Azure DevOps", "GitHub Actions", "PostgreSQL", "MySQL", "Elasticsearch"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs lg:text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Impact (moved from Home) */}
      <section className="mt-16 lg:mt-20">
        <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8 text-blue-900 dark:text-white">
          Recent Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="p-5 border-2 border-blue-900 dark:border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-lg font-bold mb-2 text-blue-900 dark:text-white">
              Web Applications & Product Development
            </h3>
            <p className="text-sm text-gray-700 dark:text-white dark:font-semibold mb-3">
              Build and ship Django-based web applications end-to-end for federal agency operations, working directly with stakeholders to identify requirements and make product decisions. Shipped workflow automation application that achieved immediate adoption, reducing approval times from weeks to same-day turnaround.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Python", "Django", "JavaScript", "React", "PostgreSQL"].map((tech) => (
                <span key={tech} className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="p-5 border-2 border-blue-900 dark:border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-lg font-bold mb-2 text-blue-900 dark:text-white">
              Platform Engineering & Infrastructure
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-100 dark:font-semibold mb-3">
              Manage OpenShift deployment infrastructure for mission-critical enterprise applications, including namespace management across multiple environments. Architected CI/CD automation infrastructure for nine applications, creating deployment pipelines and self-service workflows that enable teams to ship independently.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Kubernetes", "OpenShift", "CI/CD", "Azure DevOps", "Docker"].map((tech) => (
                <span key={tech} className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
