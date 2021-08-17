import BusinessCard from '@/components/Home/BusinessCard';
import Activities from '@/components/Home/Activities';
import SelectedWorks from '@/components/Home/SelectedWorks';
import Log from '@/components/Log';
import fetchUpdates from '@/lib/fetchUpdates';

type TLogType = 'GitHub' | 'Portfolio' | 'Zenn';

type Props = {
  showOnTop: boolean;
  logType: TLogType;
  date: string;
  body: string;
};

export default function Home({ updates }: { updates: Props[] }) {
  return (
    <div className='grid px-8 grid-cols-1 gap-10 md:grid-cols-[minmax(300px,400px)minmax(300px,1fr)]'>
      <BusinessCard />
      <Activities>
        {updates
          .filter((update) => update.showOnTop)
          .map((update, index) => (
            <Log
              key={index}
              logType={update.logType}
              date={update.date}
              body={update.body}
            />
          ))}
      </Activities>
      <div className='md:col-span-2'>
        <SelectedWorks />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const updates = await fetchUpdates();

  return {
    props: { updates },
  };
}
