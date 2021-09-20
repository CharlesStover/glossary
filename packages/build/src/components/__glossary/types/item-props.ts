export default interface ItemProps {
  readonly definition?: string | undefined;
  readonly loading: boolean;
  readonly onClick: () => void;
  readonly search: string;
  readonly selected: boolean;
  readonly word: string;
}
