'use client';

import {
  PencilIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Text } from '@react-email/components';
import React, { useState } from 'react';
import Button from '~/core/ui/Button';
import IconButton from '~/core/ui/IconButton';
import Tile from '~/core/ui/Tile';
import UpdateBotModal from './updateBot';
import DeleteBotModal from './deleteBotModel';
import { deleteBot } from '../crud';
import { toast } from 'sonner';

export interface BotPageProps {
  name: string;
  description: string;
  dateCreated: string;
  type: string;
  id: number;
  setEffect: (value: number) => void;
}

const Bot: React.FC<BotPageProps> = ({
  name,
  description,
  dateCreated,
  type,
  id,
  setEffect,
}) => {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [nameCurrent, setName] = useState(name);
  const [descriptionCurrent, setDescription] = useState(description);
  const [base, setBase] = useState(type);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const opUpdateBot = (botData: {
    name: string;
    base: string;
    description: string;
  }) => {
    console.log('called');
    setBase(botData.base);
    setName(botData.name);
    setDescription(botData.description);
  };

  const handelDelete = async (id: number) => {
    console.log('handelDelete called', id);
    const result = await deleteBot(id);
    if (result == 204) {
      toast.success('Bot deleted successfully');
      setEffect(Math.random() * 100);
    } else {
      toast.error('Error deleting bot');
    }
  };

  return (
    <Tile>
      <div className={'flex justify-between'}>
        <Tile.Heading>{nameCurrent}</Tile.Heading>
        <div className="flex justify-between">
          <Button
            size={'sm'}
            variant={'ghost'}
            onClick={() => setIsUpdateOpen(true)}
          >
            <PencilSquareIcon className={'w-4 mr-2'} />
          </Button>
          <Button
            size={'sm'}
            variant={'ghost'}
            onClick={() => setIsDeleteOpen(true)}
          >
            <TrashIcon className={'w-4 mr-2'} />
          </Button>
        </div>
      </div>

      <Tile.Body>
        <div className={'flex justify-between'}>
          <Tile.Badge trend="stale">{type}</Tile.Badge>
          <Tile.DateBadge>{dateCreated}</Tile.DateBadge>
        </div>

        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
          <Tile.Body>{descriptionCurrent}</Tile.Body>
        </div>
      </Tile.Body>
      <UpdateBotModal
        isOpen={isUpdateOpen}
        setIsOpen={setIsUpdateOpen}
        botData={{ name, base, description, id }}
        onUpdateBot={opUpdateBot}
      />
      <DeleteBotModal
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        botId={id} // Pass bot ID to delete bot modal
        onDeleteBot={(id: number) => {
          handelDelete(id);
          setIsDeleteOpen(false); // Close delete bot dialog after deletion
        }}
      />
    </Tile>
  );
};

export default Bot;
