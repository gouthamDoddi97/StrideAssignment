'use client';

import { useFormStatus } from 'react-dom';
import { useState } from 'react';

import TextField from '~/core/ui/TextField';
import Button from '~/core/ui/Button';
import Alert from '~/core/ui/Alert';
import Trans from '~/core/ui/Trans';
import If from '~/core/ui/If';
import { Dialog, DialogContent, DialogTitle } from '~/core/ui/Dialog';

import { updateBot } from '../crud';
import Textarea from '~/core/ui/Textarea';
import { toast } from 'sonner';

const UpdateBotModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  botData: {
    name: string;
    base: string;
    description: string;
    id: number;
  };
  onUpdateBot: (botData: {
    name: string;
    base: string;
    description: string;
  }) => void;
}> = ({ isOpen, setIsOpen, botData, onUpdateBot }) => {
  const [error, setError] = useState<boolean>();
  const [formData, setFormData] = useState({
    name: botData.name,
    base: botData.base,
    description: botData.description,
    id: botData.id,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const { ...updatedData } = formData; // Destructure id from formData
      const status = await updateBot(botData.id, updatedData); // Pass id and updatedData to updateBot
      if (status === 204) {
        toast.success('Bot successfully updated.');
        onUpdateBot(formData); // Update bot data in parent component
      } else {
        toast.error('Error updating bot.');
      }
      setIsOpen(false); // Close modal on successful submission
    } catch (error) {
      setError(true); // Set error state if submission fails
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogTitle>
          <Trans i18nKey={'Update Bot'} />
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <div className={'flex flex-col space-y-6'}>
            <If condition={error}>
              <CreateBotErrorAlert />
            </If>

            <TextField>
              <TextField.Label>
                <Trans i18nKey={'Bot Name'} />

                <TextField.Input
                  data-cy={'update-bot-name-input'}
                  name={'name'}
                  value={formData.name}
                  onChange={handleChange}
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
                  data-cy={'update-bot-base-input'}
                  name={'base'}
                  value={formData.base}
                  onChange={handleChange}
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
                  data-cy={'update-bot-description-input'}
                  name={'description'}
                  value={formData.description}
                  onChange={handleChange}
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
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBotModal;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button data-cy={'confirm-update-bot-button'} loading={pending}>
      <Trans i18nKey={'Submit'} />
    </Button>
  );
}

function CreateBotErrorAlert() {
  return (
    <Alert type={'error'}>
      <Alert.Heading>
        <Trans i18nKey={'Error Updating Bot'} />
      </Alert.Heading>

      <Trans i18nKey={'Bot not updated, please try again...'} />
    </Alert>
  );
}
