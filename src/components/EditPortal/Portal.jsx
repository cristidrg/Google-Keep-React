import ReactDOM from 'react-dom';

const PORTAL_ROOT_NODE = document.getElementById('portal');

/**
 * @REACT_BP -- Rather than creating a component which represents a portal, use the new 16.1 React Portal Feature!
 */
const Portal = props => ReactDOM.createPortal(
  props.children,
  PORTAL_ROOT_NODE,
);

export default Portal;
