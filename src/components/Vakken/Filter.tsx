import React, { useState } from "react";
import { Field, Formik } from "formik";
import { MdExpandMore } from "react-icons/md";

import styled from "styled-components";
import { transparentize } from "polished";
import { Select } from "./Select";

interface Props {
  open: boolean;
}

const Container = styled.div`
  max-width: 20rem;
`;

const OpenSelect = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin-bottom: 0.5rem;

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
  max-height: ${({ open }) => (open ? "100%" : "0")};
  transition: ${(props) => props.theme.transition.bounce};

  .form {
    transition: ${(props) => props.theme.transition.bounce};
    transform: ${({ open }) => (open ? "translateY(0)" : "translateY(-100%)")};
    max-width: 20rem;
    border-radius: ${(props) => props.theme.borderRadius.small};
    overflow: hidden;
  }
`;

const Filter = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setOpen(!open);
  };

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
            console.log("submit");
            console.log(value);
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
                value={"Business & Communication"}
                as={Select}
                setOpen={setOpen}
              />
              <Field
                type="button"
                name="leerlijn"
                open={open}
                value={"Applied Information Technology"}
                as={Select}
                setOpen={setOpen}
              />
              <Field
                type="button"
                name="leerlijn"
                open={open}
                value={"Creative Design & Development"}
                as={Select}
                setOpen={setOpen}
              />
              <Field
                type="button"
                name="leerlijn"
                open={open}
                value={"Computer Programming"}
                as={Select}
                setOpen={setOpen}
              />
              <Field
                type="button"
                name="leerlijn"
                open={open}
                value={"Workplace Learning"}
                as={Select}
                setOpen={setOpen}
              />
            </form>
          )}
        </Formik>
      </FormContainer>
      <div>zfzefhzefilzehfoizefozehjfoijzefzejfzeiofoieifhj</div>
    </Container>
  );
};

export default Filter;
