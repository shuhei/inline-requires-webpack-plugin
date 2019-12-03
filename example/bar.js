import baz from "./baz.json";

export function bar() {
  console.log("bar", baz);
}

export function unused() {
  console.log("This function should be removed by tree shaking");
}
