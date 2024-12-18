"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useCallback } from "react";
import Fuse from "fuse.js";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  username: string;
  street: string;
  city: string;
  zip: string;
  phone: string;
  website: string;
  occupation: string;
  hobbies: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  type FuseResult = { item: User; refIndex: number; score?: number };
  const [searchResults, setSearchResults] = useState<FuseResult[]>([]);
  const [fuseSearch, setFuseSearch] = useState<Fuse<User> | null>(null);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
      const fuseSearch = new Fuse<User>(data, {
        threshold: 0.1,
        keys: ["name", "email"],
      });
      setFuseSearch(fuseSearch);
    });
  }, []);

  const getUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    return data;
  };

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!fuseSearch) return;
      const result = fuseSearch.search(e.target.value);
      setSearchResults(result);
    },
    [fuseSearch, users]
  );

  return (
    <div className="">
      <div className="mb-6">
        <Input placeholder="Search users" onChange={handleChange} />
      </div>
      <div className="grid grid-cols-4 gap-6 p-8 border rounded-xl mb-8">
        <div className="col-span-4">
          <h2 className="text-2xl font-bold">Search Results {searchResults.length}</h2>
        </div>
        {searchResults.map((result) => (
          <Card key={result.item.id}>
            <CardHeader>
              <CardTitle>{result.item.name}</CardTitle>
              <CardDescription>{result.item.email}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-6">
        {users.map(
          (user: {
            id: number;
            name: string;
            email: string;
            age: number;
            username: string;
            street: string;
            city: string;
            zip: string;
            phone: string;
            website: string;
            occupation: string;
            hobbies: string;
          }) => (
            <Card key={user.id}>
              <CardHeader>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
            </Card>
          )
        )}
      </div>
    </div>
  );
}
