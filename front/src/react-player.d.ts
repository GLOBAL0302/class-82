declare module 'react-player' {
  import * as React from 'react';
  export interface ReactPlayerProps {
    url?: string;
    playing?: boolean;
    controls?: boolean;
    width?: string | number;
    height?: string | number;
    // Add other props as needed
  }
  export default class ReactPlayer extends React.Component<ReactPlayerProps> {}
}
