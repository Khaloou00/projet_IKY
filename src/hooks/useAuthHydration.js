import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useRefreshTokenMutation } from '../services/api/authApi'
import { setCredentials } from '../features/auth/authSlice'

export function useAuthHydration() {
  const dispatch = useDispatch()
  const [refresh] = useRefreshTokenMutation()
  const attempted = useRef(false)

  useEffect(() => {
    if (attempted.current) return
    attempted.current = true

    refresh()
      .unwrap()
      .then((data) => {
        if (data?.accessToken && data?.user) {
          dispatch(setCredentials({ accessToken: data.accessToken, user: data.user }))
        }
      })
      .catch(() => {
        // No valid cookie — user stays logged out, silent fail
      })
  }, [dispatch, refresh])
}
