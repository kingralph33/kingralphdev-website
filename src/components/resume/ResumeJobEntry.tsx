import React from "react";

interface JobEntry {
  title: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  responsibilities: string[];
}

const ResumeJobEntry: React.FC<JobEntry> = ({
  title,
  company,
  location,
  period,
  summary,
  responsibilities,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-left">{title}</h3>
      <p className="p-header">{company}</p>
      <p className="p-header mb-4">
        {location} | {period}
      </p>
      <p className="p-job-summary">{summary}</p>
      <ul className="ul-job-points">
        {responsibilities.map((responsibility, index) => (
          <li key={index}>{responsibility}</li>
        ))}
      </ul>
    </div>
  );
};

export default ResumeJobEntry;
