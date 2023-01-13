export const cloneBatteries = function (batteries = []) {
  return batteries.map((battery) => ({...battery}));
};

export const updateStoredEnergies = function (batteries, newStoredEnergiesByBatteryId) {
  const batteryIds = Object.keys(newStoredEnergiesByBatteryId);
  batteries.forEach((battery) => {
    if (batteryIds.indexOf(battery.id) !== -1) {
      battery.storedEnergyKWh = newStoredEnergiesByBatteryId[battery.id];
    }
  });
};