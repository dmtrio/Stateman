
let stateMans = {};
const StateMan = function(name, properties, updaters, subscriptions) {
  if (!stateMans[name]) {
    stateMans[name] = new function() {
      let dataStore  = {};
      let callbackStore = {};
      let updatersStore = [];
      let callbackStack = [];
      let updateDepth = 0;

      function makeReactive(vm, properties) {
        properties.forEach(function(property) {
          Object.defineProperty(vm, property.name, {
            set: function(val) {
              dataStore[property.name] = val;
              if (Array.isArray(callbackStore[property.name])) {
                callbackStore[property.name].forEach(function(func) {
                  if (callbackStack.length > 0) {
                    let add = true;
                    callbackStack.forEach((inStackFunc) => {
                      if (inStackFunc === func) {
                        add = false;
                        return
                      }
                    })
                    if (add) callbackStack.push(func);
                  } else {
                    callbackStack.push(func);
                  }
                })
              }
            },
            get: function() {
              return dataStore[property.name];
            }
          })
          vm[property.name] = property.initial || null
        });
      }

      function ST () {
        // this.extendStateMan(properties, updaters, subscriptions);
        return this;
      }

      ST.prototype.extendStateMan = function extendStateMan(properties, updaters, subscriptions) {
        if (Array.isArray(properties)) {
          makeReactive(this, properties);
        }
        if (Array.isArray(updaters)) {
          updaters.forEach((func)=>{
            if (typeof func === 'function') {
              updatersStore.push(func);
            }
          })
        }
        if (Array.isArray(subscriptions)) {
          subscriptions.forEach((func)=>{
            if (typeof func === 'function') {
              func(this.subscribe);
            }
          })
        }
        return this;
      }

      ST.prototype.subscribe = function STsubscribe(properties, callback) {
        properties.forEach((propertyName) => {
          callbackStore[propertyName] = callbackStore[propertyName] || [];
          callbackStore[propertyName].push(callback);
        })
      }

      ST.prototype.update = function STupdate(action) {
        updatersStore.forEach((updateFunc) => {
          updateDepth++;
          updateFunc(this, action);
          updateDepth--;
        })
        while (!updateDepth && callbackStack.length) {
          const callback = callbackStack.pop();
          const string = callback(this);
          console.log(string);
        }
      }

      return new ST();
    }();
    // return stateMans[name]
  }
  return stateMans[name].extendStateMan(properties, updaters, subscriptions);
}
export default StateMan;