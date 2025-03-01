import React from "react";

const ResumeEducation: React.FC = () => {
  return (
    <section className="mb-8">
      <h2 className="section-h2">EDUCATION AND CERTIFICATIONS</h2>
      <ul className="list-disc pl-5 text-gray-700 space-y-1 text-left">
        <li>Coding Dojo Coding Bootcamp Certificate (Completed March 2019)</li>
        <li>
          <a
            href="https://learn.microsoft.com/api/credentials/share/en-us/KingJrRalphFSIS-8974/B9FC9F5037636B30?sharingId=12CE0D4A3AFD6695"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Microsoft Certified Azure Fundamentals (Completed Jan 2024)
          </a>
        </li>
        <li>
          <a>
            AWS Certified Solutions Architect - Associate (
            <strong>In Progress</strong> / Expected Completion: April 2025)
          </a>
        </li>
      </ul>
    </section>
  );
};

export default ResumeEducation;
