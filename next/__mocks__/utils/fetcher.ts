// __mocks__/utils/fetcher.ts
export const fetcher = async (url: string) => {
  if (url === '/current/home') {
    return { message: 'Welcome to Home!' }
  }
  throw new Error('API error')
}
