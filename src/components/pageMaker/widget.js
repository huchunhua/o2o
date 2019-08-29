let widgets = {};
const widgetsContext = require.context('./widget', true, /Widget[A-Z]\w+\.(vue|js)$/)
widgetsContext.keys().forEach(widget => {
    let widgetConfig = widgetsContext(widget);
    let widgetName = widget.replace(/^\.\/(.*)\.\w+$/, '$1');
    let widgetObject = widgetConfig.default || widgetConfig;
    widgets[widgetName] = widgetObject;
});
export default widgets;