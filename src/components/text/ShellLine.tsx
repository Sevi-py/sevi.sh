import { useStartOnView } from "../../hooks/useStartOnView";
import { TypingText } from "./TypingText";

export function ShellLine({ command, delay = 0 }: { command: string; delay?: number }) {
  const [ref, hasStarted] = useStartOnView<HTMLDivElement>();

  return (
    <div className="shell-line" ref={ref}>
      <span>sevi@sevi.sh</span>
      <span className="muted">~</span>
      <span className="muted">$</span>
      <TypingText text={command} start={hasStarted} delay={delay} speed={28} />
    </div>
  );
}

