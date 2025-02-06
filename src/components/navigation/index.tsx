import Link from 'next/link';
import { NavigationMenu } from 'radix-ui';
import { Bot, FileClock } from 'lucide-react';

export function Navigation() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List className="mt-8 flex flex-col space-y-4 md:mt-2 lg:mt-8">
        <Link
          href={'/'}
          className="text-lg font-semibold group-hover:text-green-200"
        >
          <NavigationMenu.Item className="group flex cursor-pointer items-center gap-4 rounded py-2 text-white hover:bg-blue-ra-800">
            <Bot className="h-6 w-6 group-hover:text-green-200" />
            Simulations
          </NavigationMenu.Item>
        </Link>

        <Link
          href={'/history'}
          className="text-lg font-semibold group-hover:text-green-200"
        >
          <NavigationMenu.Item className="group flex cursor-pointer items-center gap-4 rounded py-2 text-white hover:bg-blue-ra-800">
            <FileClock className="h-6 w-6 group-hover:text-green-200" />
            History
          </NavigationMenu.Item>
        </Link>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
