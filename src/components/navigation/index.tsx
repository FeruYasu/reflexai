import Link from 'next/link';
import { NavigationMenu } from 'radix-ui';
import { Bot, FileClock, Settings } from 'lucide-react';

export function Navigation() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List className="mt-8 space-y-6">
        <NavigationMenu.Item className="group flex cursor-pointer items-center gap-4 rounded px-3 py-2 text-white hover:bg-blue-ra-800">
          <Bot className="h-6 w-6 group-hover:text-green-200" />
          <Link
            href={'/'}
            className="text-lg font-semibold group-hover:text-green-200"
          >
            Simulations
          </Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item className="group flex cursor-pointer items-center gap-4 rounded px-3 py-2 text-white hover:bg-blue-ra-800">
          <FileClock className="h-6 w-6 group-hover:text-green-200" />
          <Link
            href={'/'}
            className="text-lg font-semibold group-hover:text-green-200"
          >
            History
          </Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item className="group flex cursor-pointer items-center gap-4 rounded px-3 py-2 text-white hover:bg-blue-ra-800">
          <Settings className="h-6 w-6 group-hover:text-green-200" />
          <Link
            href={'/'}
            className="text-lg font-semibold group-hover:text-green-200"
          >
            Settings
          </Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
