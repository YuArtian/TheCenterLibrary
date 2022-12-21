
function sum() {
  // const args: IArguments = arguments
  const args: {
    [index: number]: number;
    length: number;
    callee: Function;
  } = arguments
  console.log('args', args)
}

const arr: Array<number> = [1, 2, 3]