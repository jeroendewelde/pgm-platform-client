import React, { useEffect, useState } from "react";
import { Field, Formik } from "formik";
import { MdExpandMore } from "react-icons/md";

import styled from "styled-components";
import { transparentize } from "polished";
import { Select } from "./Select";
import { LearningLine } from "../../../interfaces";

interface Props {
  open: boolean;
}

const Container = styled.div`
  overflow: hidden;
  display: flex;
  width: 100%;
  min-width: 17rem;
  border-bottom: ${(props) => props.theme.colors.turquoise} 2px solid;
  max-width: 18.5rem;
`;

const OpenSelect = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin-bottom: 0.5rem;
  width: 100%;

  .label {
    font-weight: ${(props) => props.theme.fontWeights.bold};
    font-size: ${(props) => props.theme.fontSizes.normal};
  }

  .icon {
    transform: ${({ open }) => (open ? "rotate(180deg)" : "0")};
    transition: ${(props) => props.theme.transition.normal};
    font-size: ${(props) => props.theme.fontSizes.semimedium};
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const FormContainer = styled.div<Props>`
  overflow: hidden;
  position: absolute;
  z-index: 2;

  min-height: ${({ open }) => (open ? "16rem" : "0")};
  height: ${({ open }) => (open ? "16rem" : "0")};
  transition: ${(props) => props.theme.transition.bounce};
  margin-top: 2.5rem;

  .form {
    margin-top: -2.5rem;
    transition: ${(props) => props.theme.transition.bounce};
    transform: ${({ open }) =>
      open ? "translateY(2.5rem)" : "translateY(-100%)"};
    width: calc(100% - 1.5rem);
    min-width: 17rem;
    max-width: 20rem;
    border-radius: ${(props) => props.theme.borderRadius.small};
    overflow: hidden;
  }
`;

interface SelectItemProps {
  learningLines: LearningLine[];
  onChange: (value: string) => void;
}

const Filter = ({ learningLines, onChange }: SelectItemProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const handleToggle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setOpen(!open);
  };

  useEffect(() => {
    onChange(selected);
  }, [selected, onChange]);

  return (
    <Container>
      <OpenSelect open={open} onClick={handleToggle}>
        <span className="label">Leerlijn</span>
        <span className="icon">
          <MdExpandMore />
        </span>
      </OpenSelect>

      <FormContainer open={open}>
        <Formik
          initialValues={{
            leerlijn: "",
          }}
          onSubmit={(value) => {
            setSelected(value.leerlijn);
          }}
        >
          {({
            values,
            handleSubmit,
            isSubmitting,
            handleChange,
            handleBlur,
            submitForm,
          }) => (
            <form
              className="form"
              onClick={(e) => {
                handleChange(e);
                setTimeout(() => {
                  submitForm();
                });
              }}
            >
              <Field
                type="button"
                name="leerlijn"
                open={open}
                value={"Alle"}
                as={Select}
                onClick={handleToggle}
              />
              {learningLines?.map((learningLine) => (
                <Field
                  type="button"
                  name="leerlijn"
                  open={open}
                  value={learningLine.name}
                  as={Select}
                  onClick={handleToggle}
                  color={learningLine.color}
                />
              ))}
            </form>
          )}
        </Formik>
      </FormContainer>
    </Container>
  );
};

export default Filter;
