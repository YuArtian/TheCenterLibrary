# VueRouter避免重复路由报错

> https://stackoverflow.com/questions/65878999/vue-router-push-error-avoided-redundant-navigation-to-current-location



```js
import VueRouter from 'vue-router';
import Vue from 'vue';

// Handle navigation duplication for router push (Globally)
const { isNavigationFailure, NavigationFailureType } = VueRouter
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((error) => {
    if (!isNavigationFailure(error, NavigationFailureType.duplicated)) {
      throw Error(error)
    }
  })
}

Vue.use(VueRouter);
```

