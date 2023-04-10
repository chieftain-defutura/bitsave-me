import { Status } from 'constants/types'
import { create } from 'zustand'

export type IStakedData = {
  stakeIndex: number
  amount: number
  earnings: number
  endTime: number
  lastClaimTimestamp: number
  planId: string
  status: Status
  tokenAddress: string
}

type State = {
  user: string
  referrer: string
  loading: boolean
  userStakedData: IStakedData[]
}

type Action = {
  updateStatus: (loading: boolean) => void
  updateUserData: (data: Omit<State, 'loading'>) => void
}

export const userStore = create<State & Action>((set) => ({
  user: '',
  referrer: '',
  loading: false,
  userStakedData: [],
  updateStatus: (loading: boolean) => set(() => ({ loading })),
  updateUserData: (data) =>
    set(() => ({
      user: data.user,
      referrer: data.referrer,
      userStakedData: data.userStakedData,
    })),
}))
