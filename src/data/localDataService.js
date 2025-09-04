import questionsData from './Questions.json';

export const fetchLocalQuestions = async ({ difficulty, grade, subject, language, limit }) => {
  try {
    // Filter questions based on parameters
    let filtered = questionsData.filter(q => 
      q.difficulty === difficulty && 
      q.grade == grade && 
      q.subject === subject && 
      q.language === language
    );

    // Limit the number of questions
    if (filtered.length > limit) {
      filtered = filtered.slice(0, limit);
    }

    return filtered;
  } catch (error) {
    console.error('Error loading local questions:', error);
    throw new Error('Failed to load questions from local data');
  }
};