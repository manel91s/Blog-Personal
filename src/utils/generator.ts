const generateId = () => {
  const random = Date.now().toString(32);
  const date = Math.random().toString(32).substring(2);
  return random + date;
};

export default generateId;
