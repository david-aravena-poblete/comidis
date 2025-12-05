export const generateInitials = (name) => {
  if (!name || typeof name !== 'string') return [];

  const words = name.toLowerCase().split(' ');
  const initials = new Set();

  words.forEach(word => {
    for (let i = 1; i <= word.length; i++) {
      initials.add(word.substring(0, i));
    }
  });

  return Array.from(initials);
};
