'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaReact } from 'react-icons/fa';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from 'react-hot-toast';

import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from '@radix-ui/react-icons';

import { ModeToggle } from '@/components/mode-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';

import useAuthModal from '@/hooks/use-auth-modal';
import { useUser } from '@/hooks/use-user';

const Navbar = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');

  const { onOpen } = useAuthModal();
  const { user, userDetails } = useUser();

  useEffect(() => {
    async function downloadImage() {
      try {
        const { data, error } = await supabaseClient.storage
          .from('avatars')
          .download(userDetails?.avatar_url!);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log('Error downloading image: ', error);
      }
    }

    downloadImage();
  }, [supabaseClient, setAvatarUrl]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key == '/' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();

        setOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <header className="z-20 border-b">
      <nav>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-4 sm:px-0">
          <Link href="/" className="hidden sm:flex sm:items-center">
            <span className="self-center text-xl font-bold whitespace-nowrap dark:text-white">
              DIGEST
            </span>
          </Link>

          <Link href="/" className="flex items-center sm:hidden">
            <FaReact size={24} />
          </Link>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col w-full items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-4 md:mt-0 md:border-0 dark:border-gray-700">
              <li>
                <button
                  onClick={() => setOpen((prev) => !prev)}
                  className="group py-2 px-3 rounded-md flex items-center gap-x-2 w-56 bg-zinc-700/10 hover:bg-zinc-700/20 dark:bg-zinc-700/50 transition"
                >
                  <HiMagnifyingGlass className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                  <p className="font-medium text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
                    Quick search...
                  </p>
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
                    <span className="text-xs">&#8984;</span>'/'
                  </kbd>
                </button>
              </li>
              <li>
                <ModeToggle />
              </li>
              <li>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="cursor-pointer">
                      <Avatar>
                        <AvatarImage src={avatarUrl} alt="avatar" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56"
                      align="center"
                      side="bottom"
                    >
                      <DropdownMenuLabel>
                        {userDetails?.full_name}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() => router.push('/account')}
                          className="cursor-pointer"
                        >
                          Profile
                          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        <form action="/auth/sign-out" method="post">
                          <button type="submit">Log out</button>
                        </form>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <button onClick={() => onOpen()}>
                    <Avatar>
                      <AvatarImage
                        src={
                          avatarUrl
                            ? avatarUrl
                            : 'https://github.com/shadcn.png'
                        }
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <FaceIcon className="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <RocketIcon className="mr-2 h-4 w-4" />
              <span>Launch</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onSelect={() => toast('profile clicked')}>
              <PersonIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
              <span>Mail</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <GearIcon className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
};

export default Navbar;
