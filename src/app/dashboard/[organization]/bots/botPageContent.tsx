'use client';
import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Bot from './components/bot';
import Button from '~/core/ui/Button';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import CreateBotModal from './components/createBot';
import { getBots } from './crud';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return date.toLocaleDateString('en-GB', options);
}

const BotPageContent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allbots, setAllBots] = useState<any[]>([]);
  const [effect, setEffect] = useState<number>(0);

  useEffect(() => {
    (async function name() {
      const data = await getBots();
      setAllBots(data);
    })();
  }, [effect]);

  return (
    <Container>
      <div className={'flex justify-end w-full'}>
        <Button
          size={'sm'}
          variant={'outline'}
          onClick={() => setIsModalOpen(true)}
          className={'align-super'}
        >
          <Cog6ToothIcon className={'w-4 mr-2'} />

          <span>Add Bot</span>
        </Button>
      </div>

      <div
        className={
          'grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3' +
          ' 2xl:grid-cols-4'
        }
      >
        {allbots.map((bot) => (
          <Bot
            key={bot.id}
            name={bot.name}
            description={bot.description}
            dateCreated={formatDate(bot.created_at)}
            id={bot.id}
            type={bot.base}
            setEffect={setEffect}
          />
        ))}
      </div>
      <CreateBotModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        setEffect={setEffect}
      />
    </Container>
  );
};

export default BotPageContent;
