export enum Status {
  // eslint-disable-next-line no-unused-vars
  PENDING = 'PENDING',
  // eslint-disable-next-line no-unused-vars
  FINISHED = 'FINISHED',
}

export type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never
