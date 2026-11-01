import mascot from '@/assets/agata-original-mascot.png.asset.json';
export const mascotImage = mascot.url;
export function AgataMark({ className = 'size-9' }: { className?: string }) {
  return <img src={mascotImage} alt="Ágata mascot" className={`mascot-mark ${className}`} />;
}
export function Wordmark() {
  return <span className="flex items-center gap-2"><AgataMark /><span className="text-xl font-medium">Ágata</span></span>;
}
