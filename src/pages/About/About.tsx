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
          className="w-32 h-32 lg:w-36 lg:h-36 rounded-full object-cover mb-4 border-4 border-green-600 dark:border-gray-200"
          loading="eager"
        />
        <h1 className="text-2xl lg:text-3xl font-bold mb-3 text-center text-blue-900 dark:text-white">
          About Me
        </h1>
      </div>

      {/* Career Transition Story - Prominently Featured */}
      <div className="bg-gray-100 dark:bg-gray-800 p-5 lg:p-6 rounded-lg mb-8 border-l-4 border-green-600 dark:border-gray-200">
        <h2 className="text-xl lg:text-2xl font-bold mb-4 text-center text-blue-900 dark:text-white">
          From Banking to Building Government Systems
        </h2>
        <p className="text-sm lg:text-base text-gray-700 dark:text-gray-100 dark:font-semibold text-left md:text-justify leading-relaxed mb-3">
          My journey into tech wasn't typical. I started in retail banking, but I was always fascinated by how technology could solve problems and make operations more efficient. In 2016, I made the career change that would define my next chapter.
        </p>
        <p className="text-sm lg:text-base text-gray-700 dark:text-gray-100 dark:font-semibold text-left md:text-justify leading-relaxed">
          I immersed myself in coding, completed an intensive bootcamp, and quickly progressed from software quality assurance to full-stack development, and eventually to platform engineering. This non-traditional path gave me a unique perspective: I understand both the business problems that technology solves and the technical systems needed to deliver reliable infrastructure.
        </p>
      </div>

      {/* Current Professional Summary */}
      <p className="text-sm lg:text-base text-gray-700 dark:text-gray-100 dark:font-semibold text-left md:text-justify leading-relaxed mb-4">
        Today, I'm a software engineer with 5+ years of experience building cloud-native infrastructure and developer tooling in high-stakes government environments. I specialize in Kubernetes (OpenShift), CI/CD automation, and infrastructure as code, creating platforms that enable development teams to ship faster and more reliably.
      </p>
      <p className="text-sm lg:text-base text-gray-700 dark:text-gray-100 dark:font-semibold text-left md:text-justify leading-relaxed mb-4">
        I currently architect and operate OpenShift infrastructure serving 7,500+ users across 9 enterprise applications. My work focuses on building self-service deployment capabilities, establishing engineering standards, and creating automation that eliminates manual toil. I've reduced release cycles by 70% and enabled teams to deploy independently through platform tooling.
      </p>
      <p className="text-sm lg:text-base text-gray-700 dark:text-gray-100 dark:font-semibold text-left md:text-justify leading-relaxed mb-8">
        While platform infrastructure is my specialty, I'm comfortable across the stack - from Python and TypeScript for building automation tools, to cloud infrastructure on AWS and Azure, to container orchestration and deployment pipelines. I'm currently exploring Terraform and deepening my expertise in infrastructure as code patterns.
      </p>

      {/* Personal Life Section */}
      <div className="bg-gray-100 dark:bg-gray-800 p-5 lg:p-6 rounded-lg mb-8 border-l-4 border-green-600 dark:border-gray-200">
        <h2 className="text-xl lg:text-2xl font-bold mb-4 text-center text-blue-900 dark:text-white">
          Beyond the Code
        </h2>
        <p className="text-sm lg:text-base text-gray-700 dark:text-gray-100 dark:font-semibold text-left md:text-justify leading-relaxed mb-3">
          Above all, I'm a husband and a father. Family is my foundation, and they're one of the reasons I strive to be better every day.
        </p>
        <p className="text-sm lg:text-base text-gray-700 dark:text-gray-100 dark:font-semibold text-left md:text-justify leading-relaxed mb-3">
          In my spare time, I love unwinding with PlayStation games—<span className="italic">Ghost of Tsushima</span> is a particular favorite. There's something therapeutic about exploring those beautiful landscapes and perfecting combat mechanics after a long day of debugging infrastructure issues.
        </p>
        <p className="text-sm lg:text-base text-gray-700 dark:text-gray-100 dark:font-semibold text-left md:text-justify leading-relaxed">
          I used to be big into working out, hitting the gym regularly for strength training and cardio. Lately though, learning new technologies has taken priority in my free time. The tech landscape moves fast, and I find the challenge of mastering new tools and frameworks just as rewarding as physical fitness. Who knows—maybe I'll find a way to balance both again soon!
        </p>
      </div>

      {/* Divider */}
      <hr className="border-green-600 dark:border-gray-200 border-2 mb-8" />

      {/* Three Column Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="text-center">
          <h2 className="text-base lg:text-lg font-bold mb-3 text-blue-900 dark:text-white">
            Technical Interests
          </h2>
          <ul className="space-y-1.5 text-gray-600 dark:text-gray-100 text-sm">
            <li>Platform Engineering</li>
            <li>Infrastructure as Code</li>
            <li>Developer Experience & Tooling</li>
          </ul>
        </div>

        {/* Middle Column */}
        <div className="text-center">
          <h2 className="text-base lg:text-lg font-bold mb-3 text-blue-900 dark:text-white">
            Current Focus
          </h2>
          <ul className="space-y-1.5 text-gray-600 dark:text-gray-100 text-sm">
            <li>Kubernetes/OpenShift Optimization</li>
            <li>CI/CD Architecture</li>
            <li>Infrastructure Automation</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="text-center">
          <h2 className="text-base lg:text-lg font-bold mb-3 text-blue-900 dark:text-white">
            Professional Interests
          </h2>
          <ul className="space-y-1.5 text-gray-600 dark:text-gray-100 text-sm">
            <li>Developer Productivity</li>
            <li>Platform Reliability</li>
            <li>Self-Service Infrastructure</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
