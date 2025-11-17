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
          From Banking to Building Government Systems
        </h2>
        <p className="text-sm lg:text-base text-gray-700 dark:text-gray-100 dark:font-semibold text-left md:text-justify leading-relaxed mb-3">
          My journey into tech wasn't typical. I started in retail banking, but I was always fascinated by how technology could solve problems and make operations more efficient. In 2016, I made the career change that would define my next chapter.
        </p>
        <p className="text-sm lg:text-base text-gray-700 dark:text-gray-100 dark:font-semibold text-left md:text-justify leading-relaxed">
          I immersed myself in coding, completed an intensive bootcamp, and quickly progressed from software quality assurance to full-stack development, and eventually to internal tools and platform engineering. This non-traditional path gave me a unique perspective: I understand both the business problems that technology solves and the developer experience challenges that slow teams down.
        </p>
      </div>

      {/* Current Professional Summary */}
      <p className="text-sm lg:text-base text-gray-700 dark:text-gray-100 dark:font-semibold text-left md:text-justify leading-relaxed mb-4">
        Today, I'm an internal tools and platform engineer with 5+ years of experience building developer productivity infrastructure and automation in high-stakes government environments. I specialize in Kubernetes (OpenShift), CI/CD automation, and self-service tooling, creating platforms that enable development teams to ship faster and more reliably. My focus is on developer experience: removing friction, automating toil, and building tools that let engineers focus on delivering value instead of fighting infrastructure.
      </p>
      <p className="text-sm lg:text-base text-gray-700 dark:text-gray-100 dark:font-semibold text-left md:text-justify leading-relaxed mb-4">
        I currently architect and operate OpenShift infrastructure serving 7,500+ users across 9 enterprise applications. My work focuses on building self-service deployment capabilities, establishing engineering standards, and creating automation that eliminates manual toil. I've reduced release cycles by 70% and enabled teams to deploy independently through platform tooling.
      </p>
      <p className="text-sm lg:text-base text-gray-700 dark:text-gray-100 dark:font-semibold text-left md:text-justify leading-relaxed mb-8">
        While platform infrastructure is my specialty, I'm comfortable across the stack - from Python and TypeScript for building automation tools, to cloud infrastructure on AWS and Azure, to container orchestration and deployment pipelines. I'm currently exploring Terraform and deepening my expertise in infrastructure as code patterns.
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
            Technical Interests
          </h2>
          <ul className="space-y-1.5 text-gray-700 dark:text-gray-100 text-sm">
            <li>Internal Tools & Developer Productivity</li>
            <li>Platform Automation & Self-Service Infrastructure</li>
            <li>CI/CD Architecture & Developer Experience</li>
          </ul>
        </div>

        {/* Middle Column */}
        <div className="text-center">
          <h2 className="text-lg lg:text-xl font-semibold mb-3 text-blue-900 dark:text-white">
            Current Focus
          </h2>
          <ul className="space-y-1.5 text-gray-700 dark:text-gray-100 text-sm">
            <li>Kubernetes/OpenShift Optimization</li>
            <li>CI/CD Architecture</li>
            <li>Infrastructure Automation</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="text-center">
          <h2 className="text-lg lg:text-xl font-semibold mb-3 text-blue-900 dark:text-white">
            Professional Interests
          </h2>
          <ul className="space-y-1.5 text-gray-700 dark:text-gray-100 text-sm">
            <li>Developer Productivity</li>
            <li>Platform Reliability</li>
            <li>Self-Service Infrastructure</li>
          </ul>
        </div>
      </div>

      {/* Technology Expertise (moved from Home) */}
      <section className="mt-16 lg:mt-20">
        <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6 text-blue-900 dark:text-white">
          Technology Expertise
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="mb-5">
            <h3 className="text-base font-semibold mb-2 text-center text-blue-900 dark:text-gray-400">
              Platform & Infrastructure
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {["Kubernetes/OpenShift", "CI/CD Automation", "Infrastructure as Code"].map((tech) => (
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
              Cloud & DevOps
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {["AWS", "Azure", "Terraform", "Docker", "Azure DevOps"].map((tech) => (
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
              Development & Tooling
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {["Python", "TypeScript", "JavaScript", "Node.js", "Developer Tooling"].map((tech) => (
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
          Recent Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="p-5 border-2 border-blue-900 dark:border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-lg font-bold mb-2 text-blue-900 dark:text-white">
              Platform Operations & Internal Tools
            </h3>
            <p className="text-sm text-gray-700 dark:text-white dark:font-semibold mb-3">
              Architected and operate container platform serving 7,500+ users across 9 enterprise applications with automated CI/CD pipelines, self-service deployment capabilities, and internal tooling that enables developers to deploy independently
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["OpenShift", "Kubernetes", "CI/CD", "Azure DevOps", "Python"].map((tech) => (
                <span key={tech} className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="p-5 border-2 border-blue-900 dark:border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-lg font-bold mb-2 text-blue-900 dark:text-white">
              Developer Productivity Initiative
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-100 dark:font-semibold mb-3">
              Led enterprise platform migration from TFS to Azure DevOps for multiple teams, building automated deployment pipelines and self-service workflows that reduced release cycles by 70% and eliminated platform team bottlenecks
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Azure DevOps", "CI/CD", "Automation", "Infrastructure as Code"].map((tech) => (
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
