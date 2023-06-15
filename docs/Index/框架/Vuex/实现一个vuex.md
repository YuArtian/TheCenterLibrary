```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <div id='app'>
      {{this.$store.state.age}}
      <div>
        {{this.$store.getters.myAge}}
      </div>
      <button @click="add">Add age</button>
      <button @click="minus">Minus age</button>
      <div> {{this.$store.getters.getA}} </div>
      <div> {{this.$store.state.b.y}} </div>
    </div>
    <script>
      let Vue
      function forEachValue(obj, callback){
        Object.keys(obj).forEach(key => {
          callback(key, obj[key])
        })
      }
      function install (_Vue) {
        if (Vue) {
          console.log('已经有了')
          return
        }
        Vue = _Vue
        Vue.mixin({ beforeCreate: vueInit })
      }
      function vueInit () {
        const options = this.$options
        if (options && options.store) {
          this.$store = options.store
        } else if (options.parent && options.parent.store) {
          this.$store = options.parent.store
        }
      }

      class ModuleCollection {
        constructor(options){
          this.register([], options)
        }
        register(path, rootModule){
          let newModule = {
            _raw: rootModule,
            _children: {},
            state: rootModule.state
          }
          if (path.length === 0) {
            this.root = newModule
          } else {// [ ,c]
            let parent = path.slice(0, -1).reduce((root, current) => {
              return root._children[current]
            }, this.root)
            parent._children[path[path.length - 1]] = newModule
          }
          if (rootModule.modules) {
            forEachValue(rootModule.modules, (modulesName, module) => {
              this.register(path.concat(modulesName), module)
            })
          }
        }
      }
      const installModules = (store, state, path, rootModule) => {
        //递归实现 this.$store.state.b.y
        if (path.length > 0) {
          let parent = path.slice(0, -1).reduce((root, current) => {
            return root[current]
          }, state)
          Vue.set(parent, path[path.length - 1], rootModule.state)
        }

        //getters
        let getters = rootModule._raw.getters
        if (getters) {
          forEachValue(getters, (getterName, fn) => {
            Object.defineProperty(store.getters, getterName, {
              get(){
                return fn(rootModule.state)
              }
            })
          })
        }
        // mutations
        let mutations = rootModule._raw.mutations
        if (mutations) {
          forEachValue(mutations, (mutationName, fn) => {
            let arr = store.mutations[mutationName] || (store.mutations[mutationName] = [])
            arr.push((payload) => {
              fn(rootModule.state, payload)
            })
          })
        }
        // actions
        let actions = rootModule._raw.actions
        if (actions) {
          forEachValue(actions, (actionName, fn) => {
            let arr = store.actions[actionName] || (store.actions[actionName] = [])
            arr.push((payload) => {
              fn(store, payload)
            })
          })
        }
        forEachValue(rootModule._children, (moduleName, module) => {
          installModules(store, state, path.concat(moduleName), module)
        })
      }
      class Store {
        constructor(options={}){
          //state
          this._state = new Vue({
            data: {
              state: options.state
            }
          })
          this.getters = Object.create(null)
          this.mutations = Object.create(null)
          this.actions = Object.create(null)

          /*
      //getters
        const getters = options.getters || {}
        this.getters = {}
        forEachValue(getters, (getterName, value) => {
          Object.defineProperty(this.getters, getterName, {
            get: () => {
              return value(this.state)
            }
          })
        })
        //mutation
        const mutations = options.mutations || {}
        this.mutations = {}
        forEachValue(mutations, (type, value) => {
          this.mutations[type] = (payload) => {
            value.call(this, this.state, payload)
          }
        })
        //actions
        const actions = options.actions || {}
        this.actions = {}
        forEachValue(actions, (type, value) => {
          this.actions[type] = (payload) => {
            value.call(this, this, payload)
          }
        })*/
          //modules
          this.modules = new ModuleCollection(options)
          // console.log('this.modules',this.modules)
          installModules(this, this.state, [], this.modules.root)

        }
        get state(){
          console.log('this._state',this._state)
          return this._state.state
        }
        commit = (type, payload) => {
          this.mutations[type].forEach(fn => fn(payload))
        }
        dispatch = (type, payload) => {
          this.actions[type].forEach(fn => fn(payload))
        }

      }

      const Vuex = {
        Store,
        install
      }

      window.Vue.use(Vuex)
      const store = new Vuex.Store({
        state: {
          age: 100
        },
        getters: {
          myAge: function(state){
            return state.age + 10000
          }
        },
        mutations: {
          syncAdd (state, payload){
            state.age += payload
          },
          syncMinus(state, payload){
            state.age -= payload
          }
        },
        actions: {
          asyncMinus({ commit, state }, payload){
            setTimeout(() => {
              commit('syncMinus', payload)
            }, 1000)
          }
        },
        modules: {
          a: {
            state: {
              x: 1
            },
            modules: {
              c: {
                state: {
                  z: 1
                }
              }
            },
            getters: {
              getA(state){
                return 'getter a.x'+state.x
              }
            }
          },
          b: {
            state: {
              y: 1
            },
          },
        },
      })

      new window.Vue({
        el: '#app',
        store,
        mounted: function(){
          // setTimeout(() => {
          //   this.$store.state.age = 20
          // }, 1000)
        },
        methods: {
          add(){
            this.$store.commit('syncAdd', 10)
          },
          minus(){
            this.$store.dispatch('asyncMinus', 10)
          }
        }
      })

    </script>


  </body>
</html>
```

