import { transparentize } from "polished";
import styled from "styled-components";

const SelectStyle = styled.input<SelectProps>`
  text-align: left;
  transition: ${(props) => props.theme.transition.normal};
  background-color: ${(props) =>
    transparentize(0.7, props.theme.colors.purple)};
  width: 100%;
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);

  color: ${(props) => props.theme.colors.white};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  font-family: ${(props) => props.theme.fontFamilies.secondary};
  text-transform: capitalize;
  border: none;
  border-top: 1px solid
    ${(props) => transparentize(0.5, props.theme.colors.white)};
  padding: 0.75rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      transparentize(0.5, props.theme.colors.purple)};
  }

  &:focus {
    outline: none;
  }
`;

interface SelectProps {
  type: "button" | undefined;
  open: boolean;
  value: string;
  name: string;
  setOpen: (open: boolean) => void;
}

export const Select = ({ type, open, value, name, setOpen }: SelectProps) => {
  return (
    <SelectStyle
      onClick={() => setOpen(!open)}
      setOpen={setOpen}
      type={type}
      open={open}
      value={value}
      name={name}
    />
  );
};
