// An object builder that self-references its keys using a callback function
declare function makeObj<K extends string>(
    builder: (ref: (k: K) => number) => Record<K, number>
): Record<K, number>;

// Not using `ref` by now. All good, K is inferred as <"x" | "y">.
const obj1 = makeObj(() => ({ x: 1, y: 2 }));

// Oops, now that we try to use `ref`, K is inferred as <string>.
const obj2 = makeObj(ref => ({ x: 1, y: ref("this shouldn't be allowed, only x/y") }));

// This works, but we'd want K to be automatically inferred.
const obj3 = makeObj<"x" | "y">(ref => ({ x: 1, y: ref("x") }));
