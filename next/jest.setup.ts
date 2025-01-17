// jest.setup.ts
//import fetch from 'node-fetch'
import { TextEncoder, TextDecoder } from 'text-encoding'
import { server } from './mocks/todo.server'
//import { afterAll, afterEach, beforeAll } from '@jest/globals';
import '@testing-library/jest-dom'

// jest.setup.js やテストファイルの最初に追加
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Node.js 環境で fetch をグローバルに設定
//globalThis.fetch = fetch as unknown

// TextEncoder と TextDecoder をポリフィル (text-encoding パッケージを使用)

globalThis.TextEncoder = TextEncoder
globalThis.TextDecoder = TextDecoder

beforeAll(() => {
  console.log('Setting up mock server...')
  server.listen()
})

afterEach(() => {
  console.log('Resetting handlers...')
  server.resetHandlers()
})

afterAll(() => {
  console.log('Closing mock server...')
  server.close()
})
