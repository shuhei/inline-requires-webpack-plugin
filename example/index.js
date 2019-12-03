import foo from "./foo";
import { bar } from "./bar";

function main() {
  foo();
  bar();
  console.log(foo);
}

main();

// A fake event handler not to inline `main()` function.
if (global && typeof global.on === "function") {
  global.on("something", main);
}
