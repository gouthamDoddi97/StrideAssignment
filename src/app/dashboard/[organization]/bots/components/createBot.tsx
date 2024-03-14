'use client';

import { useFormStatus } from 'react-dom';
import { useState } from 'react';

import TextField from '~/core/ui/TextField';
import Button from '~/core/ui/Button';
import Alert from '~/core/ui/Alert';
import Trans from '~/core/ui/Trans';
import If from '~/core/ui/If';
import { Dialog, DialogContent, DialogTitle } from '~/core/ui/Dialog';

import { createBot } from '../crud';
import Textarea from '~/core/ui/Textarea';
import { toast } from 'sonner';

const CreateBotModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setEffect: (effect: number) => void;
}> = ({ isOpen, setIsOpen, setEffect }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogTitle>
          <Trans i18nKey={'Add A Bot'} />
        </DialogTitle>

        <CreateBotForm setIsOpen={setIsOpen} setEffect={setEffect} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateBotModal;

function CreateBotForm({
  setIsOpen,
  setEffect,
}: {
  setIsOpen: (isOpen: boolean) => void;
  setEffect: (effect: number) => void;
}) {
  const [error, setError] = useState<boolean>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.currentTarget); // Get form data
    const formDataJSON = Object.fromEntries(formData.entries()); // Convert FormData to JSON
    console.log(formDataJSON);

    try {
      const status = await createBot(formDataJSON); // Call createBot with form data
      console.log(status);
      if (status == 201) {
        toast.success('Successfully created a bot.');
        setEffect(Math.random() * 100);
      } else {
        toast.error('Error creating a bot');
      }
      setIsOpen(false); // Close modal on successful submission
    } catch (error) {
      setError(true); // Set error state if submission fails
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className={'flex flex-col space-y-6'}>
        <If condition={error}>
          <CreateBotErrorAlert />
        </If>

        <TextField>
          <TextField.Label>
            <Trans i18nKey={'Bot Name'} />

            <TextField.Input
              data-cy={'create-bot-name-input'}
              name={'name'}
              required
              minLength={2}
              maxLength={50}
              placeholder={''}
            />
          </TextField.Label>
        </TextField>
        <TextField>
          <TextField.Label>
            <Trans i18nKey={'Model Base'} />

            <TextField.Input
              data-cy={'create-bot-base-input'}
              name={'base'}
              required
              minLength={2}
              maxLength={20}
              placeholder={''}
            />
          </TextField.Label>
        </TextField>
        <TextField>
          <TextField.Label>
            <Trans i18nKey={'Description'} />

            <Textarea
              data-cy={'create-bot-description-input'}
              name={'description'}
              required
              minLength={2}
              placeholder={''}
            />
          </TextField.Label>
        </TextField>

        <div className={'flex space-x-2 justify-end'}>
          <Button
            variant={'ghost'}
            type={'button'}
            onClick={() => setIsOpen(false)}
          >
            <Trans i18nKey={'common:cancel'} />
          </Button>

          <SubmitButton />
        </div>
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button data-cy={'confirm-create-bot-button'} loading={pending}>
      <Trans i18nKey={'Submit'} />
    </Button>
  );
}

function CreateBotErrorAlert() {
  return (
    <Alert type={'error'}>
      <Alert.Heading>
        <Trans i18nKey={'Error Creating Bot'} />
      </Alert.Heading>

      <Trans i18nKey={'Bot not created, please try again...'} />
    </Alert>
  );
}
