import { ChangeEvent, FormEvent, useState } from 'react';
import { FormProps } from '../types';

function Form({ addTodo }: FormProps) {
  const [text, setText] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (text.length < 1) return;
    addTodo(text);
    setText('');
  }

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <label className="relative">
        <div className="rounded-full border border-gray-300 absolute w-4 h-4 top-1/2 -translate-y-1/2 left-4 z-10"></div>
        <input
          type="text"
          placeholder="Create a new todo..."
          className="block w-full text-base px-12 py-4 bg-white dark:bg-[#25273C] dark:text-white rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:focus-visible:ring-gray-100"
          value={text}
          onChange={handleChange}
        />
      </label>
    </form>
  );
}

export default Form;
