import Vue from 'vue';

// Import all base components
const requireComponent = require.context('@/components/base', true, /Base[A-Z]/);
window.requireComponent = requireComponent;
requireComponent.keys().forEach((fileName) => {
  if (!fileName.includes('.vue')) {
    return;
  }

  let baseComponentConfig = requireComponent(fileName);
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig;
  const baseComponentName = baseComponentConfig.name || (
    fileName
      .replace(/^.+\//, '')
      .replace(/\.\w+$/, '')
  );
  Vue.component(baseComponentName, baseComponentConfig);
});
