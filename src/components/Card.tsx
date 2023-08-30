interface PaneProps {
  children?: React.ReactNode;
}

export default function Card({ children }: PaneProps) {
  return <div className="card">{children}</div>;
}
