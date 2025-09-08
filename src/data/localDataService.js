import questionsData from './Questions.json';

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const fetchLocalQuestions = async ({ difficulty, grade, subject, language, limit }) => {
  try {
    // Filter questions based on parameters (ignoring language for now)
    let filtered = questionsData.filter(q => 
      q.difficulty === difficulty && 
      q.grade == grade && 
      q.subject === subject
    );
    
    // Transform each question to include both language versions
    const transformed = filtered.map(q => {
      return {
        id: q.id,
        difficulty: q.difficulty,
        grade: q.grade,
        subject: q.subject,
        // English version
        englishQuestion: q.englishQuestion,
        engOpt1: q.engOpt1,
        engOpt2: q.engOpt2,
        engOpt3: q.engOpt3,
        engOpt4: q.engOpt4,
        englishHint: q.englishHint,
        englishConcept: q.englishConcept,
        // Tamil version
        tamilQuestion: q.tamilQuestion,
        tamOpt1: q.tamOpt1,
        tamOpt2: q.tamOpt2,
        tamOpt3: q.tamOpt3,
        tamOpt4: q.tamOpt4,
        tamilHint: q.tamilHint,
        tamilConcept: q.tamilConcept,
        // Common properties
        correctOption: q.correctOption,
      };
    });
    
    // Shuffle the transformed questions
    const shuffled = shuffleArray(transformed);
    
    // Limit the number of questions
    if (shuffled.length > limit) {
      return shuffled.slice(0, limit);
    }
    return shuffled;
  } catch (error) {
    console.error('Error loading local questions:', error);
    throw new Error('Failed to load questions from local data');
  }
};

export default fetchLocalQuestions;