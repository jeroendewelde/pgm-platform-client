import { important, transparentize } from "polished";
import styled from "styled-components";

const SelectStyle = styled.input<SelectProps>`
  text-align: left;
  transition: ${(props) => props.theme.transition.normal};
  background-color: ${(props) => transparentize(0.7, props.theme.colors.black)};
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

  border-left: ${({ color }) => {
    if (color === "blue") {
      return (props) => `10px solid ${props.theme.colors.blue}`;
    } else if (color === "green") {
      return (props) => `10px solid ${props.theme.colors.green}`;
    } else if (color === "orange") {
      return (props) => `10px solid ${props.theme.colors.orange}`;
    } else if (color === "pink") {
      return (props) => `10px solid ${props.theme.colors.pink}`;
    } else if (color === "red") {
      return (props) => `10px solid ${props.theme.colors.red}`;
    } else {
      return (props) => `10px solid ${props.theme.colors.white}`;
    }
  }};

  &:first-of-type {
    border-top: none;
  }

  &:hover {
    background-color: ${({ color }) => {
      if (color === "blue") {
        return (props) => transparentize(0.5, props.theme.colors.blue);
      } else if (color === "green") {
        return (props) => transparentize(0.5, props.theme.colors.green);
      } else if (color === "orange") {
        return (props) => transparentize(0.5, props.theme.colors.orange);
      } else if (color === "pink") {
        return (props) => transparentize(0.5, props.theme.colors.pink);
      } else if (color === "red") {
        return (props) => transparentize(0.5, props.theme.colors.red);
      } else {
        return (props) => transparentize(0.5, props.theme.colors.white);
      }
    }};
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
  color?: string;
}

export const Select = ({
  type,
  open,
  value,
  name,
  setOpen,
  color,
}: SelectProps) => {
  return (
    <SelectStyle
      onClick={() => setOpen(!open)}
      setOpen={setOpen}
      type={type}
      open={open}
      value={value}
      name={name}
      color={color}
    />
  );
};
