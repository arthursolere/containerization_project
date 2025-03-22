export interface User {
  email: string;
  id: number;
  pseudo: string;
  name: string;
}

export function getCurrentUser(): User | undefined {
  const userStr: string | null = localStorage.getItem('loggedInUser');
  if (!userStr) return undefined;
  return JSON.parse(userStr) as User;
}

export function setCurrentUser(user: User) {
  localStorage.setItem('loggedInUser', JSON.stringify(user));
}

export function removeCurrentUser() {
  localStorage.removeItem('loggedInUser');
}