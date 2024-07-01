const generateRandomDate = (start: Date, end: Date): string => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0]; // Return date in YYYY-MM-DD format
  };
  
  const generateDescription = (): string => {
    const descriptions = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  };
  
  const generateTitle = (index: number): string => {
    return `Card ${index + 1}`;
  };
  
  export const generateData = (numItems: number) => {
    const data = [];
    for (let i = 0; i < numItems; i++) {
      data.push({
        title: generateTitle(i),
        description: generateDescription(),
        date: generateRandomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
      });
    }
    return data;
  };
  