import { NewTodo, Todo } from '../types';
import supabase from './supabase';

export async function getTodos() {
  const { data, error } = await supabase
    .from('Todos')
    .select('id, todo, completed, position')
    .order('position', { ascending: false }); // Sort by 'position' in descending order

  if (error) {
    console.error(error);
    throw new Error('Todos could not be loaded');
  }

  return data;
}

export async function createEditTodo(newTodo: NewTodo, id: string) {
  // A) CREATE
  if (!id) {
    // Step 1: Fetch all existing todos to determine their count
    const { data: existingTodos, error: fetchError } = await supabase
      .from('Todos')
      .select('*');

    if (fetchError) {
      console.error(fetchError);
      throw new Error('Todos could not be fetched');
    }

    // Step 2: Calculate the position for the new todo
    const newPosition = existingTodos ? existingTodos.length + 1 : 1;

    // Step 3: Insert the new todo with the calculated position
    const { data, error } = await supabase
      .from('Todos')
      .insert([{ ...newTodo, position: newPosition }])
      .select('*')
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

export async function deleteCompletedTodos() {
  const { data, error } = await supabase
    .from('Todos')
    .delete()
    .eq('completed', true);

  if (error) {
    console.error(error);
    throw new Error('Completed Todos could not be deleted');
  }

  return data;
}

export async function getCompletedTodos() {
  const { data, error } = await supabase.from('Todos').select('completed');

  if (error) {
    console.error(error);
    throw new Error('Completed Todos could not be fetched');
  }

  return data;
}

export async function updateTodosOrder(newOrder: Todo[]) {
  // const updates = newOrder.map((todo, index) => ({
  //   id: todo.id,
  //   position: index + 1,
  // }));
  const updates = newOrder.map(({ id, todo, completed }, index) => ({
    id: id,
    todo: todo,
    completed: completed,
    position: index + 1,
  }));

  const { data, error } = await supabase
    .from('Todos')
    .upsert(updates, { onConflict: 'id' })
    .select();

  if (error) {
    console.error(error);
    throw new Error('Could not reorder todos');
  }

  return data;
}
