import { afterAll, afterEach, beforeAll, describe } from '@jest/globals'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
//import axios from 'axios'
import { getResponse, http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import User from '../src/pages/current/user'

const handlers = [
  http.get('http://localhost:3000/api/v1/current/user', () => {
    return HttpResponse.json([
      {
        id: 1,
        family_name: '長澤',
        family_name_kana: 'ナガサワ',
        given_name: 'まさみ',
        given_name_kana: 'マサミ',
        birthday: new Date(2006, 6, 3),
        gender: 1,
        email: 'test1@example.com',
        isSignedIn: false,
        isFetched: false,
        address: {
          id: 1,
          user_id: 1,
          prefecture: '静岡県',
          city: '磐田市',
          address1: '富士見町4丁目9-5',
          address2: '',
          postal_code: '438-8650',
        },
        telephone: {
          id: 1,
          user_id: 1,
          phone_number: '090-1234-5678',
          landline_phone_number: '',
        },
        following_users: [
          {
            follower_id: 0,
            followed_id: 0,
          },
        ],
        follower_users: [
          {
            follower_id: 0,
            followed_id: 0,
          },
        ],
        followers: [
          {
            follower_id: 0,
            followed_id: 0,
          },
        ],
        followeds: [
          {
            follower_id: 0,
            followed_id: 0,
          },
        ],
      },
    ])
  }),
]

const server = setupServer(...handlers)
beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
  cleanup()
})

afterAll(() => {
  server.close()
})

jest.mock('axios')
jest.mock('@/hooks/useRequireSignIn')
//jest.mock('@/hooks/useGlobalState')

describe('User page with axios / Success+Error', () => {
  test('axiosが正しくresponseを返した時、UserInfoが変える', async () => {
    const { debug } = render(<User />)
    debug()
    await waitFor(async () => {
      const request = new Request('http://localhost:3000/api/v1/current/user')
      const response = await getResponse(handlers, request)
      const data = await response?.json()
      expect(data[0].family_name).toBe('長澤')
      expect(data[0].given_name).toBe('まさみ')
      debug(undefined, Infinity)
      expect(screen.getByText('個人情報編集')).toBeInTheDocument()
      expect(screen.getByText('ホームへ')).toBeInTheDocument()
    })
  })
})
