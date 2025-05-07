import { Todo } from '../types';
import supabase from './supabase';

export async function getTodos() {
  const { data, error } = await supabase
    .from('Todos')
    .select('id, todo, completed');

  if (error) {
    console.error(error);
    throw new Error('Todos could not be loaded');
  }

  return data;
}

export async function createEditTodo(newTodo: Todo, id: string) {
  // A) CREATE
  if (!id) {
    const { data, error } = await supabase
      .from('Todos')
      .insert([{ ...newTodo }])
      .select()
      .single();

    if (error) {
      console.error(error);
      throw new Error('Todo could not be created');
    }

    return data;
  }

  // B) EDIT
  if (id) {
    const { data, error } = await supabase
      .from('Todos')
      .update({ ...newTodo })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(error);
      throw new Error('Todo could not be updated');
    }

    return data;
  }
}

export async function deleteTodo(id: string) {
  const { error } = await supabase.from('Todos').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Todo could not be deleted');
  }
}

export async function getCompletedTodos() {
  const { data, error } = await supabase
    .from('Todos')
    .select('completed');

    if (error) {
      console.error(error);
      throw new Error('Completed Todos could not be fetched');
    }

    return data;
}
