"use client";

import { Button, Input, Avatar } from "@material-tailwind/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTodo, getTodos } from "actions/todo-actions";
import Todo from "components/todo";
import LogoutButton from "components/auth/logout";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function UI({ currentUser, avatarUrl }) {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const todosQuery = useQuery({
    queryKey: ["todos", searchInput],
    queryFn: () => getTodos({ searchInput }),
  });

  const createTodoMutation = useMutation({
    mutationFn: () =>
      createTodo({
        title: "New Todo",
        completed: false,
      }),

    onSuccess: () => {
      todosQuery.refetch();
    },
  });

  return (
    <>
      <nav className="h-16 bg-blue-gray-50">
        <div className="container mx-auto h-full flex items-center justify-between">
          <h1 className="text-lg font-bold ml-4">HOTB Onboarding</h1>
          <div className="flex gap-4 items-center mr-4">
            {currentUser ? (
              <>
                {avatarUrl && <Avatar src={avatarUrl} alt="avatar" />}
                <p>Hello, {currentUser}</p>
                <LogoutButton />
              </>
            ) : (
              <Button
                onClick={() => router.push('/signin')}
                buttonType="filled"
                size="regular"
                block={false}
                iconOnly={false}
                ripple="light"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </nav >
      <div className="w-2/3 mx-auto flex flex-col items-center py-10 gap-2">

        <h1 className="text-xl">HOTB Onboarding Process<i className="fas fa-rocket" /></h1>
        <h2 className="py-4 self-start">1. Installation List</h2>
        <Input
          label="Search TODO"
          placeholder="Search TODO"
          icon={<i className="fas fa-search" />}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        {todosQuery.isPending && <p>Loading...</p>}
        {todosQuery.data &&
          todosQuery.data.map((todo) => <Todo key={todo.id} todo={todo} />)}
        <Button
          onClick={() => createTodoMutation.mutate()}
          loading={createTodoMutation.isPending}
        >
          <i className="fas fa-plus mr-2" />
          ADD TODO
        </Button>


        <h2 className="py-4 self-start">2. Bitbucket Branching Strategy</h2>
        <h2 className="py-4 self-start">3. How to make your first Pull Request</h2>
        <h2 className="py-4 self-start">4. Frontend Roadmap</h2>
        <h2 className="py-4 self-start">5. Backend Roadmap</h2>
        <h2 className="py-4 self-start">6. Working with Devops/Designers</h2>
        <h2 className="py-4 self-start">6. Useful Links</h2>
      </div>
    </>
  );
}