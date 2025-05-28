
import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/GlobalContext";
import Button from "../Button/Button";
import { plus } from "../../utils/Icons";
import { FiCalendar } from "react-icons/fi";

function Form() {
  const { addIncome, error, user, clearError } = useGlobalContext();

  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: null,
    category: "",
    description: "",
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    if (typeof clearError === "function") clearError();
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!user?._id) {
    alert("User not authenticated");
    return;
  }

  const newIncome = {
    ...inputState,
    amount: Number(inputState.amount), // ✅ convert to number
    user: user._id,
  };

  addIncome(newIncome);

  setInputState({
    title: "",
    amount: "",
    date: null,
    category: "",
    description: "",
  });
};

  return (
    <FormStyled onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <div className="input-control">
        <input
          type="text"
          value={title}
          name="title"
          placeholder="Salary Title"
          onChange={handleInput("title")}
        />
      </div>
      <div className="input-control">
        <input
          value={amount}
          type="text"
          name="amount"
          placeholder="Salary Amount"
          onChange={handleInput("amount")}
        />
      </div>
      <div style={{ position: "relative", display: "inline-block" }}>
      <DatePicker
        id="date"
        placeholderText="Enter A Date"
        selected={date}
        dateFormat="dd/MM/yyyy"
        onChange={(date) => {
          setInputState({ ...inputState, date });
          if (typeof clearError === "function") clearError();
        }}
        isClearable
        style={{ paddingRight: "30px" }} // space for icon
      />
      <span
        className="calendar-icon"
        onClick={() => document.getElementById("date")?.focus()}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
          color: "black", // ensure it's black
        }}
      >
        <FiCalendar size={18} />
      </span>
    </div>
      <div className="selects input-control">
        <select
          required
          value={category}
          name="category"
          id="category"
          onChange={handleInput("category")}
        >
          <option value="" disabled>Select Option</option>
          <option value="salary">Salary</option>
          <option value="freelancing">Freelancing</option>
          <option value="investments">Investments</option>
          <option value="stocks">Stocks</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="bank">Bank Transfer</option>
          <option value="youtube">YouTube</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="input-control">
        <textarea
          name="description"
          value={description}
          placeholder="Add A Reference"
          id="description"
          cols="25"
          rows="3"
          onChange={handleInput("description")}
        ></textarea>
      </div>
      <div className="submit-btn">
        <Button
          name="Add Income"
          icon={plus}
          bPad=".8rem 1.6rem"
          bRad="30px"
          color="#fff"
        />
      </div>
    </FormStyled>
  );
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  padding: 5rem;
  margin: 1rem;
  gap: 2rem;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

  .error {
    color: red;
    font-weight: bold;
    text-align: center;
  }

  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }

  .input-control input {
    width: 85%;
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }
    .calendar-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: black;
}

  .submit-btn button {
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    &:hover {
      background: var(--color-green) !important;
    }
  }
`;

export default Form;
