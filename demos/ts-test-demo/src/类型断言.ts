interface Animal {
  name: string;
}

interface Cat {
  name: string;
  run(): void;
}

let tom: Cat = {
  name: 'tom',
  run: () => {console.log('run!')}
}

let animal: Animal = tom

let animal2: Animal = {
  name: 'jack',
  // walk: () => {},
  // run: () => {}
}
// animal.run()

// let tom2: Cat = animal2

// tom2.run()
