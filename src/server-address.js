//http://etcfrewebqa01:8000/
export function getServerAddress() {
  return process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3567/';
}
