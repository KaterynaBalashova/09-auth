"use client";

import css from '@/app/(private routes)/notes/filter/[...slug]/notes.module.css';
import { useState } from 'react';
import { fetchNotes } from '@/lib/api/clientApi';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from "@/components/NoteList/NoteList"
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';
// import { fetchServerNotes } from '@/lib/api/serverApi';

interface NotesClientProps {
  tag?: string; 
};

export default function NotesClient({tag}: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["notes", searchQuery, currentPage, tag],
    queryFn: () => fetchNotes(searchQuery, currentPage, tag),
    placeholderData: keepPreviousData,
  });

  const debouncedSetSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 300);

  const totalPages = data?.totalPages || 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {<SearchBox text={searchQuery} onSearch={debouncedSetSearchQuery} />}
        {isSuccess && totalPages > 1 && (<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />)}
        <Link href="/notes/action/create" className={css.button}>Create note +</Link>
      </header>
      {data && data.notes.length > 0 && !isLoading && <NoteList notes={data.notes} />}
    </div>
  );
};