import { Camera, Schedule, LogEntry } from './types'

export const camerasMock: Camera[] = [
  {
    id: 'CAM-001',
    name: '강남대로-1',
    location: '서울 강남구 강남대로 123',
    model: 'AXIS P1448-LE',
    installedAt: '2023-03-15',
    status: 'active',
  },
  {
    id: 'CAM-002',
    name: '서초대로-2',
    location: '서울 서초구 서초대로 45',
    model: 'Hanwha XNO-8080R',
    installedAt: '2022-11-02',
    status: 'maintenance',
  },
  {
    id: 'CAM-003',
    name: '올림픽대로-3',
    location: '서울 송파구 올림픽대로 999',
    model: 'AXIS Q1700-LE',
    installedAt: '2021-07-21',
    status: 'inactive',
  },
]

export const schedulesMock: Schedule[] = [
  {
    id: 'SCH-001',
    cameraId: 'CAM-001',
    title: '분기 점검',
    plannedDate: new Date().toISOString().slice(0, 10),
    assignee: '홍길동',
    status: 'planned',
  },
  {
    id: 'SCH-002',
    cameraId: 'CAM-002',
    title: '렌즈 청소',
    plannedDate: '2025-08-20',
    assignee: '김영희',
    status: 'planned',
  },
]

export const logsMock: LogEntry[] = [
  {
    id: 'LOG-1',
    cameraId: 'CAM-001',
    timestamp: new Date().toISOString(),
    level: 'INFO',
    message: 'Camera started',
  },
  {
    id: 'LOG-2',
    cameraId: 'CAM-002',
    timestamp: new Date().toISOString(),
    level: 'WARN',
    message: 'Network latency detected',
  },
  {
    id: 'LOG-3',
    cameraId: 'CAM-003',
    timestamp: new Date().toISOString(),
    level: 'ERROR',
    message: 'Image sensor failure',
  },
]

