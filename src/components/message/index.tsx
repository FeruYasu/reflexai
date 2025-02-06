import { timestampToHour } from '@/helpers';
import { ChatMessage } from '@prisma/client';
import { User } from 'lucide-react';
import { tv, VariantProps } from 'tailwind-variants';

const message = tv({
  slots: {
    container: 'flex flex-col',
    iconContainer: 'flex mb-2',
    userBox: 'flex items-center gap-1 rounded-lg px-2',
    bubble: 'rounded-lg p-4',
  },

  variants: {
    state: {
      user: {
        container: 'ml-auto mr-4',
        iconContainer: 'ml-auto',
        userBox: 'ml-4  bg-blue-200  text-blue-600',
        bubble: 'bg-blue-ra-900 text-white',
      },
      bot: {
        container: 'ml-4 mr-auto ',
        iconContainer: 'mr-auto flex-row-reverse',
        userBox: 'mr-4  bg-green-200 text-green-600',
        bubble: 'bg-blue-100 text-zinc-800',
      },
    },
  },
  defaultVariants: {
    state: 'user',
  },
});

export type MessageProps = VariantProps<typeof message> & {
  chatMessage: ChatMessage;
};

export function Message({ chatMessage }: MessageProps) {
  const { timestamp, content, sender } = chatMessage;
  const state = sender === 'BOT' ? 'bot' : 'user';

  const { bubble, container, iconContainer, userBox } = message({ state });
  const timeString = timestampToHour(timestamp);

  return (
    <div className={container()}>
      <div className={iconContainer()}>
        <p>{timeString}</p>
        <div className={userBox()}>
          <User className="h-4 w-4" />
          <p>You</p>
        </div>
      </div>

      <div className={bubble()}>
        <p>{content}</p>
      </div>
    </div>
  );
}
