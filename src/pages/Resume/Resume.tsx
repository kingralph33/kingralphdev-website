import ResumeEducation from "../../components/resume/ResumeEducation";
import ResumeExperience from "../../components/resume/ResumeExperience";
import ResumeHeader from "../../components/resume/ResumeHeader";
import ResumeSummary from "../../components/resume/ResumeSummary";
import ResumeTechnicalSkills from "../../components/resume/ResumeTechnicalSkills";

const Resume = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ResumeHeader />
      <ResumeSummary />
      <ResumeTechnicalSkills />
      <ResumeExperience />
      <ResumeEducation />
    </div>
  );
};

export default Resume;
