import { db } from '@/lib/db';

export default async function Home() {
  await db.set('hello', 'sarang');
  return (<>
   <h1 className='text-red-300'>sarang</h1>

  </>
    )
}
