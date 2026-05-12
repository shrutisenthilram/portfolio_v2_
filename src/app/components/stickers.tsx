function Sticker({ src, initial }) {
    const [pos, setPos] = useState(initial);
    const [dragging, setDragging] = useState(false);
    const offset = useRef({ x: 0, y: 0 });
  
    const onDown = e => {
      const r = e.currentTarget.getBoundingClientRect();
      offset.current = { x: e.clientX - r.left, y: e.clientY - r.top };
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragging(true);
    };
    const onMove = e => {
      if (!dragging) return;
      setPos({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
    };
    const onUp = () => setDragging(false);
  
    return (
      <img src={src} draggable={false}
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp}
        style={{ position: 'absolute', left: pos.x, top: pos.y, touchAction: 'none', cursor: dragging ? 'grabbing' : 'grab' }} />
    );
  }