const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  isDesktop: true,
  getGames: () => ipcRenderer.invoke('db:get-games'),
  getGame: (id) => ipcRenderer.invoke('db:get-game', id),
  saveGame: (game) => ipcRenderer.invoke('db:save-game', game),
  deleteGame: (id) => ipcRenderer.invoke('db:delete-game', id),
  exportBackup: () => ipcRenderer.invoke('db:export-backup'),
  importBackup: (backupData) => ipcRenderer.invoke('db:import-backup', backupData),
  getDatabasePath: () => ipcRenderer.invoke('db:get-path'),
  onMenuOpenAdventures: (callback) => ipcRenderer.on('menu:open-adventures', callback),
  onMenuNewAdventure: (callback) => ipcRenderer.on('menu:new-adventure', callback)
});

