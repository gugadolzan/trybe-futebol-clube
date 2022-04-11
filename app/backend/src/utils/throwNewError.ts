export default (message: string, status: number) => {
  const err = new Error(message) as Error & { status: number };
  err.status = status;
  throw err;
};
