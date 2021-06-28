import UV_SETTINGS from "./uv_settings.constants";

const updateSettings = (settingsData: any) => {
  return {
    type: UV_SETTINGS.UPDATE,
    data: settingsData
  }
}

export {
  updateSettings
}
