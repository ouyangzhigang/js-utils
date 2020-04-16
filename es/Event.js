/** Event */

/**
 * EventHub 发布者订阅事件器
 * @function EventHub
 * @param { null } - 无返回参数
 * @returns { Object } - 广播/订阅
 */
var EventHub = function EventHub() {
  return {
    hub: Object.create(null),
    emit: function emit(event, data) {
      (this.hub[event] || []).forEach(function (handler) {
        return handler(data);
      });
    },
    on: function on(event, handler) {
      if (!this.hub[event]) this.hub[event] = [];
      this.hub[event].push(handler);
    },
    off: function off(event, handler) {
      var i = (this.hub[event] || []).findIndex(function (h) {
        return h === handler;
      });
      if (i > -1) this.hub[event].splice(i, 1);
      if (this.hub[event].length === 0) delete this.hub[event];
    }
  };
};

export { EventHub };
