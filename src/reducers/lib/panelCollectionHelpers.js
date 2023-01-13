export const _outputVoltageVSetting = 24;
export const _outputCurrentA_to_inputRadianceKWM2_ratio = 4.5; // outputCurrent [A] ÷ inputRadiance [kW/m²]


export const clonePanelCollection = function (panelCollection = {panels: [], events: []}) {
  return {
    panels: panelCollection.panels.map((panel) => ({...panel})),
    events: panelCollection.events.map((event) => ({...event}))
  };
};


export const _enableDisablePanels = function (panels = [], panelIds = [], enable = true) {
  panels.forEach((panel) => {
    if (panelIds.indexOf(panel.id) !== -1) {
      panel.enabled = (enable === true);
      _reconcilePanelProperties(panel);
    }
  });
};


export const enablePanels = function (panels = [], panelIds = []) {
  _enableDisablePanels(panels, panelIds, true);
};


export const disablePanels = function (panels = [], panelIds = []) {
  _enableDisablePanels(panels, panelIds, false);
};


export const _reconcilePanelProperties = function (panel) {
  const outputCurrentA = panel.inputRadianceKWM2 * _outputCurrentA_to_inputRadianceKWM2_ratio;
  panel.outputVoltageV = (panel.enabled ? _outputVoltageVSetting : 0);
  panel.outputCurrentA = (panel.enabled ? outputCurrentA : 0);
};


export const updateInputRadiances = function (panels, newInputRadiancesByPanelId) {
  const panelIds = Object.keys(newInputRadiancesByPanelId);
  panels.forEach((panel) => {
    if (panelIds.indexOf(panel.id) !== -1) {
      panel.inputRadianceKWM2 = newInputRadiancesByPanelId[panel.id];
      _reconcilePanelProperties(panel);
    }
  });
};

export const getIdentifiedPanelsDescription = function (panels, panelIds) {
  const identifiesAllPanels = _containsAllPanelIds(panels, panelIds);
  let description;
  if (identifiesAllPanels) {
    description = 'all panels';
  } else {
    description = (panelIds.length === 1 ? 'panel ' : 'panels ') + panelIds.join(', ');
  }
  return description;
};

export const _containsAllPanelIds = function (panels, panelIds) {
  return panels.every((panel) => {
    return (panelIds.indexOf(panel.id) !== -1);
  });
};

export const addEvent = function (events, newEvent) {
  events.shift();
  events.push(newEvent);
};