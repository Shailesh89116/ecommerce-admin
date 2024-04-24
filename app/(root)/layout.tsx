import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth();

  console.log(
    userId
  );
  
let store;
  if (!userId) {
    redirect('/sign-in');
  }

  try {
     store = await prismadb.store.findFirst({
      where: {
        userId,
      }
    });
  } catch (error) {
    
  }

  if (store) {
    redirect(`/${store.id}`);
  };

  return (
    <>
      {children}
    </>
  );
};
