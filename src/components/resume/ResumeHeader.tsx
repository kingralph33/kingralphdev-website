import React from "react";

const ResumeHeader: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
        RALPH KING JR
      </h1>
      <p className="text-gray-600 dark:text-gray-100">
        ralph@kingralph.dev | Remote or Washington DC-Baltimore Area
      </p>
      <hr className="border-gray-300 dark:border-gray-700 mx-auto" />
    </header>
  );
};

export default ResumeHeader;
