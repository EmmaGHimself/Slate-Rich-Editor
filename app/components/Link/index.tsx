export default function Link({
  element,
  attributes,
  children,
}: {
  element: any;
  attributes: any;
  children: any;
}) {
  return (
    <a href={element.url} {...attributes} className={"link"}>
      {children}
    </a>
  );
}
