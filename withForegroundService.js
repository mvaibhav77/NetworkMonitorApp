const { withAndroidManifest } = require("@expo/config-plugins");

module.exports = function withForegroundService(config) {
  return withAndroidManifest(config, (config) => {
    const service = {
      "android:name": "com.sdsmdg.tastytoast.services.ForegroundService",
      "android:exported": "false",
      "android:foregroundServiceType": "dataSync",
    };

    const permission = {
      "android:name": "android.permission.FOREGROUND_SERVICE",
    };

    const hasService =
      config.modResults.manifest.application[0].service?.some(
        (s) => s["android:name"] === service["android:name"]
      );

    const hasPermission =
      config.modResults.manifest["uses-permission"]?.some(
        (p) => p["android:name"] === permission["android:name"]
      );

    if (!hasService) {
      config.modResults.manifest.application[0].service = [
        ...(config.modResults.manifest.application[0].service || []),
        service,
      ];
    }

    if (!hasPermission) {
      config.modResults.manifest["uses-permission"] = [
        ...(config.modResults.manifest["uses-permission"] || []),
        permission,
      ];
    }

    return config;
  });
};
