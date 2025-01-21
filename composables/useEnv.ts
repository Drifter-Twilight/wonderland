export function useEnv() {
  return useState('env', () => process.env.NODE_ENV)
}