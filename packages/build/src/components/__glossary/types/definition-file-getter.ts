// eslint-disable-next-line @typescript-eslint/no-type-alias
type DefinitionFileGetter = () => Promise<{ default: Record<string, string> }>;

export default DefinitionFileGetter;
