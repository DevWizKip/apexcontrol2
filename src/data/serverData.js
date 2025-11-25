// src/data/serverData.js

// High-level info about TorquePanel usage itself
export const panelUsageStats = {
  totalPanelUsers: 27, // owners + staff using the web panel
  staffTeams: 4,       // PD, EMS, gangs, global staff
  dailyPanelSessions: 96,
}

// GTA / FiveM servers you manage with TorquePanel
export const servers = [
  {
    id: 'main-rp',
    name: 'Los Santos RP · Main City',
    ip: '123.45.67.89:30120',
    status: 'online', // 'online' | 'offline' | 'restarting'
    currentPlayers: 102,
    maxPlayers: 128,
    queue: 18,
    uptimeHours24h: 23.4,
    crashCount24h: 0,
    averagePing: 46,
    cpuUsage: 62,       // percent
    ramUsageGb: 7.3,    // GB
    netOutMbps: 85,
    tags: ['whitelisted RP', 'NA', 'serious', 'voice'],
  },
  {
    id: 'dev',
    name: 'Los Santos RP · Dev / Staging',
    ip: '123.45.67.89:30130',
    status: 'online',
    currentPlayers: 8,
    maxPlayers: 64,
    queue: 0,
    uptimeHours24h: 19.1,
    crashCount24h: 1,
    averagePing: 52,
    cpuUsage: 37,
    ramUsageGb: 3.1,
    netOutMbps: 12,
    tags: ['dev', 'staff-only'],
  },
  {
    id: 'drift',
    name: 'Torque Drift City',
    ip: '123.45.67.89:30140',
    status: 'online',
    currentPlayers: 46,
    maxPlayers: 72,
    queue: 3,
    uptimeHours24h: 24,
    crashCount24h: 0,
    averagePing: 39,
    cpuUsage: 48,
    ramUsageGb: 4.2,
    netOutMbps: 34,
    tags: ['drift', 'racing', 'EU'],
  },
]

// Summary stats about players
export const playerOverview = {
  totalPlayersSeen: 8423,
  activeLast30d: 2194,
  newLast30d: 612,
  returningLast30d: 1582,
  averageSessionMinutes: 97,
  peakOnlineLast24h: 128,
}

// Example players (you can replace / expand with your real players.json later)
export const players = [
  {
    id: '1',
    name: 'NovaRP',
    steamId: 'steam:110000112345678',
    rockstarId: 'rstar:987654321',
    totalPlaytimeHours: 312,
    lastSeen: '2025-11-24T21:13:00Z',
    country: 'US',
    timezone: 'America/New_York',
    roles: ['Owner', 'Staff'],
    tags: ['owner', 'staff', 'dev'],
    riskScore: 5, // 0-100, lower is safer
    infractions: 0,
    reportsAgainst: 1,
    sessionHistory: [
      { date: '2025-11-24', startHour: 19, durationMinutes: 180 },
      { date: '2025-11-23', startHour: 21, durationMinutes: 120 },
      { date: '2025-11-22', startHour: 20, durationMinutes: 240 },
    ],
    reports: [
      {
        id: 'r-1001',
        type: 'Bug report',
        createdAt: '2025-11-21T20:15:00Z',
        summary: 'Bank robbery script soft locking players on step 3.',
        status: 'resolved', // 'open' | 'in-progress' | 'resolved'
      },
    ],
  },
  {
    id: '2',
    name: 'TTV_Nitro',
    steamId: 'steam:110000118765432',
    rockstarId: 'rstar:123456789',
    totalPlaytimeHours: 126,
    lastSeen: '2025-11-24T22:05:00Z',
    country: 'GB',
    timezone: 'Europe/London',
    roles: ['Civilian'],
    tags: ['racer', 'streamer'],
    riskScore: 42,
    infractions: 3,
    reportsAgainst: 5,
    sessionHistory: [
      { date: '2025-11-24', startHour: 20, durationMinutes: 210 },
      { date: '2025-11-23', startHour: 22, durationMinutes: 90 },
      { date: '2025-11-22', startHour: 19, durationMinutes: 160 },
    ],
    reports: [
      {
        id: 'r-4821',
        type: 'VDM',
        createdAt: '2025-11-24T20:45:00Z',
        summary: 'Alleged VDM near Legion Square during chase.',
        status: 'open',
      },
      {
        id: 'r-4703',
        type: 'Fail RP',
        createdAt: '2025-11-21T19:10:00Z',
        summary: 'Left scene of crash without RP.',
        status: 'resolved',
      },
    ],
  },
]

// Moderation actions (for the Moderation tab)
export const moderationEvents = [
  {
    id: 'm-1001',
    type: 'warning', // 'warning' | 'kick' | 'ban' | 'note'
    createdAt: '2025-11-24T20:50:00Z',
    playerId: '2',
    playerName: 'TTV_Nitro',
    staffName: 'NovaRP',
    reason: 'VDM near Legion (ticket #4821)',
    evidence: ['clip: https://clips.twitch.tv/...'],
    status: 'open', // 'open' | 'resolved'
  },
  {
    id: 'm-1002',
    type: 'note',
    createdAt: '2025-11-22T18:20:00Z',
    playerId: '2',
    playerName: 'TTV_Nitro',
    staffName: 'Karma',
    reason: 'Talked to player about risky driving, no formal warning.',
    evidence: [],
    status: 'resolved',
  },
  {
    id: 'm-1003',
    type: 'ban',
    createdAt: '2025-11-10T02:13:00Z',
    playerId: '99',
    playerName: 'ToxicGuy',
    staffName: 'Ash',
    reason: 'Racism in voice, repeated N-word after warnings.',
    evidence: ['clip: https://medal.tv/...'],
    status: 'resolved',
  },
]

// Server logs (for the Server Logs tab)
export const serverLogs = [
  {
    id: 'log-1',
    timestamp: '2025-11-24T20:41:12Z',
    level: 'info', // 'info' | 'warn' | 'error'
    source: 'server',
    message: '[Core] Started resource police_mdt (1.2.3)',
  },
  {
    id: 'log-2',
    timestamp: '2025-11-24T20:44:52Z',
    level: 'warn',
    source: 'anticheat',
    message: '[AC] Speedhack flag on player TTV_Nitro (flag count: 2)',
  },
  {
    id: 'log-3',
    timestamp: '2025-11-24T20:45:17Z',
    level: 'error',
    source: 'script:bank_robbery',
    message:
      '[bank_robbery] nil value in step 3 handler for player 12 (NovaRP)',
  },
  {
    id: 'log-4',
    timestamp: '2025-11-24T21:01:09Z',
    level: 'info',
    source: 'server',
    message:
      '[Core] Scheduled restart completed, players rejoined successfully.',
  },
]

// Simple “what’s happening right now” overview for Dashboard
export const dashboardSnapshot = {
  activeServerId: 'main-rp',
  totalServers: servers.length,
  totalPlayersOnline:
    servers.reduce((sum, s) => sum + s.currentPlayers, 0),
  openModerationTickets: moderationEvents.filter(
    (m) => m.status === 'open'
  ).length,
  openReportsAgainstPlayers: players.reduce(
    (sum, p) => sum + p.reports.filter((r) => r.status === 'open').length,
    0
  ),
}
