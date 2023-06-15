# fetch

> https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch

## 封装

```js
//封装全局fetch请求
function fetchAdapter(type='GET', url, config={}){
  if(!url) return
  const fetchPromise = fetch(url, {
    signal,
    type,
    credentials: 'include',
    ...config,
  })
  let timeoutPromise = new Promise((reslove, reject) => {
    setTimeout(() => {
      contorller.abort()
      reject(new Error('timeout'))
    }, config.timeout || 3000)
  })

  return Promise.race(timeoutPromise, fetchPromise)
    .then(response => {
    if(response.ok){
      return response.json()
    }
    //网络错误
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  })
    .catch(err => {})
}
```



