// src/ResultForm.js
import React, { useState } from 'react';

const ResultForm = ({ onSubmit }) => {
  const [marks, setMarks] = useState({
    maths: 0,
    science: 0,
    gujarati: 0,
    ss: 0,
    english: 0,
    sanskrit: 0,
  });

  const [subjectFail, setSubjectFail] = useState('');

  const handleChange = (subject, value) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [subject]: value,
    }));
    // Reset subjectFail when user changes marks
    setSubjectFail('');
  };

  const calculatePercentage = () => {
    const totalMarks = Object.values(marks).reduce((acc, curr) => acc + curr, 0);
    const percentage = (totalMarks / 600) * 100;
    return percentage.toFixed(2);
  };

  const calculateGrade = () => {
    const percentage = calculatePercentage();
    if (percentage >= 90) return 'A1';
    if (percentage >= 80) return 'A2';
    if (percentage >= 70) return 'B1';
    if (percentage >= 60) return 'B2';
    if (percentage >= 50) return 'C1';
    if (percentage >= 40) return 'C2';
    if (percentage >= 35) return 'D';
    return 'Fail';
  };

  const handleSubmit = () => {
    const percentage = calculatePercentage();
    const grade = calculateGrade();

    // Check if any subject has less than 35 marks
    const failSubject = Object.keys(marks).find((subject) => marks[subject] < 35);

    if (failSubject) {
      setSubjectFail(`You are fail in ${failSubject}`);
    } else {
      setSubjectFail(''); // Reset subjectFail if no subject has less than 35 marks
    }

    onSubmit({ percentage, grade, marks, failSubject });
  };

  return (
    <div>
      <h2>Enter Subject Marks</h2>
      <div>
        {Object.keys(marks).map((subject) => (
          <div key={subject}>
            <label htmlFor={subject}>{subject}:</label>
            <input
              type="number"
              id={subject}
              value={marks[subject]}
              onChange={(e) => handleChange(subject, parseInt(e.target.value, 10))}
            />
          </div>
        ))}
      </div>
      {subjectFail && <p style={{ color: 'red' }}>{subjectFail}</p>}
      <button onClick={handleSubmit}>Calculate Percentage</button>
    </div>
  );
};

export default ResultForm;
