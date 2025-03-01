import React from "react";

const ResumeEducation: React.FC = () => {
  return (
    <section className="mb-8">
      <h2 className="section-h2">EDUCATION AND CERTIFICATIONS</h2>
      <ul className="list-adaptive">
        <li>Coding Dojo Coding Bootcamp Certificate (Completed March 2019)</li>
        <li>
          <a
            href="https://learn.microsoft.com/api/credentials/share/en-us/KingJrRalphFSIS-8974/B9FC9F5037636B30?sharingId=12CE0D4A3AFD6695"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
          >
            Microsoft Certified Azure Fundamentals (Completed Jan 2024)
          </a>
        </li>
        <li>
          <a>
            AWS Certified Solutions Architect - Associate (
            <strong className="text-adaptive-bold">In Progress</strong> /
            Expected Completion: April 2025)
          </a>
        </li>
      </ul>
    </section>
  );
};

export default ResumeEducation;
