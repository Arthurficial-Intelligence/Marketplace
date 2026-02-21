interface AvatarProps {
  emoji: string;
}

export default function Avatar({ emoji }: AvatarProps) {
  return (
    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary flex items-center justify-center text-lg">
      {emoji}
    </div>
  );
}
