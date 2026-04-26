import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const XP_PER_TOPIC = 50;

export function useProgress() {
  const { data, error, mutate } = useSWR<string[]>('/api/progress', fetcher, {
    fallbackData: [],
  });

  const completedTopics = data || [];

  const markTopicComplete = async (topicId: string, levelId: number) => {
    if (completedTopics.includes(topicId)) return false;

    // Optimistic UI update
    mutate([...completedTopics, topicId], false);

    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topicId, levelId }),
    });

    // Revalidate
    mutate();
    return true;
  };

  const isTopicComplete = (topicId: string): boolean => {
    return completedTopics.includes(topicId);
  };

  const getLevelProgress = (levelId: number, totalTopics: number) => {
    const completed = completedTopics.filter(id => id.startsWith(`L${levelId}-`));
    return {
      completed: completed.length,
      total: totalTopics,
      percentage: totalTopics > 0 ? Math.round((completed.length / totalTopics) * 100) : 0,
    };
  };

  const getLevelStatus = (levelId: number, totalTopics: number): 'completed' | 'in-progress' | 'not-started' => {
    const progress = getLevelProgress(levelId, totalTopics);
    if (progress.percentage === 100) return 'completed';
    if (progress.completed > 0) return 'in-progress';
    return 'not-started';
  };

  const getTotalXP = (): number => {
    return completedTopics.length * XP_PER_TOPIC;
  };

  return {
    completedTopics,
    markTopicComplete,
    isTopicComplete,
    getLevelProgress,
    getLevelStatus,
    getTotalXP,
    isLoading: !error && !data,
  };
}
