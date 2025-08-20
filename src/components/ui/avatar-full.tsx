import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarFull({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt={alt} className="object-contain" />
      <AvatarFallback>{alt[0]}</AvatarFallback>
    </Avatar>
  );
}
