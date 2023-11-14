import React from 'react';
import { useLazyGetClassesQuery } from '@org/store';
import { useMount } from '@org/core';

export function ClassesPage() {
  const [getData, { data }] = useLazyGetClassesQuery();
  console.log(data);
  useMount(() => {
    getData({});
  });
  return <div>Classes</div>;
}
