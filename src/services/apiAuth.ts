import { LoginInputs, RegisterInputs } from '../types';
import supabase from './supabase';

export async function signup({ name, email, password }: RegisterInputs) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        displayName: name,
      },
    },
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function login({ email, password }: LoginInputs) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  // Step 1: Check for active session
  const { data: session } = await supabase.auth.getSession();

  // Step 2: Return null if no session exists
  if (!session.session) return null;

  // Step 3: Get user details
  const { data, error } = await supabase.auth.getUser();

  console.log(data);

  // Step 4: Error handling
  if (error) throw new Error(error.message);

  // Step 5: Return user data
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

interface UpdateUserData {
  displayName: string;
}
export async function updateCurrentUser({ displayName }: UpdateUserData) {
  // Step 1: Prepare update data
  const updateData = { data: { displayName } };

  // Step 2: Update user data
  const { data, error } = await supabase.auth.updateUser(updateData);

  // Step 3: Handle errors
  if (error) throw new Error(error.message);

  // Step 4: Return updated user data
  return data;
}
