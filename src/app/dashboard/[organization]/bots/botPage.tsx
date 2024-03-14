import { PlusCircleIcon } from '@heroicons/react/24/outline';

import AppHeader from '../components/AppHeader';
import { withI18n } from '~/i18n/with-i18n';
import Trans from '~/core/ui/Trans';
import Button from '~/core/ui/Button';
import { PageBody } from '~/core/ui/Page';
import BotPageContent from './botPageContent';

function BotPage() {
  return (
    <>
      <AppHeader
        title={<Trans i18nKey={'Bots'} />}
        description={<Trans i18nKey={'Manage your bots.'} />}
      >
        <Button size={'sm'} variant={'outline'}>
          <PlusCircleIcon className={'w-4 mr-2'} />

          <span>Add Widget</span>
        </Button>
      </AppHeader>

      <PageBody>
        <BotPageContent />
      </PageBody>
    </>
  );
}

export default withI18n(BotPage);
