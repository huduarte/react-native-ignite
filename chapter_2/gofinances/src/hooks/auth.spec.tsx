import { renderHook, act } from '@testing-library/react-hooks';
import { mocked } from 'ts-jest/utils';
import { useAuth, AuthContext, AuthProvider } from './auth';
import { logInAsync } from 'expo-google-app-auth';

jest.mock('expo-google-app-auth');

describe('Auth Hook', () => {
  it('Should be able to sign in with Google account existing', async () => {
    const googleMocked = mocked(logInAsync as any);
    googleMocked.mockReturnValueOnce({
      type: 'success',
      user: {
        id: 'any_id',
        email: 'hudsoneeto@outlook.com',
        name: 'Hudson',
        photo: 'any_photo.png'
      }
    })

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    })

    await act(() => result.current.signInWithGoogle())

    expect(result.current.user.email)
    .toBe('hudsoneeto@outlook.com')
  });

  it('User should not connect if cancel authentication with Google', async () => {
    const googleMocked = mocked(logInAsync as any);
    googleMocked.mockReturnValueOnce({
      type: 'cancel',
    })

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    })

    await act(() => result.current.signInWithGoogle())

    expect(result.current.user).not.toHaveProperty('id');
  });

  it('should be error signin with google if not return type', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    })

    try {
      await act(() => result.current.signInWithGoogle())
    } catch {
      expect(result.current.user).toEqual({});
    }
  });
});