"use client"
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Camera, LogEntry, Schedule } from './types'
import { camerasMock, schedulesMock, logsMock } from './mock-data'

type State = {
  cameras: Camera[]
  schedules: Schedule[]
  logs: LogEntry[]
}

type Actions = {
  setCameras: (rows: Camera[]) => void
  addCamera: (row: Camera) => void
  updateCamera: (id: string, patch: Partial<Camera>) => void
  removeCamera: (id: string) => void

  setSchedules: (rows: Schedule[]) => void
  addSchedule: (row: Schedule) => void
  updateSchedule: (id: string, patch: Partial<Schedule>) => void
  removeSchedule: (id: string) => void

  setLogs: (rows: LogEntry[]) => void
  addLog: (row: LogEntry) => void
  addLogs: (rows: LogEntry[]) => void
  clearAll: () => void
}

export const useAppStore = create<State & Actions>()(
  persist(
    (set) => ({
      cameras: camerasMock,
      schedules: schedulesMock,
      logs: logsMock,

      setCameras: (rows) => set({ cameras: rows }),
      addCamera: (row) => set((s) => ({ cameras: [row, ...s.cameras] })),
      updateCamera: (id, patch) => set((s) => ({
        cameras: s.cameras.map((c) => (c.id === id ? { ...c, ...patch } : c)),
      })),
      removeCamera: (id) => set((s) => ({ cameras: s.cameras.filter((c) => c.id !== id) })),

      setSchedules: (rows) => set({ schedules: rows }),
      addSchedule: (row) => set((s) => ({ schedules: [row, ...s.schedules] })),
      updateSchedule: (id, patch) => set((s) => ({
        schedules: s.schedules.map((it) => (it.id === id ? { ...it, ...patch } : it)),
      })),
      removeSchedule: (id) => set((s) => ({ schedules: s.schedules.filter((it) => it.id !== id) })),

      setLogs: (rows) => set({ logs: rows }),
      addLog: (row) => set((s) => ({ logs: [row, ...s.logs] })),
      addLogs: (rows) => set((s) => ({ logs: [...rows, ...s.logs] })),

      clearAll: () => set({ cameras: [], schedules: [], logs: [] }),
    }),
    {
      name: 'traffic-cam-admin',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cameras: state.cameras,
        schedules: state.schedules,
        logs: state.logs,
      }),
    },
  ),
)

