const Resume = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">RALPH KING JR</h1>
        <p className="text-gray-600">
          Remote | ralph@kingralph.dev
        </p>
        <hr className="border-gray-300 mx-auto" />
      </header>

      {/* Summary Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">SUMMARY</h2>
        <p className="text-gray-700 text-left">
          Highly motivated Senior Software Engineer with a proven track record of delivering high-quality software solutions. 
          Skilled in full-stack development, automation, and team leadership. Proficient in Python, and JavaScript. 
          Successfully led teams to increase efficiency through automation and reduced development time by implementing CI/CD 
          and seeking a challenging role to leverage my expertise and contribute to innovative projects.
        </p>
      </section>

      {/* Experience Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6">PROFESSIONAL EXPERIENCE</h2>
        
        {/* USDA Senior Role */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-left">Senior Software Engineer / IT Specialist (APPSW)</h3>
          <p className="text-gray-600 text-left">Department of Agriculture (USDA) - Food Safety and Inspection Service (FSIS)</p>
          <p className="text-gray-600 text-left mb-2">Washington, DC | January 2025 - Present</p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 text-left mb-10">
            <li>Lead engineer for multiple applications, primarily using Python with Django and Flask.</li>
            <li>Collaborate with the DevOps team to manage Azure DevOps and OpenShift software configurations for CI/CD.</li>
            <li>Mentored two interns on the Software Development Life Cycle (SDLC), resulting in significant skill improvement.</li>
            <li>Serve as technical advisor for application development within FSIS, informing, developing, and recommending technical solutions to senior management.</li>
            <li>Generate and review the Level of Effort and Independent Government Cost Estimates.</li>
            <li>Provide oversight and technical leadership for external contract development, ensuring compliance with FSIS standards, policies, and infrastructure architecture.</li>
            <li>Inform, develop, and recommend technical solutions for senior management.</li>
            <li>Serving as a Contracting Officer Representative (COR).</li>
          </ul>
        </div>

        {/* USDA SDET Role */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-left">Software Developer Engineer in Test / IT Specialist (APPSW)</h3>
          <p className="text-gray-600 text-left">Department of Agriculture (USDA) - Food Safety and Inspection Service (FSIS)</p>
          <p className="text-gray-600 mb-2 text-left">Washington, DC | September 2020 - January 2025</p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 text-left">
            <li>Designed, coded, and deployed automation tests for nine apps for FSIS using Java, Ruby, Selenium, TestNG, TypeScript, JavaScript, Playwright, and JUnit.</li>
            <li>Integrated automation tests into CI/CD pipelines using Azure DevOps.</li>
            <li>Led the development of a business process automation application using Django (Python), Elastic Search, OpenShift, and Postgres.</li>
            <li>Successfully implemented load testing for the FSIS apps using LoadRunner</li>
            <li>Improved 508 testing efforts.</li>
            <li>Managed IT acquisition packages totaling $600,000, ensuring FAR compliance.</li>
            <li>Led the upgrade from Microsoft Team Foundation Server to Microsoft DevOps 2020</li>
          </ul>
        </div>

        {/* Skyline SDE Role */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-left">Software Development Engineer</h3>
          <p className="text-gray-600 text-left">Skyline Technology Solutions</p>
          <p className="text-gray-600 mb-2 text-left">Glen Burnie, MD | August 2019 - September 2020</p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 text-left mb-10">
            <li>Led development efforts for a variety of projects, demonstrating expertise in full-stack web development</li>
            <li>Maintained and enhanced a federal benefits application for a non-profit organization using Java, JBoss Application Server, PostgreSQL, Linux, Docker, and Docker Compose</li>
            <li>Led the development of the redesigned Skyline Technology Solutions website using PHP, Yii2 framework, CraftCMS, MySQL, Docker, Docker Compose, and AWS RDS</li>
            <li>Maintained and added features to a public services application providing snow plow and traffic accident information using JavaScript, Angular Framework, PHP, Yii2 framework, and the Elastic Stack</li>
            <li>Enhanced the dashboard for a real-time distributed video platform using JavaScript, NodeJS, React, and MySQL</li>
            <li>Maintained the GUI for the backend system utilizing Python and Flask framework</li>
          </ul>
        </div>

        {/* Skyline SDET Role */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-left">Software Development Engineer in Test</h3>
          <p className="text-gray-600 text-left">Skyline Technology Solutions</p>
          <p className="text-gray-600 mb-2 text-left">Glen Burnie, MD | August 2017 - August 2019</p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 text-left mb-10">
            <li>Led the development and maintenance of automated testing solutions for various software applications</li>
            <li>Developed system requirements, code, and documentation for automated tests of real-time video streams using SikuliX and Python</li>
            <li>Led the development and maintenance of automated tests for a video platform dashboard using WebdriverIO and JavaScript</li>
            <li>Led the development and maintenance of API automated tests for a real-time distributed video platform using Postman and JavaScript</li>
          </ul>
        </div>
      </section>

      {/* Education Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">EDUCATION AND CERTIFICATIONS</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1 text-left">
          <li>Coding Dojo Coding Bootcamp - Technical or Occupational Certificate (Issued March 2019)</li>
          <li>
            <a 
              href="https://learn.microsoft.com/api/credentials/share/en-us/KingJrRalphFSIS-8974/B9FC9F5037636B30?sharingId=12CE0D4A3AFD6695"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Microsoft Certified: Azure Fundamentals (Issued Jan 2024)
            </a>
          </li>
        </ul>
      </section>

      {/* Skills Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">TECHNICAL SKILLS</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1 text-left">
          <li><strong>Programming Languages:</strong> Python, JavaScript, Java, PHP, Ruby, TypeScript</li>
          <li><strong>Frameworks:</strong> Django, Yii2, Angular, React, Flask, Node.js</li>
          <li><strong>Databases:</strong> PostgreSQL, MySQL, Elasticsearch</li>
          <li><strong>Cloud Platforms:</strong> Azure DevOps, OpenShift</li>
          <li><strong>Tools:</strong> Docker, Docker Compose, AWS RDS, Terraform, Selenium, TestNG, Playwright, JUnit, Postman, WebdriverIO, SikuliX, LoadRunner Professional for load testing</li>
          <li><strong>Other:</strong> CI/CD, 508 Compliance, IT Acquisition (COR Level I)</li>
        </ul>
      </section>
    </div>
  )
}

export default Resume