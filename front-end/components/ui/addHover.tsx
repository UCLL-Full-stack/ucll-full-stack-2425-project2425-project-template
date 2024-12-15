import * as React from "react";

function IconAddHover(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em" {...props}>
      <path stroke="currentColor" d="M7.5 1v13M1 7.5h13" />
    </svg>
  );
}

export default IconAddHover;
