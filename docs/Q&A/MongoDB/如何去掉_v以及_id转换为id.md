# 如何去掉\_v以及\_id转换为id

> https://stackoverflow.com/questions/7034848/mongodb-output-id-instead-of-id

```
// Duplicate the ID field.
Schema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
Schema.set('toJSON', {
    virtuals: true
});
```

