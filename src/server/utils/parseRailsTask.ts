export const parseRailsTask = (railsTask: string) => {
  const groups = /rails ([^\s]+).*#  # (.*)/.exec(railsTask);
  const task = !groups ? 'no task' : groups[1];
  const description = !groups ? 'no description' : groups[2];
  return { task, description };
};
