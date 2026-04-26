export const calculateMatchScore = (resume, job) => {
  if (!resume || !resume.parsedText || !job.description) {
    return { score: 0, matchedSkills: [], missingSkills: [] };
  }

  const jobText = job.description.toLowerCase();
  
  // Define a larger, common pool of skills we look for in jobs to check against the resume
  const commonTechSkills = ['javascript', 'react', 'node.js', 'mongodb', 'python', 'java', 'express', 'sql', 'html', 'css', 'aws', 'docker', 'git', 'typescript', 'vue', 'angular', 'c++', 'c#', 'php', 'ruby', 'go', 'rust', 'kubernetes', 'jenkins', 'azure', 'gcp', 'linux', 'graphql', 'rest api', 'mysql', 'postgresql'];
  
  let score = 0;
  let matchedSkills = [];
  let missingSkills = [];

  // 1. Find matched skills based on what the user already has
  if (resume.skills && resume.skills.length > 0) {
    resume.skills.forEach(skill => {
      // Check if job text needs this skill
      if (jobText.includes(skill.toLowerCase())) {
        score += 20; // 20 points per matched skill
        matchedSkills.push(skill);
      }
    });
  }

  // 2. Identify missing skills (skills in the job description that ARE NOT in the resume)
  // We extract potential skills from the job description by checking our common pool
  const jobRequiredSkills = commonTechSkills.filter(skill => jobText.includes(skill));
  
  // A skill is missing if it's required by the job but not in the matched skills list
  missingSkills = jobRequiredSkills.filter(required => 
    !matchedSkills.some(matched => matched.toLowerCase() === required)
  );

  // Cap at 100
  const finalScore = Math.min(score, 100);

  return {
    score: finalScore,
    matchedSkills,
    missingSkills
  };
};
