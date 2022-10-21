const Store = require('electron-store');

interface SettingsType {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  interval: number;
}

const defaults: SettingsType = {
  startHour: 22,
  startMinute: 0,
  endHour: 6,
  endMinute: 0,
  interval: 30,
};

const settings = new Store({defaults});

function getSettings(): SettingsType {
  return settings.store;
}

function setSettings(newSettings: SettingsType) {
  settings.store = newSettings;
}

export const store = {getSettings, setSettings} as const;
