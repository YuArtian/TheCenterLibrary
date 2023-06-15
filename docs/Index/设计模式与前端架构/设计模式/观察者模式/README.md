# 观察者模式（Observer mode）

比较概念的解释是，目标和观察者是基类，目标提供维护观察者的一系列方法，观察者提供更新接口

具体观察者和具体目标继承各自的基类，然后具体观察者把自己注册到具体目标里，在具体目标发生变化时候，调度观察者的更新方法

![观察者模式](https://github.com/YuArtian/yuartian.github.io/blob/master/.gitbook/assets/%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F_0.png?raw=true)

