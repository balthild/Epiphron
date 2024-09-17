export function dbg<T>(value: T) {
  console.log(value);
  return value;
}

export type RemoveSuffix<T extends string, S extends string> = T extends `${infer R}${S}`
  ? R
  : never;
