# BFF&SFF架构

> https://www.yuque.com/egg/nodejs/sff-history
>
> https://samnewman.io/patterns/architectural/bff/
>
> https://www.yuque.com/egg/nodejs/cpn3uo#tkqgiq



## [Backends For Frontends](https://samnewman.io/patterns/architectural/bff/)

简称之为 BFF，最重要的是：**`服务自治` ，谁使用谁开发，**带来了灵活与高效

BFF 根据团队的技术栈来选型，在我们的业务场景中，相对较优，生态最活跃，最能被前端接受的 Node.js

BFF 层一直都存在，因为 `领域模型` - `UI 模型` 的转换是必然会存在的，区别只是在于维护者是谁

GraphQL 之类的网关可以视为通用型的 BFF

## SSF

