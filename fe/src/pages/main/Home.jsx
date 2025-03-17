import React from "react";
import { Header } from "../../components/Header";
import { Search } from "../../components/Search";
import  BookList  from "../../components/BookList";

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Search />
        <BookList />

      </main>
    </div>
  );
}

export default Home;
