export default function Reijin3DViewerLayout({ children }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `html, body { background: transparent !important; }` }} />
      {children}
    </>
  );
}
