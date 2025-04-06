import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import style from './Form.module.css';

const Form = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    /*onAdd({
      text: event.target.elements.text.value,
    })
    event.target.reset();*/

    const trimmedValue = inputValue.trim();

    if (trimmedValue !== '') {
      onAdd({text:trimmedValue});
      setInputValue('');
    }
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <button className={style.button} type="submit">
        <FiSearch size="16px" />
      </button>

      <input
        className={style.input}
        type="text"
        placeholder="What do you want to write?"
        name="search"
        autoFocus
        value={inputValue}
        onChange={handleChange}
      />
    </form>
  );
};

export default Form;