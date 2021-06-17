const convertToSingleLine = (
  multilineString: TemplateStringsArray,
  withoutSpace?: boolean
): readonly string[] => {
  const replacedWith = withoutSpace ? '' : ' '

  return multilineString.raw.map(str => str.replace(/[\n\r]+ */g, replacedWith))
}

export const singleLine = (
  multilineString: TemplateStringsArray,
  ...values: unknown[]
): string => {
  const stringArray: readonly string[] = convertToSingleLine(multilineString)

  return String.raw(
    // @ts-ignore
    { raw: stringArray },
    ...values
  )
}

export const singleLineWithoutSpace = (
  multilineString: TemplateStringsArray,
  ...values: unknown[]
): string => {
  const stringArray: readonly string[] = convertToSingleLine(
    multilineString,
    true
  )

  return String.raw(
    // @ts-ignore
    { raw: stringArray },
    ...values
  )
}
