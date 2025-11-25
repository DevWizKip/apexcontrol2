// src/app/fakeData.js
// This file holds fake data so the UI can look "real"
// even though we don't have a backend yet.

// List of players shown in the Players table
export const players = [
  {
    id: '1',
    name: 'TTV_Nitro',
    identifiers: ['steam:11000013abcdef0'],
    playtimeHours: 186,
    lastSeen: '2 hours ago',
    sessions30d: 24,
    infractions: 3,
    risk: 'High',
    status: 'Online',
    tags: ['Streamer', 'VIP'],
  },
  {
    id: '2',
    name: 'NovaRP',
    identifiers: ['steam:11000013aaaaaa0'],
    playtimeHours: 42,
    lastSeen: '1 day ago',
    sessions30d: 8,
    infractions: 0,
    risk: 'Low',
    status: 'Offline',
    tags: ['Police'],
  },
  {
    id: '3',
    name: 'DriftKing',
    identifiers: ['steam:11000013bbbbbbb'],
    playtimeHours: 73,
    lastSeen: '10 minutes ago',
    sessions30d: 15,
    infractions: 1,
    risk: 'Medium',
    status: 'Online',
    tags: ['Racer'],
  },
]

// Fake moderation reports that power the Moderation page
export const reports = [
  {
    id: 'r1',
    createdAt: '2025-11-24 21:13',
    reporter: 'NovaRP',
    accused: 'TTV_Nitro',
    reasonShort: 'VDM / reckless driving in city center',
    description:
      'Accused repeatedly drove into pedestrians during an active RP scene near Legion Square after multiple warnings from officers.',
    status: 'Open',
    severity: 'High',
    handler: null,
    ruleTags: ['VDM', 'Fail RP'],
    evidenceLinks: ['Clip: https://clips.twitch.tv/...nitro-legion'],
    staffNotes:
      'Check logs around 21:10–21:14 server time. Might need a 24h ban if confirmed.',
  },
  {
    id: 'r2',
    createdAt: '2025-11-24 20:42',
    reporter: 'RandomCitizen',
    accused: 'DriftKing',
    reasonShort: 'Street racing in safe zone',
    description:
      'Reported for doing repeated high-speed passes through Legion and parking lot burnout near spawn zone.',
    status: 'In progress',
    severity: 'Medium',
    handler: 'Lena',
    ruleTags: ['Unsafe driving', 'Safe zone'],
    evidenceLinks: ['Screenshot: /evidence/2025-11-24-drift-1.png'],
    staffNotes: 'Lena speaking with them in voice; check prior warnings.',
  },
  {
    id: 'r3',
    createdAt: '2025-11-24 19:05',
    reporter: 'OfficerMike',
    accused: 'NovaRP',
    reasonShort: 'Breaking RP in police station',
    description:
      'Accused was joking OOC repeatedly while being processed, ignoring staff pings and /ooc reminders.',
    status: 'Resolved',
    severity: 'Low',
    handler: 'Jay',
    ruleTags: ['OOC in IC', 'Police department'],
    evidenceLinks: ['Log snippet: #pd-internal 19:02–19:07'],
    staffNotes: 'Gave formal written warning; no ban this time.',
  },
]

// Fake session history for each player (for the player detail page)
// Keys '1', '2', '3' match the player.id values above.
export const playerSessions = {
  '1': [
    { id: 's1', startedAt: '2025-11-24 21:05', lengthMin: 48, avgPing: 38 },
    { id: 's2', startedAt: '2025-11-24 18:12', lengthMin: 62, avgPing: 41 },
    { id: 's3', startedAt: '2025-11-23 22:30', lengthMin: 35, avgPing: 39 },
    { id: 's4', startedAt: '2025-11-23 19:04', lengthMin: 71, avgPing: 44 },
    { id: 's5', startedAt: '2025-11-22 20:17', lengthMin: 55, avgPing: 36 },
  ],
  '2': [
    { id: 's1', startedAt: '2025-11-24 17:02', lengthMin: 24, avgPing: 32 },
    { id: 's2', startedAt: '2025-11-23 18:10', lengthMin: 31, avgPing: 30 },
    { id: 's3', startedAt: '2025-11-22 19:44', lengthMin: 19, avgPing: 35 },
    { id: 's4', startedAt: '2025-11-21 20:05', lengthMin: 27, avgPing: 33 },
  ],
  '3': [
    { id: 's1', startedAt: '2025-11-24 20:11', lengthMin: 58, avgPing: 45 },
    { id: 's2', startedAt: '2025-11-24 16:50', lengthMin: 42, avgPing: 47 },
    { id: 's3', startedAt: '2025-11-23 21:30', lengthMin: 63, avgPing: 43 },
    { id: 's4', startedAt: '2025-11-22 22:01', lengthMin: 51, avgPing: 46 },
    { id: 's5', startedAt: '2025-11-21 19:48', lengthMin: 39, avgPing: 40 },
  ],
}
