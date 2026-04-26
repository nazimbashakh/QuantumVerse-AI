import { LEVEL_1_TOPICS, LEVEL_1_QUIZZES } from './level_1';
import { LEVEL_2_TOPICS, LEVEL_2_QUIZZES } from './level_2';
import { LEVEL_3_TOPICS, LEVEL_3_QUIZZES } from './level_3';
import { LEVEL_4_TOPICS, LEVEL_4_QUIZZES } from './level_4';
import { LEVEL_5_TOPICS, LEVEL_5_QUIZZES } from './level_5';
import { LEVEL_6_TOPICS, LEVEL_6_QUIZZES } from './level_6';
import { LEVEL_7_TOPICS, LEVEL_7_QUIZZES } from './level_7';
import { LEVEL_8_TOPICS, LEVEL_8_QUIZZES } from './level_8';
import { LEVEL_9_TOPICS, LEVEL_9_QUIZZES } from './level_9';
import { LEVEL_10_TOPICS, LEVEL_10_QUIZZES } from './level_10';
import { LEVEL_11_TOPICS, LEVEL_11_QUIZZES } from './level_11';
import { LEVEL_12_TOPICS, LEVEL_12_QUIZZES } from './level_12';
import { LEVEL_13_TOPICS, LEVEL_13_QUIZZES } from './level_13';
import { LEVEL_14_TOPICS, LEVEL_14_QUIZZES } from './level_14';
import { LEVEL_15_TOPICS, LEVEL_15_QUIZZES } from './level_15';
import { Topic, QuizQuestion } from '../types';
export const ALL_TOPICS: Record<number, Topic[]> = {
  1: LEVEL_1_TOPICS,
  2: LEVEL_2_TOPICS,
  3: LEVEL_3_TOPICS,
  4: LEVEL_4_TOPICS,
  5: LEVEL_5_TOPICS,
  6: LEVEL_6_TOPICS,
  7: LEVEL_7_TOPICS,
  8: LEVEL_8_TOPICS,
  9: LEVEL_9_TOPICS,
  10: LEVEL_10_TOPICS,
  11: LEVEL_11_TOPICS,
  12: LEVEL_12_TOPICS,
  13: LEVEL_13_TOPICS,
  14: LEVEL_14_TOPICS,
  15: LEVEL_15_TOPICS,
};
const collectQuizzes = () => {
  const quizzes: Record<string, { questions: QuizQuestion[] }> = {
    ...LEVEL_1_QUIZZES,
    ...LEVEL_2_QUIZZES,
    ...LEVEL_3_QUIZZES,
    ...LEVEL_4_QUIZZES,
    ...LEVEL_5_QUIZZES,
    ...LEVEL_6_QUIZZES,
    ...LEVEL_7_QUIZZES,
    ...LEVEL_8_QUIZZES,
    ...LEVEL_9_QUIZZES,
    ...LEVEL_10_QUIZZES,
    ...LEVEL_11_QUIZZES,
    ...LEVEL_12_QUIZZES,
    ...LEVEL_13_QUIZZES,
    ...LEVEL_14_QUIZZES,
    ...LEVEL_15_QUIZZES,
  };

  // Dynamically collect from topics if not already in quizzes object
  Object.values(ALL_TOPICS).forEach(levelTopics => {
    levelTopics.forEach(topic => {
      if (topic.content.quiz && !quizzes[topic.id]) {
        // Handle both object-style and array-style quiz definitions
        const questions = Array.isArray(topic.content.quiz) 
          ? topic.content.quiz 
          : (topic.content.quiz as any).questions;
        
        if (questions) {
          quizzes[topic.id] = { questions };
        }
      }
    });
  });

  return quizzes;
};

export const ALL_QUIZZES: Record<string, { questions: QuizQuestion[] }> = collectQuizzes();